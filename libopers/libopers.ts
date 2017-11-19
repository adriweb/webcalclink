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

import { CableHandle } from '../libcables/libcables';
import { CalcHandle } from '../libcalcs/libcalcs';

class opers
{
    sendReadySequence()
    {
        console.debug("sendReadySequence");
    }

    /**
     * @param cableHandle
     */
    cable_attach(cableHandle: CableHandle) {}
    cable_detach() {}
    cable_get() {}

    /**
     * @param calcHandle
     */
    calc_attach(calcHandle: CalcHandle) {}
    calc_detach() {}
    calc_get() {}

    device_open() {}
    device_close() {}
    device_reset() {}
    device_probe(result, bla) {}

    recv_idlist() {}
    dump_rom(size: number, filename: string) {}
    get_infos() {}

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
