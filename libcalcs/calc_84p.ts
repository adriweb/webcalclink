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
    Calc, CalcModel, CalcFeatures as Feat, CalcProductIDs, CalcScreenCoord, CalcMode, CalcDumpSize, CalcClock, CalcUpdate, CalcInfos
} from './libcalcs';

import {
    BackupContent, FileAttr, FileContent, FlashContent, VarEntry, VarRequest
} from "../libfiles/libfiles";

import {
    Cable
} from '../libcables/libcables';

// TODO: implement me
abstract class Generic_84P extends Calc
{
    change_attr(vr: VarRequest, attr: FileAttr): void
    {
    }

    del_var(vr: VarRequest): void
    {
    }

    dump_rom_1(): void
    {
    }

    dump_rom_2(size: CalcDumpSize, filename: string): void
    {
    }

    execute(varEntry: VarEntry, args: string): void
    {
    }

    get_clock(): CalcClock
    {
        return <any>undefined;
    }

    get_dirlist(): { vars: any; apps: any }
    {
        return {
            apps: undefined,
            vars: undefined
        };
    }

    get_memfree(): { ram: any; flash: any }
    {
        return {
            flash: undefined,
            ram: undefined
        };
    }

    get_version(): CalcInfos
    {
        return <any>undefined;
    }

    is_ready(): boolean
    {
        return false;
    }

    new_fld(vr: VarRequest): void
    {
    }

    recv_all_vars_backup(): FileContent
    {
        return <any>undefined;
    }

    recv_app(content: FlashContent)
    {
        return <any>undefined;
    }

    recv_backup(): BackupContent
    {
        return <any>undefined;
    }

    recv_cert(): FlashContent
    {
        return <any>undefined;
    }

    recv_idlist(): number[]
    {
        return [];
    }

    recv_screen(sc: CalcScreenCoord): number[][]
    {
        return [];
    }

    recv_var(mode: CalcMode): { content: FileContent; vr: VarRequest }
    {
        return {
            content: undefined,
            vr: undefined
        };
    }

    recv_var_ns(mode: CalcMode): { content: FileContent; vr: VarRequest }
    {
        return {
            content: undefined,
            vr: undefined
        };
    }

    rename_var(oldname: VarRequest, newname: VarRequest): void
    {
    }

    send_all_vars_backup(content: FileContent): void
    {
    }

    send_app(content: FlashContent): void
    {
    }

    send_backup(content: BackupContent): void
    {
    }

    send_cert(content: FlashContent): void
    {
    }

    send_key(key: number): void
    {
    }

    send_os(content: FileContent): void
    {
    }

    send_var(mode: CalcMode, conten: FileContent): void
    {
    }

    send_var_ns(mode: CalcMode, content: FileContent): void
    {
    }

    set_clock(clock: CalcClock): void
    {
    }
}

export default class Calc_84P extends Generic_84P
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
}

// TODO: add more calcs

console.log("libcalcs/calc_84p loaded");
