/**
 * This file contains the following compoennts
 * @interface : ITypedObject
 * @class : TypedObject
 * @class : Guid
 * @class : Holder<T>
 * @class : Environment
 */

'use strict';

/**
 * 
 * 
 * @export
 * @interface ITypedObject
 */
export interface ITypedObject {
    /**
     * 
     * 
     * @returns {string}
     */
    getTypeName(): string;

    /**
     * 
     * 
     * @param {string} typeName
     * @returns {boolean}
     */
    isInstanceOf(typeName: string): boolean;

    /**
     * 
     * 
     * @template T
     * @param {T} type
     * @returns {boolean}
     */
    isInstanceOfType<T>(type: T): boolean;
}

/**
 * 
 * 
 * @export
 * @class TypedObject
 * @implements {ITypedObject}
 */
export abstract class TypedObject implements ITypedObject {

    // ===== Fields ===== 
    protected _typeName; string;

    // ===== Constructors ===== 
    /**
     * Initializes a new instance of the TypedObject class.
     * 
     */
    constructor() {
        this._typeName = TypedObject.getTypeName(this);
    }

    // ===== Properties ===== 
    /**
     * 
     * 
     * @static
     * @param {*} type
     * @returns {string}
     */
    public static getTypeName(type: any): string {
        return type.constructor.toString().match(/\w+/g)[1];
    }

    // ===== ITypedObject Members ===== 
    /**
     * 
     * 
     * @returns {string}
     */
    public getTypeName(): string {
        return this._typeName;
    }


/**
 * 
 * 
 * @param {string} typeName
 * @returns {boolean}
 */    public isInstanceOf(typeName: string): boolean {
        return this._typeName === typeName;
    }

/**
 * 
 * 
 * @template T
 * @param {T} type
 * @returns {boolean}
 */    public isInstanceOfType<T>(type: T): boolean {
        return this._typeName === TypedObject.getTypeName(type);
    }

}

/**
 * 
 * 
 * @export
 * @class Guid
 */
export class Guid {

    // ===== Fields ===== 
    private _guid: string;

    // ===== Properties ===== 

    // ===== Constructors ===== 
    constructor(public guid: string) {
        this._guid = guid;
    }


    // ===== Public Methods ===== 
    /**
     * 
     * 
     * @returns {string}
     */
    public ToString(): string {
        return this.guid;
    }

    /**
     * 
     * 
     * @static
     * @returns {Guid}
     */
    public static newGuid(): Guid {
        var result: string;
        var i: string;
        var j: number;

        result = "";
        for (j = 0; j < 32; j++) {
            if (j == 8 || j == 12 || j == 16 || j == 20)
                result = result + '-';
            i = Math.floor(Math.random() * 16).toString(16).toUpperCase();
            result = result + i;
        }
        return new Guid(result);
    }
}

/**
 * 
 * 
 * @export
 * @class Holder
 * @template T
 */
export class Holder<T> {
    value: T;
    constructor(value: T) {
        this.value = value;
    }
    typeof(): string {
        return typeof this.value;
    }
}

/**
 * Provides information about, and means to manipulate, the current environment and platform.
 * This class cannot be inherited. 
 * 
 * @export
 * @class Environment
 */
export abstract class Environment {
    /**
     * Gets the newline string defined for this environment.
     * 
     * @static
     */
    public static NewLine = "\n";
}

