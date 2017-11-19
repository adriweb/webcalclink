/*
*  Part of WebCalcLink - (C) Adrien "Adriweb" Bertrand
*  https://github.com/adriweb/webcalclink
*  Inspired from https://github.com/debrouxl/tilibs/
*
*  This program is free software; you can redistribute it and/or modify
*  it under the terms of the GNU General Public License as published by
*  the Free Software Foundation; either version 2 of the License, or
*  (at your option) any later version.
*
*  This program is distributed in the hope that it will be useful,
*  but WITHOUT ANY WARRANTY; without even the implied warranty of
*  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
*  GNU General Public License for more details.
*
*  You should have received a copy of the GNU General Public License
*  along with this program; if not, write to the Free Software Foundation,
*  Inc., 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301 USA
*/


export const DFLT_TIMEOUT = 15;    /* 1.5 second */
export const DFLT_DELAY   = 10;    /* 10 micro-seconds */

export const ERROR_READ_TIMEOUT  = 4;   /* fixed in error.h */
export const ERROR_WRITE_TIMEOUT = 6;   /* fixed in error.h */

/**
 * CableModel:
 *
 * An enumeration which contains the following cable types:
 **/
export enum CableModel
{
    CABLE_NUL = 0,
    CABLE_GRY, CABLE_BLK, CABLE_PAR, CABLE_SLV, CABLE_USB,
    CABLE_VTI, CABLE_TIE, CABLE_ILP, CABLE_DEV,
    CABLE_TCPC, CABLE_TCPS,
    CABLE_MAX
}

/**
 * CablePort:
 *
 * An enumeration which contains the following ports:
 **/
export enum CablePort
{
    PORT_0 = 0,
    PORT_1, PORT_FIRST = PORT_1, PORT_2, PORT_3, PORT_4, PORT_MAX
}

/**
 * UsbPid:
 *
 * An enumeration which contains the following devices:
 **/
export enum UsbPid
{
    PID_UNKNOWN     = 0,
    PID_TIGLUSB     = 0xE001,
    PID_TI89TM      = 0xE004,
    PID_TI84P       = 0xE003,
    PID_TI84P_SE    = 0xE008,
    PID_NSPIRE      = 0xE012,
}

/**
 * CableStatus:
 *
 * An enumeration which contains the following values:
 **/
export enum CableStatus
{
    STATUS_NONE = 0,
    STATUS_RX = 1,
    STATUS_TX = 2,
}

/**
 * ProbingMethod:
 *
 * Defines how to probe cables:
 **/
export enum ProbingMethod
{
    PROBE_NONE  = 0,
    PROBE_FIRST = 1,
    PROBE_USB   = 2,
    PROBE_DBUS  = 4,
    PROBE_ALL   = 6,
}

/**
 * CableFamily:
 *
 * Defines the various types of devices supported and which can be
 * detected automatically; each family is generally incompatible with
 * the others in terms of protocol, file formats, or both.
 */
export enum CableFamily
{
    CABLE_FAMILY_UNKNOWN = 0,
    CABLE_FAMILY_DBUS,          /* Traditional TI link protocol */
    CABLE_FAMILY_USB_TI8X,      /* Direct USB for TI-84 Plus, CSE, CE, etc. */
    CABLE_FAMILY_USB_TI9X,      /* Direct USB for TI-89 Titanium */
    CABLE_FAMILY_USB_NSPIRE     /* Direct USB for TI-Nspire series */
}

/**
 * CableVariant:
 *
 * Defines the various sub-types (for a given CableFamily) that are
 * supported and can be detected automatically.
 */
export enum CableVariant
{
    CABLE_VARIANT_UNKNOWN = 0,
    CABLE_VARIANT_TIGLUSB,      /* CABLE_FAMILY_DBUS */
    CABLE_VARIANT_TI84P,        /* CABLE_FAMILY_USB_TI8X */
    CABLE_VARIANT_TI84PSE,      /* CABLE_FAMILY_USB_TI8X */
    CABLE_VARIANT_TI84PCSE,     /* CABLE_FAMILY_USB_TI8X */
    CABLE_VARIANT_TI84PCE,      /* CABLE_FAMILY_USB_TI8X */
    CABLE_VARIANT_TI83PCE,      /* CABLE_FAMILY_USB_TI8X */
    CABLE_VARIANT_TI82A,        /* CABLE_FAMILY_USB_TI8X */
    CABLE_VARIANT_TI89TM,       /* CABLE_FAMILY_USB_TI9X */
    CABLE_VARIANT_NSPIRE,       /* CABLE_FAMILY_USB_NSPIRE */
    CABLE_VARIANT_TI84PT        /* CABLE_FAMILY_USB_TI8X */
}

