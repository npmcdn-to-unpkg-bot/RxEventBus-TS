/**
 * This file contains the following compoennts
 * @interface : IEventArgs
 * @interface : IEventSender
 * @interface : ISubscriber<T>
 * @interface : IEventSignal<T>
 * @interface : IEventMessage<T>
 * @interface : ISubscription<T>
 * @interface : IRxEventBus
 * @interface : IRxEventBusContainer
 */

import { Guid, ITypedObject } from '../common/share';
import { Subscription } from 'rxjs/Rx';
import { SubscriptionName } from './events';

'use strict';

/**
 * 
 * 
 * @export
 * @interface IEventArgs
 * @extends {ITypedObject}
 */
export interface IEventArgs extends ITypedObject {
}

/**
 * 
 * 
 * @export
 * @interface IEventSender
 * @extends {ITypedObject}
 */
export interface IEventSender extends ITypedObject {
    getDisplayName(): string;
}

/**
 * 
 * 
 * @export
 * @interface ISubscriber
 * @template T
 */
export interface ISubscriber<T extends IEventSignal> {
    onNext(event: ISubscriber<T>): void;
    getName(): string;
}

/**
 * 
 * 
 * @export
 * @interface IEventSignal
 * @extends {ITypedObject}
 */
export interface IEventSignal extends ITypedObject {
    getTimestamp(): string;
    getUid(): Guid;
    getSender(): IEventSender;
}

/**
 * 
 * 
 * @export
 * @interface IEventMessage
 * @extends {IEventSignal}
 * @template TArgs
 */
export interface IEventMessage<TArgs extends IEventArgs> extends IEventSignal {
    getArgs(): TArgs;
}

/**
 * 
 * 
 * @export
 * @interface ISubscription
 */
export interface ISubscription {
    unsubscribe(): void;
}

/**
 * 
 * 
 * @export
 * @interface IRxEventBus
 */
export interface IRxEventBus {

    /**
     * 
     * 
     * @template T
     * @param {T} msg
     */
    emit<T extends IEventMessage<IEventArgs> | IEventSignal>(msg: T): void;

    /**
     * 
     * 
     * @template T
     * @param {SubscriptionName<T>} subscriptionName
     * @param {(msg: T) => void} onNext
     * @returns {Subscription}
     */
    subscribe<T extends IEventMessage<IEventArgs> | IEventSignal>(subscriptionName: SubscriptionName<T>, onNext: (msg: T) => void): Subscription;
}

/**
 * 
 * 
 * @export
 * @interface IRxEventBusContainer
 */
export interface IRxEventBusContainer {

    /**
     * 
     * 
     * @template T
     * @param {string} busName
     * @param {T} msg
     */
    emit<T extends IEventMessage<IEventArgs> | IEventSignal>(busName: string, msg: T): void;

    /**
     * 
     * 
     * @template T
     * @param {string} busName
     * @param {SubscriptionName<T>} subscriptionName
     * @param {(msg:T)=>void} onNext
     * @returns {Subscription}
     */
    subscribe<T extends IEventMessage<IEventArgs> | IEventSignal>(busName: string, subscriptionName: SubscriptionName<T>, onNext: (msg: T) => void): Subscription;

    /**
     * 
     * 
     * @param {string} busName
     * @returns {IRxEventBus}
     */
    getBus(busName: string): IRxEventBus;
} 
