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

import { VarRequest, VarEntry, FileContent, BackupContent, FlashContent, FileAttr } from '../libfiles/libfiles';
import { Cable, CableModel, CablePort } from '../libcables/libcables';


// Name of the root node for 'Variables' & 'Applications' tree
export const VAR_NODE_NAME = "Variables";
export const APP_NODE_NAME = "Applications";

export const ERROR_ABORT = (256); /* fixed in error.h */
export const ERROR_EOT   = (262); /* fixed in error.h */

/**
 * CalcScreenFormat:
 *
 * An enumeration which contains the following calculator types:
 **/
export enum CalcScreenFormat
{
    SCREEN_FULL,
    SCREEN_CLIPPED
}

/**
 * CalcPixelFormat:
 *
 * An enumeration which defines the format of screenshot images:
 */
export enum CalcPixelFormat
{
    CALC_PIXFMT_MONO = 1,         // Monochrome (1 bpp)
    CALC_PIXFMT_GRAY_4 = 2,       // Grayscale (4 bpp - Nspire)
    CALC_PIXFMT_RGB_565_LE = 3,   // RGB (16 bpp little-endian - Nspire CX / 84+CSE / 83PCE / 84+CE)
    CALC_PIXFMT_RGB_5_6_5 = 3     // Ditto
}

/**
 * CalcPathType:
 *
 * An enumeration which contains the path type:
 **/
export enum CalcPathType
{
    PATH_FULL,
    PATH_LOCAL
}

/**
 * CalcMemType:
 *
 * An enumeration which contains the different memory sizes:
 **/
export enum CalcMemType
{
    MEMORY_NONE = 0,
    MEMORY_FREE = (1<<0),
    MEMORY_USED = (1<<1),
}

// To clean-up !
/**
 * CalcMode:
 *
 * An enumeration which contains different mask modes:
 **/
export enum CalcMode
{
    MODE_NORMAL = 0,

    // For sending vars
    MODE_SEND_ONE_VAR  = (1 << 1),   // Send single var or first var of group (TI82/85 only)
    MODE_SEND_LAST_VAR = (1 << 2),   // Send last var of group file (TI82/85 only)

    MODE_SEND_EXEC_ASM = (1 << 3),   // Send and execute assembly (TI82/85 only; dangerous!)

    // Miscellaneous
    MODE_LOCAL_PATH    = (1 << 4),   // Local path (full by default)
    MODE_BACKUP        = (1 << 5),   // Keep archive attribute
}

/**
 * CalcRomDumpSize:
 *
 * An enumeration which contains the following ROM dump sizes:
 **/
export enum CalcDumpSize
{
    ROMSIZE_AUTO  = 0,
    ROMSIZE_48KB  = 48,     /* TI-80 */
    ROMSIZE_128KB = 128,    /* TI-82, TI-85 */
    ROMSIZE_256KB = 256,    /* TI-83, TI-86 */
    ROMSIZE_512KB = 512,    /* TI-83+ */
    ROMSIZE_1MB   = 1024,   /* TI-84+, TI-92, TI-82A */
    ROMSIZE_2MB   = 2048,   /* TI-83+SE, TI-84+SE, TI-89, TI-92 II, TI-92+, TI-84+T */
    ROMSIZE_4MB   = 4096,   /* TI-84+CSE, TI-89T, V200, TI-83PCE, TI-84+CE */
}

/**
 * CalcShellType:
 *
 * An enumeration which contains the shell to use with ROM dumping:
 **/
export enum CalcShellType
{
    SHELL_NONE = 4,
    SHELL_USGARD,
    SHELL_ZSHELL
}

/**
 * CalcProductIDs:
 *
 * An enumeration which contains the product IDs used by TI graphing calculators:
 **/
export enum CalcProductIDs
{
    PRODUCT_ID_NONE             = 0x00,
    PRODUCT_ID_TI92P            = 0x01,
    PRODUCT_ID_TI73             = 0x02,
    PRODUCT_ID_TI89             = 0x03,
    PRODUCT_ID_TI83P            = 0x04,
    // No known calculator uses 0x05
    // No known calculator uses 0x06
    // No known calculator uses 0x07
    PRODUCT_ID_TIV200           = 0x08,
    PRODUCT_ID_TI89T            = 0x09,
    PRODUCT_ID_TI84P            = 0x0A,
    PRODUCT_ID_TI82A            = 0x0B,
    PRODUCT_ID_NSPIRE_CAS       = 0x0C, // The Nspire CAS+ prototypes also uses 0x0C, but libti*/tilp do not handle their unique communication protocol.
    PRODUCT_ID_LABCRADLE        = 0x0D, // Included for completeness, not handled by libticalcs.
    PRODUCT_ID_NSPIRE_NONCAS    = 0x0E,
    PRODUCT_ID_NSPIRE_CX_CAS    = 0x0F, // Yes, two completely different models use ID 0x0F.
    PRODUCT_ID_TI84PCSE         = 0x0F,
    PRODUCT_ID_NSPIRE_CX_NONCAS = 0x10,
    PRODUCT_ID_NSPIRE_CM_CAS    = 0x11,
    PRODUCT_ID_NSPIRE_CM_NONCAS = 0x12,
    PRODUCT_ID_TI83PCE          = 0x13, // These two similar models use the same ID as well.
    PRODUCT_ID_TI84PCE          = 0x13,
    PRODUCT_ID_TI84PT           = 0x1B
}

