/**
 * This file contains the following components
 * @class : LogicReadyEventArgs
 * @class : StatusChangedEventArgs
 */

import { EventArgs  } from '../bus/events';

'use strict';

/**
 * 
 * 
 * @export
 * @class LogicReadyEventArgs
 * @extends {EventArgs}
 */
export class LogicReadyEventArgs extends EventArgs {
 
    // ===== Fields ===== 
    private _media: string;
    private _position: number;

    // ===== Properties ===== 
    public get Media(): string {
        return this._media;
    }

    public get Position(): number {
        return this._position;
    }

    // ===== Constructors ===== 
    constructor(media: string, position: number) {
        super();
        this._media = media;
        this._position = position;
    }
}

/**
 * 
 * 
 * @export
 * @class StatusChangedEventArgs
 * @extends {EventArgs}
 */
export class StatusChangedEventArgs extends EventArgs {
 
    // ===== Fields ===== 
    private _status: string;

    // ===== Properties ===== 
    public get Stataus(): string {
        return this._status;
    }


    // ===== Constructors ===== 
    constructor(status: string) {
        super();
        this._status = status;
    }
}
export class InitStatusEventArgs extends EventArgs {
 
    // ===== Fields ===== 
    private _status: string;

    // ===== Properties ===== 
    public get Stataus(): string {
        return this._status;
    }


    // ===== Constructors ===== 
    constructor(status: string) {
        super();
        this._status = status;
    }
}
