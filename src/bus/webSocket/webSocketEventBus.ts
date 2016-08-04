import { Subscription } from 'rxjs/Rx';
import { IEventMessage, IRxEventBus, IEventArgs, IEventSignal } from "../eventContracts";
import { SubscriptionName } from '../events'

'use strict';

export class RxWebSocketEventBus implements IRxEventBus {

    // ===== IRxEventBus Members ===== 

    /**
     * 
     * 
     * @template T
     * @param {T} event
     */
    emit<T extends IEventMessage<IEventArgs> | IEventSignal>(event: T): void {
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
       // TODO Manage a real subscription
       return null;
    }
}
