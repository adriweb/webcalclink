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
    readonly features = Feat.OPS_ISREADY | Feat.OPS_SCREEN  | Feat.OPS_DIRLIST | Feat.OPS_VARS   | Feat.OPS_FLASH  |
                        Feat.OPS_OS      | Feat.OPS_IDLIST  | Feat.OPS_ROMDUMP | Feat.OPS_CLOCK  | Feat.OPS_DELVAR |
                        Feat.OPS_VERSION | Feat.OPS_BACKUP  | Feat.OPS_KEYS    | Feat.OPS_RENAME | Feat.OPS_CHATTR |
                        Feat.FTS_SILENT  | Feat.FTS_MEMFREE | Feat.FTS_FLASH;

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

    // Not supported by those models
    new_fld = <any>undefined;

    recv_all_vars_backup(): FileContent
    {
        return <any>undefined;
    }

    recv_app(content: FlashContent)
    {
        return <any>undefined;
    }

    // Not supported by those models
    recv_backup = <any>undefined;

    // Not supported by those models
    recv_cert = <any>undefined;

    recv_idlist(): number[]
    {
        return [];
    }

    recv_screen(): { sc: CalcScreenCoord, bitmap: number[][] }
    {
        return {
            sc: <any>undefined,
            bitmap: [[]]
        }
    }

    recv_var(mode: CalcMode): { content: FileContent; vr: VarRequest }
    {
        return {
            content: undefined,
            vr: undefined
        };
    }

    // Not supported by those models
    recv_var_ns = <any>undefined;

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

    // Not supported by those models
    send_cert = <any>undefined;

    send_key(key: number): void
    {
    }

    send_os(content: FileContent): void
    {
    }

    send_var(mode: CalcMode, conten: FileContent): void
    {
    }

    // Not supported by those models
    send_var_ns = <any>undefined;

    set_clock(clock: CalcClock): void
    {
    }
}

// TI-82 Advanced, TI-84 Plus T
abstract class Generic_ExamRestricted_84 extends Generic_84P
{
    // Those have ASM support removed, and cannot receive Flash apps (they are built into the OS)
    readonly features = super.features & ~(Feat.OPS_FLASH | Feat.OPS_ROMDUMP);
}

// TI-83 Premium CE, TI-84 Plus CE(-T)
abstract class Generic_CE extends Generic_84P
{
    readonly features = super.features & ~Feat.OPS_IDLIST;

    // Not supported by those models
    recv_backup = <any>undefined;
    recv_idlist = <any>undefined;
}

export class Calc_84P extends Generic_84P
{
    readonly model       = CalcModel.CALC_TI84P_USB;
    readonly product_id  = CalcProductIDs.PRODUCT_ID_TI84P;
    readonly name        = "TI84+";
    readonly fullname    = "TI-84 Plus";
    readonly description = this.fullname + " thru DirectLink";
}

export class Calc_84PCSE extends Generic_84P
{
    readonly model       = CalcModel.CALC_TI84PC_USB;
    readonly product_id  = CalcProductIDs.PRODUCT_ID_TI84PCSE;
    readonly name        = "TI84+CSE";
    readonly fullname    = "TI-84 Plus C Silver Edition";
    readonly description = this.fullname + " thru DirectLink";
}

export class Calc_83PCE extends Generic_CE
{
    readonly model       = CalcModel.CALC_TI83PCE_USB;
    readonly product_id  = CalcProductIDs.PRODUCT_ID_TI83PCE;
    readonly name        = "TI83PCE";
    readonly fullname    = "TI-83 Premium CE";
    readonly description = this.fullname + " thru DirectLink";
}

export class Calc_84PCE extends Generic_CE
{
    readonly model       = CalcModel.CALC_TI84PCE_USB;
    readonly product_id  = CalcProductIDs.PRODUCT_ID_TI84PCE;
    readonly name        = "TI84+CE";
    readonly fullname    = "TI-84 Plus CE";
    readonly description = this.fullname + " thru DirectLink";
}

export class Calc_82A extends Generic_ExamRestricted_84
{
    readonly model       = CalcModel.CALC_TI82A_USB;
    readonly product_id  = CalcProductIDs.PRODUCT_ID_TI82A;
    readonly name        = "TI82A";
    readonly fullname    = "TI-82 Advanced";
    readonly description = this.fullname + " thru DirectLink";
}

export class Calc_84PT extends Generic_ExamRestricted_84
{
    readonly model       = CalcModel.CALC_TI84PT_USB;
    readonly product_id  = CalcProductIDs.PRODUCT_ID_TI84PT;
    readonly name        = "TI84+T";
    readonly fullname    = "TI-84 Plus T";
    readonly description = this.fullname + " thru DirectLink";
}


console.log("libcalcs/calc_84p loaded");
