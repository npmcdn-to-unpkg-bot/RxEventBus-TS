/**
 * This file contains the following components
 * @class : NameChangedEventArgs
 * @class : DoWorkEventArgs
 * @class : StopWorkEventArgs
 */

import { EventArgs  } from '../bus/events';

'use strict';

/**
 * 
 * 
 * @export
 * @class NameChangedEventArgs
 * @extends {EventArgs}
 */
export class NameChangedEventArgs extends EventArgs {
 
    // ===== Fields ===== 
    private _firstName: string;
    private _lastName: string;

    // ===== Properties ===== 
/**
 * 
 * 
 * @readonly
 * @type {string}
 */
    public get FirstName(): string {
        return this._firstName;
    }

/**
 * 
 * 
 * @readonly
 * @type {string}
 */
    public get LastName(): string {
        return this._lastName;
    }

    // ===== Constructors ===== 
    /**
     * Creates an instance of NameChangedEventArgs.
     * 
     * @param {string} firstName
     * @param {string} lastName
     */
    constructor(firstName: string, lastName: string) {
        super();
        this._firstName = firstName;
        this._lastName = lastName;
    }
}


/**
 * 
 * 
 * @export
 * @class DoWorkEventArgs
 * @extends {EventArgs}
 */
export class DoWorkEventArgs extends EventArgs {

    // ===== Fields ===== 
    private _workId : number;

    // ===== Properties ===== 
    /**
     * 
     * 
     * @readonly
     * @type {number}
     */
    public get WorkId() : number {
        return this._workId;
    }

    // ===== Constructors ===== 
    /**
     * Creates an instance of DoWorkEventArgs.
     * 
     * @param {number} workId
     */
    constructor(workId: number) {
        super();
        this._workId = workId;
    }
}

/**
 * 
 * 
 * @export
 * @class StopWorkEventArgs
 * @extends {EventArgs}
 */
export class StopWorkEventArgs extends EventArgs {

    // ===== Fields ===== 
    private _dateTime: string;
    
    // ===== Properties ===== 
    /**
     * 
     * 
     * @readonly
     * @type {string}
     */
    public get DateTime() : string {
        return this._dateTime;
    }

    // ===== Constructors ===== 
    /**
     * Creates an instance of StopWorkEventArgs.
     * 
     */
    constructor() {
        super();
        this._dateTime = (new Date()).toLocaleTimeString();
    }
}

