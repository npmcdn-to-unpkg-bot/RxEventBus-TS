/**
 * This file contains the following compoennts
 * @class : RxEventMessageBus
 * @class : RxEventMessageBusFactory
 */
import { Subject, Subscription } from 'rxjs/Rx';
import { IEventArgs, IEventMessage, IEventSignal, IRxEventBus, ISubscriber, IRxEventBusContainer } from  './EventContracts';
import { ITypedObject  } from '../common/share';
import { SubscriptionName } from './events'
import { RxEventBus } from './eventBus'

'use strict';

/**
 * 
 * 
 * @export
 * @abstract
 * @class RxEventBusContainerBase
 * @implements {IRxEventBusContainer}
 */
export abstract class RxEventBusContainerBase implements IRxEventBusContainer {

    // ===== Fields ===== 
    private _subjects: Map<string, IRxEventBus>;

    // ===== Constructors ===== 

    /**
     * Creates an instance of RxEventBusContainerBase.
     * 
     */
    constructor() {
        this._subjects = new Map<string, IRxEventBus>();
    }

    // ===== Constructors ===== 

    /**
     * 
     * 
     * @template T
     * @param {string} busName
     * @param {T} msg
     */
    public emit<T extends IEventMessage<IEventArgs> | IEventSignal>(busName: string, msg: T): void {
        let bus = this.getBus(busName);
        if (bus != null) {
            bus.emit(msg);
        }
    }

    /**
     * 
     * 
     * @template T
     * @param {string} busName
     * @param {SubscriptionName<T>} subscriptionName
     * @param {(msg:T)=>void} onNext
     * @returns {Subscription}
     */
    public subscribe<T extends IEventMessage<IEventArgs> | IEventSignal>(busName: string, subscriptionName: SubscriptionName<T>, onNext: (msg: T) => void): Subscription {
        let bus = this.getBus(busName);
        if (bus == null)
            return null;

        let subscription = bus.subscribe(subscriptionName, onNext);
        return subscription;
    }


    /**
     * Returns corresponding bus or creates it dynamically
     * @param type
     * @returns {RxEventMessageBus}
     */
    public getBus(busName: string): IRxEventBus {
        if (!this._subjects.has(busName)) {
            let bus = this.createNewBus();
            this._subjects.set(busName, bus);
            return bus;
        }
        return this._subjects.get(busName);
    }

    /**
     * 
     * 
     * @protected
     * @abstract
     * @returns {IRxEventBus}
     */
    protected abstract createNewBus(): IRxEventBus;
}

/**
 * 
 * 
 * @export
 * @class RxEventBusContainer
 * @extends {RxEventBusContainerBase}
 */
export class RxEventBusContainer extends RxEventBusContainerBase {

    // ===== Fields ===== 
    private static _instance: RxEventBusContainer = new RxEventBusContainer();

    // ===== Properties ===== 
    /**
     * 
     * 
     * @readonly
     * @static
     * @type {IRxEventBusContainer}
     */
    public static get Instance(): IRxEventBusContainer {
        return RxEventBusContainer._instance;
    }

    // ===== Abstrcat methods ===== 

    /**
     * 
     * 
     * @protected
     * @returns {IRxEventBus}
     */
    protected createNewBus(): IRxEventBus {
        let bus = new RxEventBus();
        return bus;
    }
}


/**
 * 
 * 
 * @export
 * @class RxEventMessageBusFactory
 */
export class RxEventBusFactory {
    /**
     * Factory method that allows the creation of a WebSocket EventBusContainer
     * 
     * @static
     * @param {string} url
     * @returns {IRxMessageSubject}
     */
    public static createWSEventBusContainer(url: string): IRxEventBusContainer {
        return null;
        // return RxWSEventBusContainer.Instance;
    }

    /**
     * Factory method that allows the creation of an Electron EventBusContainer
     * 
     * @static
     * @param {string} url
     * @returns {IRxMessageSubject}
     */
    public static createElectroinEventBusContainer(url: string): IRxEventBusContainer {
        return null;
        // return RxWSEventBusContainer.Instance;
    }

    /**
     * 
     * 
     * @static
     * @returns {IRxMessageSubject}
     */
    public static createEventBus(): IRxEventBusContainer {
        return RxEventBusContainer.Instance;
    }
}