/**
 * CalcOperations:
 *
 * An enumeration which contains the different supported operations:
 **/
export enum CalcFeatures
{
    FTS_NONE = 0,

    OPS_ISREADY     = (1 << 0),
    OPS_KEYS        = (1 << 1),
    OPS_SCREEN      = (1 << 2),
    OPS_DIRLIST     = (1 << 3),
    OPS_BACKUP      = (1 << 4),
    OPS_VARS        = (1 << 5),
    OPS_FLASH       = (1 << 6),
    OPS_IDLIST      = (1 << 7),
    OPS_CLOCK       = (1 << 8),
    OPS_ROMDUMP     = (1 << 9),
    OPS_VERSION     = (1 << 10),
    OPS_NEWFLD      = (1 << 11),
    OPS_DELVAR      = (1 << 12),
    OPS_OS          = (1 << 13),
    OPS_RENAME      = (1 << 14),
    OPS_CHATTR      = (1 << 21),

    FTS_SILENT      = (1 << 15),
    FTS_FOLDER      = (1 << 16),
    FTS_MEMFREE     = (1 << 17),
    FTS_FLASH       = (1 << 18),
    FTS_CERT        = (1 << 19),
    FTS_BACKUP      = (1 << 20),
    FTS_NONSILENT   = (1 << 22)

}

/**
 * CalcAction:
 *
 * An enumeration which contains the action taken on a variable
 **/
export enum CalcAction
{
    ACT_NONE = 0,
    ACT_RENAME, ACT_OVER, ACT_SKIP,
}

/**
 * InfosMask:
 *
 * An enumeration which contains the different flags supported by CalcInfos:
 **/
export enum InfosMask
{
    INFOS_PRODUCT_NUMBER = (1 << 0), /* obsolete (never used) */
    INFOS_PRODUCT_NAME   = (1 << 1),
    INFOS_MAIN_CALC_ID   = (1 << 2), /* obsolete, replaced by INFOS_PRODUCT_ID */
    INFOS_HW_VERSION     = (1 << 3),
    INFOS_LANG_ID        = (1 << 4),
    INFOS_SUB_LANG_ID    = (1 << 5),
    INFOS_DEVICE_TYPE    = (1 << 6),
    INFOS_BOOT_VERSION   = (1 << 7),
    INFOS_OS_VERSION     = (1 << 8),
    INFOS_RAM_PHYS       = (1 << 9),
    INFOS_RAM_USER       = (1 << 10),
    INFOS_RAM_FREE       = (1 << 11),
    INFOS_FLASH_PHYS     = (1 << 12),
    INFOS_FLASH_USER     = (1 << 13),
    INFOS_FLASH_FREE     = (1 << 14),
    INFOS_LCD_WIDTH      = (1 << 15),
    INFOS_LCD_HEIGHT     = (1 << 16),
    INFOS_BATTERY        = (1 << 17),
    INFOS_BOOT2_VERSION  = (1 << 18),
    INFOS_RUN_LEVEL      = (1 << 19),
    INFOS_BPP            = (1 << 20),
    INFOS_CLOCK_SPEED    = (1 << 21),
    INFOS_PRODUCT_ID     = (1 << 22),
    INFOS_EXACT_MATH     = (1 << 23),
    INFOS_CLOCK_SUPPORT  = (1 << 24),
    INFOS_COLOR_SCREEN   = (1 << 25),

    // INFOS_MORE_INFOS     = (1 << 30), /* Some day ? Reserved value for signaling more bits are available elsewhere */
    INFOS_CALC_MODEL     = 0x80000000
}

/**
 * CalcFnctsIdx:
 *
 * Index of function in the #CalcFncts structure:
 **/
