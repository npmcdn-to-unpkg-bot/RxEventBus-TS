/**
 * This file contains the following compoennts
 * @class : RxEventMessageBus
 */
import { Subject, Subscription } from 'rxjs/Rx';
import { IEventArgs, IEventMessage, IEventSignal, IRxEventBus, ISubscriber } from  './EventContracts';
import { SubscriptionName } from './events'

'use strict';
  
/** 
 * 
 * 
 * @export
 * @class RxEventBus
 * @implements {IRxEventBus}
 */
export class RxEventBus implements IRxEventBus {

    // ===== Fields ===== 
    private _mBusSubject: Subject<IEventMessage<IEventArgs> | IEventSignal>;

    // ===== Constructors ===== 

    /**
     * Initializes a new instance of the RxEventBus class.
     */
    constructor() {
        this._mBusSubject = new Subject<IEventMessage<IEventArgs> | IEventSignal>();
    }

    // ===== IRxEventBus Members ===== 

    /**
     * 
     * 
     * @template T
     * @param {T} event
     */
    emit<T extends IEventMessage<IEventArgs> | IEventSignal>(event: T): void {
        this._mBusSubject.next(event);
    }

    /**
     * 
     * 
     * @template T
     * @param {SubscriptionName<T>} subscriptionName
     * @param {(event: T) => void} onNext
     * @returns {Subscription}
     */
    subscribe<T extends IEventMessage<IEventArgs> | IEventSignal>(subscriptionName: SubscriptionName<T>, onNext: (event: T) => void): Subscription {
        return this._mBusSubject
            .filter(ev => RxEventBus.isEventOfType(ev, subscriptionName))
            .map(ev => <T>ev)
            .subscribe(onNext);
    }

    // ===== private Members ===== 

    /**
     * 
     * 
     * @private
     * @static
     * @param {ITypedObject} event
     * @param {string} subscriptionName
     * @returns {boolean}
     */
    private static isEventOfType<T extends IEventMessage<IEventArgs> | IEventSignal>(event: T, subscriptionName: SubscriptionName<T>): boolean {
        return event.getTypeName() === subscriptionName.Name;
    }
}