/**
 * CableDeviceInfo:
 * @family: calculator family
 * @variant: calculator variant
 *
 * Information returned for each cable by ticables_get_usb_device_info.
 */
export type CableDeviceInfo =
{
    family: CableFamily;
    variant: CableVariant;
}

export type tiTIME = number;
function clock() { return Math.trunc(new Date().getTime() / 10); }
export function TO_START() { return clock(); }
function TO_CURRENT(ref: number) { return clock() - Math.trunc(ref); }
export function TO_ELAPSED(ref: number, max: number) { return TO_CURRENT(Math.trunc(ref)) > 100*(Math.trunc(max)); }

/**
 * DataRate:
 * @count: number of bytes transferred
 * @start: the time when transfer started
 * @current: free of use
 * @stop: the time when transfer finished
 *
 * A structure used for benchmarks.
 * !!! This structure is for private use !!!
 **/
export type DataRate =
{
    count:   number;
    start:   tiTIME;
    current: tiTIME;
    stop:    tiTIME;
}

/**
 * CableOptions:
 * @cable_model: model
 * @cable_port: port
 * @cable_timeout: timeout in tenth of seconds
 * @cable_delay: inter-bit delay in us
 * @calc_model: calculator model
 *
 * A convenient structure free of use by the user.
 **/
export type CableOptions =
{
    model: CableModel;
    port:  CablePort;
    timeout: number;
    delay: number;
    calc: number; // unused
}

type ticables_pre_send_hook_type  = (buffer: Uint8Array, len: number) => void;
type ticables_post_send_hook_type = (buffer: Uint8Array, len: number) => void;
type ticables_pre_recv_hook_type  = (buffer: Uint8Array, len: number) => void;
type ticables_post_recv_hook_type = (buffer: Uint8Array, len: number) => void;

/**
 * Cable:
 *
 * @model: cable model
 * @name: name of cable like "SER"
 * @fullname: complete name of cable like "BlackLink"
 * @description: description of cable like "serial cable"
 *
 * @need_open: set if cable need to be 'open'/'close' before calling 'probe'
 *
 * @port: generic port
 * @timeout: timeout value in 0.1 seconds
 * @delay: inter-bit delay for serial/parallel cable in us
 *
 * @device: device name like COMx or ttySx (if used)
 * @address: I/O base address of device (if used)
 *
 * @rate: data rate during transfers
 *
 * @priv: opaque data for internal/private use (static)
 * @priv2: idem (allocated)
 * @priv3: idem (static)
 *
 * @is_open: set if cable has been open
 * @is_busy: set if cable is busy
 *
 * @prepare: detect and map I/O
 * @probe: check for cable presence
 * @timeout: used to update timeout
 * @open: open I/O port or device
 * @close: close I/O port or device
 * @reset: reset I/O port or device
 * @send: send data onto the cable
 * @recv: recv data from cable
 * @check: check for data arrival
 * @set_d0: set D0/red wire
 * @set_d1: set D1/white wire
 * @get_d0 get D0/red wire
 * @get_d1 set D1/red wire
 * @set_raw: set both wires
 * @get_raw: read both wires
 *
 * @pre_send_hook: callback fired before sending a block of data
 * @post_send_hook: callback fired after sending a block of data.
 * @pre_recv_hook: callback fired before receiving a block of data
 * @post_recv_hook: callback fired after receiving a block of data.
 *
 * A structure used to store information as an handle.
 **/
export abstract class Cable
{
    readonly model: CableModel;
    readonly name: string;
    readonly fullname: string;
    readonly description: string;

    need_open: boolean;

    port: CablePort;
    timeout_val: number;
    delay: number;

    device: string;
    address: number;

    rate: DataRate;

    priv: any;
    priv2: any;
    priv3: any;

    is_open: boolean;
    is_busy: boolean;

    abstract prepare() : void;
    abstract open() : void;
    abstract close() : void;
    abstract reset() : void;
    abstract probe() : void;
    abstract timeout() : void;
    abstract send(buffer: Uint8Array, len: number) : void;
    abstract recv(len: number) : Uint8Array;
    abstract check() : number; // CableStatus ?
    abstract set_d0(state: number) : void;
    abstract set_d1(state: number) : void;
    abstract get_d0() : number;
    abstract get_d1() : number;
    abstract set_raw(state: number) : void;
    abstract get_raw() : number;
    abstract set_device(device: string) : void;
    abstract get_device_info() : CableDeviceInfo;

    abstract pre_send_hook: ticables_pre_send_hook_type;
    abstract post_send_hook: ticables_post_send_hook_type;
    abstract pre_recv_hook: ticables_pre_recv_hook_type;
    abstract post_recv_hook: ticables_post_recv_hook_type;
}


console.log("libcables loaded");
