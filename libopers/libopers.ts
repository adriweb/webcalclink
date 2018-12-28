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

import { Cable } from '../libcables/libcables';
import { Calc, DeviceOptions } from '../libcalcs/libcalcs';

class opers
{
    private cable: Cable | undefined;
    private calc: Calc | undefined;
    private options: DeviceOptions   = <any>undefined;
    private cable_attached: boolean  = false;
    private calc_attached: boolean   = false;

    cable_attach(cable: Cable)
    {
        this.options.cable_model = cable.model;
        this.options.cable_port = cable.port;
        this.cable = cable;
        this.cable_attached = true;
    }

    cable_detach()
    {
        this.cable = undefined;
        this.cable_attached = false;
    }

    cable_get()
    {
        return this.cable;
    }

    calc_attach(calc: Calc)
    {
        this.options.calc_model = calc.model;
        this.calc = calc;
        this.calc_attached = true;
    }

    calc_detach()
    {
        this.calc = undefined;
        this.calc_attached = false;
    }

    calc_get()
    {
        return this.calc;
    }

    device_open()
    {
    }

    device_close()
    {
    }

    device_reset()
    {
    }

    device_probe()
    {
    }

    recv_idlist()
    {
    }

    dump_rom(size: number, filename: string)
    {
    }

    get_infos()
    {
    }

    sendReadySequence()
    {
        console.debug("sendReadySequence");
    }

    static format_bytes(value: number)
    {
        if (value < 64 * 1024) {
            return `${value} bytes`;
        } else if (value < 1024 * 1024) {
            return `${value >> 10} KB`;
        } else {
            return `${value >> 20} MB`;
        }
    }
}

export const ops = new opers();

console.log("libopers loaded");
