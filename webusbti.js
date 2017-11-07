const webusb = {};

const thinsp = "<span class='thinsp'></span>";
let lightsParent;

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
            {vendorId: 0x0451, productId: 0xE008 /*, classCode: 0xFF */}
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

    webusb.Device.prototype.controlTransferOut = function (setup, data)
    {
        return this.device_.controlTransferOut(setup, data);
    };

    webusb.Device.prototype.controlTransferIn = function (setup, length)
    {
        return this.device_.controlTransferIn(setup, length);
    };

    webusb.Device.prototype.transferOut = function (ep, data)
    {
        console.debug(`transferOut\t| ep = ${ep}\t| data = ${data}`);

        let str = ""+buf2hex(data);
        str = str.substr(0, 8) + thinsp + str.substr(8, 2) + thinsp + str.substr(10);
        document.getElementById("history").innerHTML += `<span class='out'>&gt; ${str}</span></br>`;
        return this.device_.transferOut(ep, data);
    };

    webusb.Device.prototype.transferIn = function (ep, length)
    {
        console.debug(`transferIn\t| ep = ${ep}\t| length = ${length}`);
        return this.device_.transferIn(ep, length);
    };

    webusb.Device.prototype.readySequence = function ()
    {
        // array of: [ hexStr, [ number of response bytes... ] ]
        const seq = [
            [ "00000004 01 00000400",                         [ 9 ]     ], // response  0000000402000003ff (9)
            [ "00000010 04 0000000a0001000300010000000007D0", [ 7, 15 ] ], // responses 0000000205e000 (7) and 0000000a04000000040012000007D0 (15)
            [ "00000002 05 e000",                             [ ]       ]
        ];

        async function responseFunc(result)
        {
            // console.log("received: ", result);
            const dataBufArray = buf2hex(result.data.buffer);
            console.log("dataBufArray received: ", dataBufArray);
            let str = ""+dataBufArray;
            str = str.substr(0, 8) + thinsp + str.substr(8, 2) + thinsp + str.substr(10);
            document.getElementById("history").innerHTML += `<span class='in'>&lt; ${str}</span></br>`;
        }

        // todo : compute the length from the first 4 (5 later, actually...) bytes

        this.connect().then(async () =>
        {
            for (let i = 0; i < seq.length; i++)
            {
                const seqPair = seq[i];
                switch (seqPair[1].length)
                {
                    case 0:
                        await this.transferOut(2, hexStrToArrayBuffer(seqPair[0]));
                        break;
                    case 1:
                        await this.transferOut(2, hexStrToArrayBuffer(seqPair[0]))
                            .then(() => this.transferIn(1, seqPair[1][0])).then(responseFunc);
                        break;
                    case 2:
                        await this.transferOut(2, hexStrToArrayBuffer(seqPair[0]))
                            .then(() => this.transferIn(1, seqPair[1][0])).then(responseFunc)
                            .then(() => this.transferIn(1, seqPair[1][1])).then(responseFunc);
                        break;
                }
            }
        })
        .then(() => this.disconnect());
    };

})();

function logDeviceStrings(device)
{
    console.log("Connection:",
        device.device_.manufacturerName,
        device.device_.productName,
        device.device_.serialNumber);
}


function setElementDeviceInfo(e, text)
{
    e.getElementsByClassName("lightTitle")[0].innerText = text;
}

function connectDevice(device)
{
    const e = document.getElementById("lightCardTemplate");
    e.style.display = "block";
    device.element = e;
    const s = device.device_.productName + "\n" + device.device_.serialNumber;
    setElementDeviceInfo(device.element, s);

    document.getElementById("send-ready").addEventListener('click', readySequence.bind(this, device) );
}

function handleConnectEvent(event)
{
    const rawDevice = event.device;
    console.log('connect event', rawDevice);
    const device = new webusb.Device(rawDevice);
    logDeviceStrings(device);
    connectDevice(device);
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
        lightsParent.removeChild(device.element);
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
    webusb.getDevices().then(devices =>
    {
        for (const device of devices)
        {
            connectDevice(device);
        }
    });
}

function requestConnection(event)
{
    webusb.requestDevice().then(device =>
    {
        console.log(device);
        connectDevice(device);
    });
    event.preventDefault();
}

function readySequence(device)
{
    document.getElementById("history").innerHTML = "";
    device.readySequence();
}

function start()
{
    registerEventListeners();
    document.getElementById("lightConnect").addEventListener("click", requestConnection);

    lightsParent = document.getElementById("lightsParent");
    startInitialConnections();
}

document.addEventListener('DOMContentLoaded', start, false);

