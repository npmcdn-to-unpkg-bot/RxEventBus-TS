import { Subscription } from 'rxjs/Rx';
import { IEventMessage, IRxEventBus, IEventArgs, IEventSignal } from "../eventContracts";
import { SubscriptionName } from '../events'
import { ITypedObject } from '../../common/share';

// import { ipcRenderer, Channels} from 'electron';

'use strict';

export class RxElectronEventBus implements IRxEventBus {

    // ===== IRxEventBus Members ===== 

    /**
     * 
     * 
     * @template T
     * @param {T} event
     */
    emit<T extends IEventMessage<IEventArgs> | IEventSignal>(event: T): void {
        // Asynchronously send an EventMessage to the renderer via channel
        // The main process can handle it by listening to the channel event of ipc module.
        // let channel = Channels.getDefault();
        // ipcRenderer.send(channel, event);
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
        // ipcRenderer.on(
        //    Channels.getDefault(),
        //     (sender:any , data:T) => {
        //         onNext(data);
        //     });

       return null;
    }

}
