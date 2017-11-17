const deviceCardTemplate = $("#deviceCardTemplate");
const devicesContainer   = $("#devicesContainer");
const thinsp = "<span class='thinsp'></span>";

const webusb = {};

function hexStrToArrayBuffer(hexStr)
{
    return new Uint8Array(hexStr.match(/([\da-f]{2})\s*/gi).map((h) => parseInt(h, 16)));
}

function buf2hex(buffer)
{
    // buffer is an ArrayBuffer
    return Array.prototype.map.call(new Uint8Array(buffer), x => ('00' + x.toString(16)).slice(-2)).join('').toUpperCase();
}

function chunk_buffer(data)
{
    // todo
}


(function ()
{
    'use strict';
    webusb.devices = {};

    function findOrCreateDevice(rawDevice)
    {
        let device = webusb.getDevice(rawDevice);
        if (device === undefined)
        {
            device = new webusb.Device(rawDevice);
        }
        return device;
    }

    webusb.getDevices = function ()
    {
        return navigator.usb.getDevices().then(devices =>
        {
            return devices.map(device => findOrCreateDevice(device));
        });
    };

    webusb.requestDevice = function ()
    {
        const filters = [
            { vendorId: 0x0451, productId: 0xE001 }, // Silverlink
            { vendorId: 0x0451, productId: 0xE003 }, // 84+...
            { vendorId: 0x0451, productId: 0xE004 }, // 89T...
            { vendorId: 0x0451, productId: 0xE008 }, // 84+ SE/CSE/CE...
            { vendorId: 0x0451, productId: 0xE012 }, // Classic Nspire
        ];
        return navigator.usb.requestDevice({filters: filters}).then(device =>
        {
            return findOrCreateDevice(device);
        });
    };

    webusb.Device = function (device)
    {
        this.device_ = device;
        webusb.devices[device.serialNumber] = this;
    };

    webusb.deleteDevice = function (device)
    {
        delete webusb.devices[device.device_.serialNumber];
    };

    webusb.getDevice = function (device)
    {
        return webusb.devices[device.serialNumber];
    };

    webusb.Device.prototype.connect = function ()
    {
        return this.device_.open()
            .then(() =>
            {
                if (this.device_.configuration === null)
                {
                    return this.device_.selectConfiguration(1);
                }
            })
            .then(() => this.device_.claimInterface(0));
    };

    webusb.Device.prototype.disconnect = function ()
    {
        return this.device_.close();
    };

    webusb.Device.prototype.transferOut = function (data)
    {
        console.debug(`transferOut\t| data = ${data}`);
        let str = ""+buf2hex(data);
        str = str.substr(0, 8) + thinsp + str.substr(8, 2) + thinsp + str.substr(10);
        this.gui.log[0].innerHTML += `<span class='out'>${moment().format('HH:mm:ss.SSS')} &gt; ${str}</span></br>`;
        /************************/
        return this.device_.transferOut(2, data);
    };

    webusb.Device.prototype.transferInWithLen = function (length)
    {
        console.debug(`transferInWithLen\t| length = ${length}`);
        return this.device_.transferIn(1, length);
    };

    webusb.Device.prototype.transferIn = function ()
    {
        return this.transferInWithLen(64);
    };

    webusb.Device.prototype.responseHandler = function(result)
    {
        let str = ""+buf2hex(result.data.buffer);
        str = str.substr(0, 8) + thinsp + str.substr(8, 2) + thinsp + str.substr(10);
        this.gui.log[0].innerHTML += `<span class='in'>${moment().format('HH:mm:ss.SSS')} &lt; ${str}</span></br>`;
    };

    webusb.Device.prototype.readySequence = function ()
    {
        this.connect().then(async () =>
        {
            // array of: [ hexStr, readCountAfter ]
            const seq = [
                [ "00000004 01 00000400",                         1 ], // response  0000000402000003ff (9)
                [ "00000010 04 0000000a0001000300010000000007D0", 2 ], // responses 0000000205e000 (7) and 0000000a04000000040012000007D0 (15)
                [ "00000002 05 e000",                             0 ]
            ];
            for (const frame of seq)
            {
                await this.transferOut(hexStrToArrayBuffer(frame[0]));
                for (let i=0; i<frame[1]; i++) {
                    await this.transferIn().then(this.responseHandler.bind(this));
                }
            }
        })
        .then(() => this.disconnect());
    };

})();

function logDeviceStrings(device)
{
    console.log(device);
    console.log("Connection:",
        device.device_.manufacturerName,
        device.device_.productName,
        device.device_.serialNumber);
}

function createDeviceGUIIfNeeded(device)
{
    const newDiv = deviceCardTemplate.clone();
    newDiv.removeAttr('id');

    const autoClearLog = newDiv.find("input.autoClearLog");

    newDiv.find(".deviceActionButtons > button").each( (idx, btn) => {
        const $btn = $(btn);
        $btn.on('click', () => { autoClearLog.is(":checked") && device.gui.log.empty(); } );
        switch ($btn.data('action'))
        {
            case 'ready':
                $btn.on('click', () => { device.readySequence() });
                break;
        }
    });

    device.gui = {
        root: newDiv,
        name: newDiv.find("h4.card-header"),
        details: newDiv.find("p.deviceDetails"),
        log: newDiv.find("div.deviceLog"),
        state: newDiv.find("span.deviceState"),
        lastActivity: newDiv.find("span.deviceLastActivity")
    };

    device.gui.name.text(device.device_.productName);

    newDiv.find("button.clearLog").on('click', () => { device.gui.log.empty() });

    devicesContainer.append(newDiv);
}

function handleConnectEvent(event)
{
    const rawDevice = event.device;
    console.log('connect event', rawDevice);
    const device = new webusb.Device(rawDevice);
    // todo here: get device info/capabilities...
    logDeviceStrings(device);
    createDeviceGUIIfNeeded(device);
}

function cleanUpDevice(device)
{
    clearInterval(device.intervalId);
    webusb.deleteDevice(device);
}

function disconnectDevice(rawDevice)
{
    const device = webusb.getDevice(rawDevice);
    if (device)
    {  // This can fail if the I/O code already threw an exception
        console.log("removing!");
        devicesContainer.removeChild(device.element);
        device.disconnect()
            .then(s =>
            {
                console.log("disconnected", device);
                cleanUpDevice(device);
            }, e =>
            {
                console.log("nothing to disconnect", device);
                cleanUpDevice(device);
            });
    }
}

function handleDisconnectEvent(event)
{
    console.log('disconnect event', event.device);
    disconnectDevice(event.device);
}

function registerEventListeners()
{
    navigator.usb.addEventListener('connect', handleConnectEvent);
    navigator.usb.addEventListener('disconnect', handleDisconnectEvent);
}

function startInitialConnections()
{
    webusb.getDevices().then( devices => { devices.forEach(createDeviceGUIIfNeeded); } );
}

function requestConnection(event)
{
    webusb.requestDevice().then(device =>
    {
        console.log("requestConnection", device);
        createDeviceGUIIfNeeded(device);
    });
    event.preventDefault();
}

function start()
{
    registerEventListeners();
    $("#grantConnect").on("click", requestConnection);

    startInitialConnections();
}

document.addEventListener('DOMContentLoaded', start, false);

