# WebUSBTI

This is a crappy PoC showing WebUSB talking to TI calculators.  
Maybe in the future it will get less crappy. We'll see.

## Instructions

- Get a WebUSB-enabled browser (for instance, any recent (v61+) Chrome)
- Plug your TI calculator (any device with TI's D-USB(/CARS) protocol should be OK)
- Authorize access to it by clicking on the link on the page and choosing the calculator
- Do stuff

##### Compatibility:
This has been tested with Chrome v62 under:
 - **macOS 10.13**: works fine without any additional setup
 - **Linux (Fedora)**: works fine once Chrome is allowed to talk to the USB device (see [here](https://github.com/webusb/arduino/issues/29#issuecomment-299391705))
 - **Windows 10**: doesn't work yet. [This](https://bugs.chromium.org/p/chromium/issues/detail?id=637404) might help once it's done.

## Credits

- Thanks to Lionel Debroux for all the calc protocol stuff (see [libti*](https://github.com/debrouxl/tilibs/))
- Inspired from [yubikey-webusb](https://github.com/SantiagoTorres/yubikey-webusb)

## Screenshot

![looks like this for now](https://i.imgur.com/aVmAykG.png)
