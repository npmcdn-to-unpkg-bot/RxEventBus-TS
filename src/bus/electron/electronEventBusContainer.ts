/**
 * This file contains the following compoennts
 * @class : RxEventMessageBus
 * @class : RxEventMessageBusFactory
 */
import { RxEventBusContainerBase } from '../eventBusContainer'
import { IRxEventBus,  IRxEventBusContainer} from  '../EventContracts';
import { RxElectronEventBus } from './electronEventBus';

'use strict' ;

export class RxElectonEventBusContainer extends RxEventBusContainerBase{

    // ===== Fields ===== 
    private static _instance: RxElectonEventBusContainer = new RxElectonEventBusContainer();

    // ===== Properties ===== 
    static get Instance(): IRxEventBusContainer {
        return RxElectonEventBusContainer._instance;
    }

    // ===== Abstrcat methods ===== 
    protected createNewBus(): IRxEventBus{
         let bus = new RxElectronEventBus();
         return bus;
    }
}


