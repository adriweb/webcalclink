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
    CalcModel, CalcFeatures, CalcProductIDs, CalcFncts, AbstractCalc,
    CalcScreenCoord, CalcMode, CalcDumpSize, CalcClock
} from './libcalcs';

import {BackupContent, FileAttr, FileContent, FlashContent} from "../libfiles/libfiles";

const _calc_84p_functs: CalcFncts = {

    is_ready: function () {

    },

    send_key: function (key: number) {

    },

    execute: function (varEntry: VarEntry, args: string) {

    },

    recv_screen: function (sc: CalcScreenCoord) {

    },

    get_dirlist: function () {

    },

    get_memfree: function () {

    },

    send_backup: function (content: BackupContent) {

    },

    recv_backup: function () {

    },

    send_var: function (mode: CalcMode, content: FileContent) {

    },

    recv_var: function (mode: CalcMode) {

    },

    send_var_ns: function (mode: CalcMode, content: FileContent) {

    },

    recv_var_ns: function (mode: CalcMode,) {

    },

    send_app: function (content: FlashContent) {

    },

    recv_app: function (content: FlashContent) {

    },

    send_os: function (content: FlashContent) {

    },

    recv_idlist: function () {

    },

    dump_rom_1: function () {

    },

    dump_rom_2: function (size: CalcDumpSize, filename: string) {

    },

    set_clock: function (clock: CalcClock) {

    },

    get_clock: function () {

    },

    del_var: function (vr: VarRequest) {

    },

    new_fld: function (vr: VarRequest) {

    },

    get_version: function () {

    },

    send_cert: function (content: FlashContent) {

    },

    recv_cert: function () {

    },

    rename_var: function (oldname: VarRequest, newname: VarRequest) {

    },

    change_attr: function (vr: VarRequest, attr: FileAttr) {

    },

    send_all_vars_backup: function (content: FileContent) {

    },

    recv_all_vars_backup: function () {

    }
};

class _calc_84p extends AbstractCalc {
    model = CalcModel.CALC_TI84P;
    name = "TI84+";
    fullname = "TI-84 Plus";
    description = "TI-84 Plus thru DirectLink";

    features = CalcFeatures.OPS_ISREADY | CalcFeatures.OPS_SCREEN | CalcFeatures.OPS_DIRLIST |
        CalcFeatures.OPS_VARS | CalcFeatures.OPS_FLASH | CalcFeatures.OPS_OS |
        CalcFeatures.OPS_IDLIST | CalcFeatures.OPS_ROMDUMP | CalcFeatures.OPS_CLOCK |
        CalcFeatures.OPS_DELVAR | CalcFeatures.OPS_VERSION | CalcFeatures.OPS_BACKUP |
        CalcFeatures.OPS_KEYS | CalcFeatures.OPS_RENAME | CalcFeatures.OPS_CHATTR |
        CalcFeatures.FTS_SILENT | CalcFeatures.FTS_MEMFREE | CalcFeatures.FTS_FLASH;

    product_id = CalcProductIDs.PRODUCT_ID_TI84P;

    counters = [
        "", /* is_ready */
        "", /* send_key */
        "", /* execute */
        "1P", /* recv_screen */
        "1L", /* get_dirlist */
        "", /* get_memfree */
        "1P", /* send_backup */
        "", /* recv_backup */
        "2P1L", /* send_var */
        "1P1L", /* recv_var */
        "", /* send_var_ns */
        "", /* recv_var_ns */
        "2P1L", /* send_app */
        "2P1L", /* recv_app */
        "2P", /* send_os */
        "1L", /* recv_idlist */
        "2P", /* dump_rom_1 */
        "2P", /* dump_rom_2 */
        "", /* set_clock */
        "", /* get_clock */
        "1L", /* del_var */
        "1L", /* new_folder */
        "", /* get_version */
        "1L", /* send_cert */
        "1L", /* recv_cert */
        "", /* rename */
        "", /* chattr */
        "2P", /* send_all_vars_backup */
        "2P", /* recv_all_vars_backup */
    ];

    functions = _calc_84p_functs;

}

export const calc_84p = new _calc_84p();

console.log("calc_84p loaded");
