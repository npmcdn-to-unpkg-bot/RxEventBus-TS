/**
 * This file contains the following compoennts
 * @class : RxEventMessageBus
 * @class : RxEventMessageBusFactory
 */
import { RxEventBusContainerBase } from '../eventBusContainer'
import { IRxEventBus,  IRxEventBusContainer} from  '../EventContracts';
import { RxWebSocketEventBus } from './webSocketEventBus';

'use strict' ;

export class RxWebSocketEventBusContainer extends RxEventBusContainerBase{

    // ===== Fields ===== 
    private static _instance: RxWebSocketEventBusContainer = new RxWebSocketEventBusContainer();

    // ===== Properties ===== 
    static get Instance(): IRxEventBusContainer {
        return RxWebSocketEventBusContainer._instance;
    }

    // ===== Abstrcat methods ===== 
    protected createNewBus(): IRxEventBus{
         let bus = new RxWebSocketEventBus();
         return bus;
    }
}