export enum CalcFnctsIdx
{
    FNCT_IS_READY=0,
    FNCT_SEND_KEY,
    FNCT_EXECUTE,
    FNCT_RECV_SCREEN,
    FNCT_GET_DIRLIST,
    FNCT_GET_MEMFREE,
    FNCT_SEND_BACKUP,
    FNCT_RECV_BACKUP,
    FNCT_SEND_VAR,
    FNCT_RECV_VAR,
    FNCT_SEND_VAR_NS,
    FNCT_RECV_VAR_NS,
    FNCT_SEND_APP,
    FNCT_RECV_APP,
    FNCT_SEND_OS,
    FNCT_RECV_IDLIST,
    FNCT_DUMP_ROM1,
    FNCT_DUMP_ROM2,
    FNCT_SET_CLOCK,
    FNCT_GET_CLOCK,
    FNCT_DEL_VAR,
    FNCT_NEW_FOLDER,
    FNCT_GET_VERSION,
    FNCT_SEND_CERT,
    FNCT_RECV_CERT,
    FNCT_RENAME,
    FNCT_CHATTR,
    FNCT_SEND_ALL_VARS_BACKUP,
    FNCT_RECV_ALL_VARS_BACKUP,
    FNCT_LAST // Keep this one last
}

//#define FNCT_DUMP_ROM FNCT_DUMP_ROM2

/**
 * TigMode:
 *
 * An enumeration which contains the data to save in tigroup:
 **/
export enum TigMode
{
    TIG_NONE    = 0,
    TIG_RAM     = (1 << 0),
    TIG_ARCHIVE = (1 << 1),
    TIG_FLASH   = (1 << 2),
    TIG_BACKUP  = (1 << 3),
    TIG_ALL     = 7,
}

//! Size of the header of a \a DUSBRawPacket
export const DUSB_HEADER_SIZE = (4+1);

/**
 * DUSBRawPacket:
 *
 * Raw packet for the DUSB (84+(SE), 89T) protocol.
 **/
export type DUSBRawPacket =
{
   size: number;       ///< raw packet size
   type: number;       ///< raw packet type

   data: number[];     ///< raw packet data
}

//! Size of the header of a \a NSPRawPacket
export const NSP_HEADER_SIZE = (16);
//! Size of the data contained in \a NSPRawPacket
export const NSP_DATA_SIZE   = (254);

/**
 * NSPRawPacket:
 *
 * Raw packet for the Nspire NavNet protocol.
 **/
export type NSPRawPacket =
{
    unused: number;
    src_addr: number;
    src_port: number;
    dst_addr: number;
    dst_port: number;
    data_sum: number;
    data_size: number;
    ack: number;
    seq: number;
    hdr_sum: number;

    data: number[]; // size = NSP_DATA_SIZE
}

/**
 * CalcScreenCoord:
 * @format: returns full or clipped image (#CalcScreenFormat)
 * @width: real width
 * @height: real height
 * @clipped_width: clipped width (89 for instance)
 * @clipped_height: clipped height (89 for instance)
 * @pixel_format: format of pixel data (#CalcPixelFormat)
 *
 * A structure used for storing screen size.
 **/
export type CalcScreenCoord =
{
    format: number;

    width: number;
    height: number;

    clipped_width: number;
    clipped_height: number;

    pixel_format: CalcPixelFormat;
}

/**
 * TreeInfo:
 * @model: hand-held model
 * @type: var or app list (VAR_NODE_NAME or APP_NODE_NAME)
 * @mem_used: memory used (depends on hand-held model)
 * @mem_free: memory free (depends on hand-held model)
 *
 * A structure used for storing information about a directory list tree.
 **/
export type TreeInfo =
{
    model: CalcModel;
    type: string;

    mem_mask: number;	// tells which field is filled
    mem_used: number;
    mem_free: number;
}

/**
 * KeyPair:
 * @name: name of key (like "ESC")
 * @value: value of key (like 264)
 *
 * A structure which contains a TI scancode.
 **/
export type KeyPair =
{
    name: string;
    value: number;
}

/**
 * CalcKey:
 * @key_name: name of key
 * @normal: information for key when pressed without modifiers
 * @shift: information for key when pressed with SHIFT modifier (TI-68k series)
 * @second: information for key when pressed with 2nd modifier (TI-Z80 & TI-68k series)
 * @diamond: information for key when pressed with DIAMOND modifier (TI-68k series)
 * @alpha: information for key when pressed with ALPHA modifier (TI-Z80 & TI-68k series)
 *
 * A structure which contains a TI scancode with key modifiers.
 **/
