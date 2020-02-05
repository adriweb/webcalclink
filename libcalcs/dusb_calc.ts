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

import {
    Calc
} from './libcalcs';


export type DUSBModeSet =
{
    arg1: number; // uint16_t
    arg2: number; // uint16_t
    arg3: number; // uint16_t
    arg4: number; // uint16_t
    arg5: number; // uint16_t
}

export type DUSBCalcParam =
{
    id: number;         // uint16_t
    ok: number;         // uint8_t
    size: number;       // uint16_t
    data: Uint8Array;   // uint8_t*
}

export type DUSBCalcAttr =
{
    id: number;         // uint16_t
    ok: number;         // uint8_t
    size: number;       // uint16_t
    data: Uint8Array;   // uint8_t*
}

export namespace Consts
{
    export const DFL_BUF_SIZE	           = 1024;

    // Parameter IDs
    // See tilibs/libticalcs/trunk/src/dusb_cmd.h for more info
    export const PID_PRODUCT_NUMBER        = 0x0001;
    export const PID_PRODUCT_NAME          = 0x0002;
    export const PID_MAIN_PART_ID          = 0x0003;
    export const PID_HW_VERSION            = 0x0004;
    export const PID_FULL_ID               = 0x0005;
    export const PID_LANGUAGE_ID           = 0x0006;
    export const PID_SUBLANG_ID            = 0x0007;
    export const PID_DEVICE_TYPE           = 0x0008;
    export const PID_BOOT_VERSION          = 0x0009;
    export const PID_OS_MODE               = 0x000A;
    export const PID_OS_VERSION            = 0x000B;
    export const PID_PHYS_RAM              = 0x000C;
    export const PID_USER_RAM              = 0x000D;
    export const PID_FREE_RAM              = 0x000E;
    export const PID_PHYS_FLASH            = 0x000F;
    export const PID_USER_FLASH            = 0x0010;
    export const PID_FREE_FLASH            = 0x0011;
    export const PID_USER_PAGES            = 0x0012;
    export const PID_FREE_PAGES            = 0x0013;
    export const PID_HAS_SCREEN            = 0x0019;
    export const PID_COLOR_AVAILABLE       = 0x001B;
    export const PID_BITS_PER_PIXEL        = 0x001D;
    export const PID_LCD_WIDTH             = 0x001E;
    export const PID_LCD_HEIGHT            = 0x001F;
    export const PID_SCREENSHOT            = 0x0022;
    export const PID_CLASSIC_CLK_SUPPORT   = 0x0023;
    export const PID_CLK_ON                = 0x0024;
    export const PID_CLK_SEC_SINCE_1997    = 0x0025;
    export const PID_CLK_DATE_FMT          = 0x0027;
    export const PID_CLK_TIME_FMT          = 0x0028;
    export const PID_BATTERY               = 0x002D;
    export const PID_USER_DATA_1           = 0x0030;
    export const PID_FLASHAPPS             = 0x0031;
    export const PID_USER_DATA_2           = 0x0035;
    export const PID_MAIN_PART_ID_STRING   = 0x0036;
    export const PID_HOMESCREEN            = 0x0037;
    export const PID_BUSY                  = 0x0038;
    export const PID_SCREEN_SPLIT          = 0x0039;
    export const PID_NEW_CLK_SUPPORT       = 0x003A;
    export const PID_CLK_SECONDS           = 0x003B;
    export const PID_CLK_MINUTES           = 0x003C;
    export const PID_CLK_HOURS             = 0x003D;
    export const PID_CLK_DAY               = 0x003E;
    export const PID_CLK_MONTH             = 0x003F;
    export const PID_CLK_YEAR              = 0x0040;
    export const PID_ANS                   = 0x0046;
    export const PID_OS_BUILD_NUMBER       = 0x0048;
    export const PID_BOOT_BUILD_NUMBER     = 0x0049;
    export const PID_EXACT_MATH            = 0x004B;
    export const PID_BOOT_HASH             = 0x004C;
    export const PID_OS_HASH               = 0x004D;
    export const PID_PTT_MODE_SET          = 0x004F;
    export const PID_OS_VERSION_STRING     = 0x0052;
    export const PID_BOOT_VERSION_STRING   = 0x0053;
    export const PID_PTT_MODE_STATE        = 0x0054;
    export const PID_PTT_MODE_FEATURES     = 0x0055;
    export const PID_STOPWATCH_START       = 0x0059;
    export const PID_STOPWATCH_VALUE1      = 0x005B;
    export const PID_STOPWATCH_VALUE2      = 0x005C;

    // Attributes IDs
    export const AID_VAR_SIZE              = 0x01;
    export const AID_VAR_TYPE              = 0x02;
    export const AID_ARCHIVED              = 0x03;
    export const AID_UNKNOWN_04            = 0x04;
    export const AID_4APPVAR               = 0x05;
    export const AID_VAR_VERSION           = 0x08;
    export const AID_VAR_TYPE2             = 0x11;
    export const AID_ARCHIVED2             = 0x13;
    export const AID_LOCKED                = 0x41;
    export const AID_UNKNOWN_42            = 0x42;
    export const AID_BACKUP_HEADER         = 0xFFFE;

    // Execute commands
    export const EID_PRGM                  = 0x00;
    export const EID_ASM                   = 0x01;
    export const EID_APP                   = 0x02;
    export const EID_KEY                   = 0x03;
    export const EID_UNKNOWN               = 0x04;

    // Modes
    export const MODE_STARTUP              = <DUSBModeSet>{ arg1:1, arg2:1, arg3:0, arg4:0, arg5:0x07d0 };
    export const MODE_BASIC                = <DUSBModeSet>{ arg1:2, arg2:1, arg3:0, arg4:0, arg5:0x07d0 };
    export const MODE_NORMAL               = <DUSBModeSet>{ arg1:3, arg2:1, arg3:0, arg4:0, arg5:0x07d0 };
}

export abstract class DUSBCalc extends Calc
{
    // TODO: fill me

    dusb_cmd_s_execute(folder: string, name: string, action: number, args: string, code: number) : void
    {

    }

    dusb_cmd_r_delay_ack()
    {

    }

    dusb_cmd_r_data_ack()
    {

    }
}
