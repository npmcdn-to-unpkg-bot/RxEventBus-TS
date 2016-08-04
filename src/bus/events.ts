/**
 * This file contains the following compoennts
 * @class : EventSender
 * @class : EventSignal
 * @class : EventArgs
 * @class : EventMessage<T>
 */

import { Guid, TypedObject } from '../common/share';
import { IEventArgs, IEventSender, IEventSignal, IEventMessage } from './eventContracts';

'use strict';

/**
 * 
 * 
 * @export
 * @class EventSender
 * @extends {TypedObject}
 * @implements {IEventSender}
 */
export class EventSender extends TypedObject implements IEventSender {

    // ===== Fields ===== 
    private _displayName: string;
    private _identifier: string;

    // ===== IEventSender Members ===== 
    getDisplayName(): string {
        return this._displayName;
    }

    // ===== Constructors ===== 
    constructor(displayName: string) {
        super();
        this._displayName = displayName;
    }

    // ===== Public Methods =====
}

/**
 * 
 * 
 * @export
 * @class EventSignal
 * @extends {TypedObject}
 * @implements {IEventSignal}
 */
export abstract class EventSignal extends TypedObject implements IEventSignal {

    // ===== Fields ===== 
    private _timestamp: string;
    private _uid: Guid;
    private _eventSender: IEventSender;

    // ===== IEventSignal Members ===== 
    /**
     * 
     * 
     * @returns {string}
     */
    public getTimestamp(): string {
        return this._timestamp;
    }

    /**
     * 
     * 
     * @returns
     */
    public getUid() {
        return this._uid;
    }

    /**
     * 
     * 
     * @returns {IEventSender}
     */
    public getSender(): IEventSender {
        return this._eventSender;
    }

    // ===== Constructors ===== 
    /**
     * Initializes a new instance of the EventSignal class with an optional EventSender
     * @param {IEventSender} [sender]
     */
    constructor(sender?: IEventSender) {
        super();
        this._eventSender = sender;
        this.Init();
    }

    /**
     * 
     * 
     * @private
     */
    private Init(): void {
        this._timestamp = (new Date()).toLocaleTimeString();
        this._uid = Guid.newGuid();
    }
}

/**
 * 
 * 
 * @export
 * @class EventArgs
 * @extends {TypedObject}
 * @implements {IEventArgs}
 */
export class EventArgs extends TypedObject implements IEventArgs {
    // ===== Fields ===== 
    /**
     * 
     * 
     * @static
     * @type {EventArgs}
     */
    public static EMPTY: EventArgs;


    // ===== Constructors ===== 
    /**
     * Creates an instance of EventArgs.
     * 
     */
    constructor() {
        super()
    }
}

/**
 * 
 * 
 * @export
 * @class EventMessage
 * @extends {EventSignal}
 * @implements {IEventMessage<TArgs>}
 * @template TArgs
 */
export abstract class EventMessage<TArgs extends IEventArgs>
    extends EventSignal
    implements IEventMessage<TArgs>
{
    // ===== Fields ===== 
    private _args: TArgs;

    // ===== IEventMessage<TArgs> Members ===== 
    /**
     * 
     * 
     * @returns {TArgs}
    * */
    public getArgs(): TArgs {
        return this._args;
    }

    /**
     * 
     * 
     * @returns {string}
    * */
    // public getTypeName(): string {
    //     return `${this._typeName}<${this._args.getTypeName()}>`;
    // }

    // ===== Constructors ===== 
    constructor(args: TArgs, sender?: IEventSender) {
        super(sender);
        this._args = args;
    }

    protected static getSubscriptionName(type: any): string {
        return type.prototype.constructor.toString().match(/\w+/g)[1];
    }

}

/**
 * 
 * 
 * @export
 * @class SubscriptionName
 */
export class SubscriptionName<T extends IEventMessage<IEventArgs> | IEventSignal>  {

    // ===== Fields ===== 
    private _subscriptionName: string;

    // ===== Properties ===== 
    public get Name(): string {
        return this._subscriptionName;
    }

    // ===== Constructors ===== 
    constructor(type: T) {
        this._subscriptionName = TypedObject.getTypeName(type);
    }

}