export type CalcKey =
{
    key_name: string;

    normal:  KeyPair;
    shift:   KeyPair;
    second:  KeyPair;
    diamond: KeyPair;
    alpha:   KeyPair;
}

/**
 * CalcClock:
 * @year: year
 * @month:
 * @day:
 * @hours:
 * @minutes:
 * @seconds:
 * @time_format: 12 or 24
 * @date_format: 1 or 6
 *
 * A structure used for clock management.
 **/
export type CalcClock =
{
    year: number;
    month: number;
    day: number;

    hours: number;
    minutes: number;
    seconds: number;

    time_format: number;
    date_format: number;

    state: number;
}

/**
 * CalcUpdate:
 * @text: a text to display about the current operation (locale used is those defined by tifiles_transcoding_set)
 * @cancel: set to 1 if transfer have to be cancelled
 * @rate: data rate of cable
 * @cnt1: current counter for link transfer operations (ticalcs2 only)
 * @max1: max value of this counter
 * @cnt2: current count for intermediate operations (ticalcs2 only)
 * @max2: max value of this counter
 * @cnt3: current counter for global operations (used by ticalcs2 or tilp)
 * @max3: max value of this counter
 * @mask: which cntX is/are used (unused)
 * @type: pbar type (unused)
 * @start: init internal vars
 * @stop: release internal vars
 * @refresh: pass control to GUI for refresh
 * @pbar: refresh progress bar
 * @label: refresh label
 *
 * Refresh/progress functions
 * This structure allows to implement a kind of callbacks mechanism (which
 * allow libCalcs to interact with user without being dependant of a GUI).
 **/
export type CalcUpdate =
{
    text: string;
    cancel: number;

    rate: number;
    cnt1: number;
    max1: number;

    cnt2: number;
    max2: number;

    cnt3: number;
    max3: number;

    mask: number;
    type: number;

    start:  () => void;
    stop:   () => void;
    refresh:() => void;
    pbar:   () => void;
    label:  () => void;
}

// typedef VarEntry	VarRequest;	// alias

/**
 * CalcInfos:
 * @os: OS version like "3.01"
 * @bios: BIOS (boot) version like 2.01
 *
 * A structure used to pass arguments.
 **/
export type CalcInfos =
{
    model: CalcModel;
    mask : InfosMask;

    product_name: string;
    product_id: string;
    product_number: number;		// obsolete, replaced by product_id
    main_calc_id: string;	    // obsolete, replaced by product_id
    hw_version: number;			// hand-held-dependent
    language_id: number;
    sub_lang_id: number;
    device_type: number;		// hand-held-dependent
    boot_version: string;
    boot2_version: string;
    os_version: string;
    ram_phys: number;
    ram_user: number;
    ram_free: number;
    flash_phys: number;
    flash_user: number;
    flash_free: number;
    lcd_width: number;
    lcd_height: number;
    battery: number;			// 0 = low, 1 = good
    run_level: number;			// 1 = boot, 2 = OS
    bits_per_pixel: number;		// 1, 4 or 16
    clock_speed: number;
    exact_math: number;
    clock_support: number;
    color_screen: number;
}

/**
 * DeviceOptions:
 * @cable_model: model
 * @cable_port: port
 * @cable_timeout: timeout in tenth of seconds
 * @cable_delay: inter-bit delay in µs
 * @calc_model: calculator model
 *
 * A convenient structure free of use by the user.
 **/
export type DeviceOptions =
{
    cable_model: CableModel;
    cable_port: CablePort;
    cable_timeout: number;
    cable_delay: number;
    calc_model: CalcModel;
}

export enum CalcModel
{
    CALC_NONE = 0,
    CALC_TI73, CALC_TI82, CALC_TI83, CALC_TI83P, CALC_TI84P, CALC_TI85, CALC_TI86,
    CALC_TI89, CALC_TI89T, CALC_TI92, CALC_TI92P, CALC_V200,
    CALC_TI84P_USB, CALC_TI89T_USB, CALC_NSPIRE, CALC_TI80,
    CALC_TI84PC, CALC_TI84PC_USB, CALC_TI83PCE_USB, CALC_TI84PCE_USB, CALC_TI82A_USB, CALC_TI84PT_USB, CALC_MAX
}

