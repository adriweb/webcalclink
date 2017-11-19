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
    Calc, CalcModel, CalcFeatures as Feat, CalcProductIDs, CalcScreenCoord, CalcMode, CalcDumpSize, CalcClock,
    CalcUpdate, PrivCalcHandleDataType
} from './libcalcs';

import { BackupContent, FileAttr, FileContent, FlashContent, VarEntry, VarRequest } from "../libfiles/libfiles";

import { Cable } from "../libcables/libcables";


class _calc_84p extends Calc
{
    readonly model       = CalcModel.CALC_TI84P;
    readonly name        = "TI84+";
    readonly fullname    = "TI-84 Plus";
    readonly description = "TI-84 Plus thru DirectLink";

    readonly features = Feat.OPS_ISREADY | Feat.OPS_SCREEN  | Feat.OPS_DIRLIST | Feat.OPS_VARS   | Feat.OPS_FLASH  |
                        Feat.OPS_OS      | Feat.OPS_IDLIST  | Feat.OPS_ROMDUMP | Feat.OPS_CLOCK  | Feat.OPS_DELVAR |
                        Feat.OPS_VERSION | Feat.OPS_BACKUP  | Feat.OPS_KEYS    | Feat.OPS_RENAME | Feat.OPS_CHATTR |
                        Feat.FTS_SILENT  | Feat.FTS_MEMFREE | Feat.FTS_FLASH;

    readonly product_id = CalcProductIDs.PRODUCT_ID_TI84P;

    updat: CalcUpdate;
    buffer: any;
    buffer2: any;
    is_open: number;
    is_busy: number;
    cable: Cable;
    attached: boolean;
    priv: PrivCalcHandleDataType;

    readonly counters =
    [
        "",     /* is_ready */
        "",     /* send_key */
        "",     /* execute */
        "1P",   /* recv_screen */
        "1L",   /* get_dirlist */
        "",     /* get_memfree */
        "1P",   /* send_backup */
        "",     /* recv_backup */
        "2P1L", /* send_var */
        "1P1L", /* recv_var */
        "",     /* send_var_ns */
        "",     /* recv_var_ns */
        "2P1L", /* send_app */
        "2P1L", /* recv_app */
        "2P",   /* send_os */
        "1L",   /* recv_idlist */
        "2P",   /* dump_rom_1 */
        "2P",   /* dump_rom_2 */
        "",     /* set_clock */
        "",     /* get_clock */
        "1L",   /* del_var */
        "1L",   /* new_folder */
        "",     /* get_version */
        "1L",   /* send_cert */
        "1L",   /* recv_cert */
        "",     /* rename */
        "",     /* chattr */
        "2P",   /* send_all_vars_backup */
        "2P",   /* recv_all_vars_backup */
    ];

    is_ready() {

    };

    send_key(key: number) {

    };

    execute(varEntry: VarEntry, args: string) {

    };

    recv_screen(sc: CalcScreenCoord) {

    };

    get_dirlist() {

    };

    get_memfree() {

    };

    send_backup(content: BackupContent) {

    };

    recv_backup() {

    };

    send_var(mode: CalcMode, content: FileContent) {

    };

    recv_var(mode: CalcMode) {

    };

    send_var_ns(mode: CalcMode, content: FileContent) {

    };

    recv_var_ns(mode: CalcMode) {

    };

    send_app(content: FlashContent) {

    };

    recv_app(content: FlashContent) {

    };

    send_os(content: FlashContent) {

    };

    recv_idlist() {

    };

    dump_rom_1() {

    };

    dump_rom_2(size: CalcDumpSize, filename: string) {

    };

    set_clock(clock: CalcClock) {

    };

    get_clock() {

    };

    del_var(vr: VarRequest) {

    };

    new_fld(vr: VarRequest) {

    };

    get_version() {

    };

    send_cert(content: FlashContent) {

    };

    recv_cert() {

    };

    rename_var(oldname: VarRequest, newname: VarRequest) {

    };

    change_attr(vr: VarRequest, attr: FileAttr) {

    };

    send_all_vars_backup(content: FileContent) {

    };

    recv_all_vars_backup() {

    }
}

export const calc_84p = new _calc_84p();

console.log("calc_84p loaded");