/**
 * @model: link cable model (CalcModel).
 * @name: name of hand-held like "TI89"
 * @fullname: complete name of hand-held like "TI-89"
 * @description: description of hand-held like "TI89 calculator"
 * @features: supported operations (CalcOperations)
 * @counters: defines which CalcUpdate counters have to be refreshed (indexed by CalcFnctsIdx)
 *
 * @updat: callbacks for GUI interaction
 *
 * @buffer: allocated data buffer for internal use
 * @buffer2: allocated data buffer for internal use
 *
 * @is_open: device has been opened
 * @is_busy: transfer is in progress
 *
 * @cable: handle on cable used with this model
 * @attached: set if a cable has been attached
 *
 * @priv: private per-handle data
 *
 * @is_ready: check whether calculator is ready
 * @send_key: send key value
 * @execute: remotely execute a program or application
 * @recv_screen: request a screendump
 * @get_dirlist: request a listing of variables, folders (if any) and apps (if any)
 * @send_backup: send a backup
 * @recv_backup: request a backup
 * @send_var: send a variable (silent mode)
 * @recv_var: request a variable silent mode)
 * @send_var_ns: send a variable (non-silent mode)
 * @recv_var_ns: receive a variable (non-silent mode)
 * @send_flash: send a FLASH app/os
 * @recv_flash: request a FLASH app/os
 * @recv_idlist: request hand-held IDLIST
 * @dump_rom_1: dump the hand-held ROM: send dumper (if any)
 * @dump_rom_2: dump the hand-held ROM: launch dumper
 * @set_clock: set date/time
 * @get_clock: get date/time
 * @del_var: delete variable
 * @new_fld: create new folder (if supported)
 * @get_version: returns Boot code & OS version
 * @send_cert: send certificate stuff
 * @recv_cert: receive certificate stuff
 * @rename_var: rename a variable
 * @change_attr: change attributes of a variable
 * @send_all_vars_backup: send a fake backup (set of files and FlashApps)
 * @recv_all_vars_backup: request a fake backup (set of files and FlashApps)
 */
export abstract class Calc
{
    abstract readonly model: CalcModel;
    abstract readonly name: string;
    abstract readonly fullname: string;
    abstract readonly description: string;
    abstract readonly features: number;
    abstract readonly product_id: CalcProductIDs;
    abstract readonly counters: string[];

    updat: CalcUpdate   = <any>undefined;

    buffer:  any        = undefined;
    buffer2: any        = undefined;

    is_open: boolean    = false;
    is_busy: boolean    = false;

    cable: Cable | undefined;
    attached: boolean   = false;

    priv: {
        dusb_rpkt_maxlen: number;  // max length of data in raw packet
        progress_blk_size: number; // refresh pbars every once in a while.
        progress_min_size: number; // don't refresh if packet is smaller than some amount.
        romdump_std_blk: number;   // number of full-size blocks
        romdump_sav_blk: number;   // number of compressed blocks
        dusb_vtl_pkt_list: any;
        dusb_cpca_list: any;
        nsp_vtl_pkt_list: any;
        nsp_seq_pc: number;
        nsp_seq: number;
        nsp_src_port: number;
        nsp_dst_port: number;
    } = <any>{};

    abstract is_ready            () : boolean;
    abstract send_key            (key: number) : void;
    abstract execute             (varEntry: VarEntry, args: string) : void;
    abstract recv_screen         (sc: CalcScreenCoord) : number[][];
    abstract get_dirlist         () : ({ vars: any, apps: any });
    abstract get_memfree         () : ({ ram: any, flash: any });
    abstract send_backup         (content: BackupContent) : void;
    abstract recv_backup         () : BackupContent;
    abstract send_var            (mode: CalcMode, content: FileContent) : void;
    abstract recv_var            (mode: CalcMode) : ({ content: FileContent, vr: VarRequest });
    abstract send_var_ns         (mode: CalcMode, content: FileContent) : void;
    abstract recv_var_ns         (mode: CalcMode) : ({ content: FileContent, vr: VarEntry });
    abstract send_app            (content: FlashContent) : void;
    abstract recv_app            (content: FlashContent) : VarRequest;
    abstract send_os             (content: FlashContent) : void;
    abstract recv_idlist         () : number[];
    abstract dump_rom_1          () : void;
    abstract dump_rom_2          (size: CalcDumpSize, filename: string) : void;
    abstract set_clock           (clock: CalcClock) : void;
    abstract get_clock           () : CalcClock;
    abstract del_var             (vr: VarRequest) : void;
    abstract new_fld             (vr: VarRequest) : void;
    abstract get_version         () : CalcInfos;
    abstract send_cert           (content: FlashContent) : void;
    abstract recv_cert           () : FlashContent;
    abstract rename_var          (oldname: VarRequest, newname: VarRequest) : void;
    abstract change_attr         (vr: VarRequest, attr: FileAttr) : void;
    abstract send_all_vars_backup(content: FileContent) : void;
    abstract recv_all_vars_backup() : FileContent;
}

console.log("libcalcs loaded");
