/**
 * This file contains the following compoennts
 * @class : EventReceiver
 */

import { Observable, } from 'rxjs/Observable';
import { Subject, Subscription} from 'rxjs/Rx';

import { IEventMessage, IRxEventBus } from '../bus/eventContracts';
import { RxEventBus } from '../bus/eventBus';
import { ITypedObject, Environment } from '../common/share';
import { EventMessage, SubscriptionName } from '../bus/events';
import { RxEventBusContainer } from '../bus/eventBusContainer';

// import { NameChangedEventArgs, StopWorkEventArgs, DoWorkEventArgs  } from './eventArgs';
import { DoWorkEventMessage, StopWorkEventMessage, NameChangedEventMessage  } from './eventMessages';
import { ReadyEventSignal  } from './eventSignals';

'use strict';

/**
 * 
 * 
 * @enum {number}
 */
enum MsgDirection {
    Emit = 1,
    Received = 2
}

const LineSeparator = '-'.repeat(25);

/**
 * 
 * 
 * @export
 * @class EventReceiver
 */
export class EventReceiver {

    // ===== Fields ===== 
    private _name: string;
    private _subscriptions: Array<Subscription>;
    private _busName: string;

    // ===== Properties ===== 
    /**
     * 
     * 
     * @readonly
     * @type {IRxEventBus}
     */
    public get Bus(): IRxEventBus {
        return RxEventBusContainer.Instance.getBus(this._busName);
    }

    // ===== Constructors ===== 
    /**
     * Creates an instance of EventReceiver.
     * 
     * @param {string} busName
     * @param {string} name
     */
    constructor(busName: string, name: string) {
        this._subscriptions = new Array<Subscription>();

        this._busName = busName;
        this._name = name;

        this.Initialize();
    }


    // ===== Public Methods ===== 

    /**
     * 
     */
    public Start(): void {
        console.log(`${this._name} - Started`);

        var signal = new ReadyEventSignal();
        this.logMessage(signal, MsgDirection.Emit);
        this.Bus.emit(signal);
    }

    // ===== Event Handlers ===== 

    /**
     * 
     * 
     * @private
     */
    private OnStop: (eventMsg: StopWorkEventMessage) => void = (e) => {
        this.logMessage(e, MsgDirection.Received);
        this.Stop();
    }

    /**
     * 
     * 
     * @private
     */
    private OnNameChanged: (eventMsg: NameChangedEventMessage) => void = (e) => {
        this.logMessage(e, MsgDirection.Received);

        let args = e.getArgs();
        var firstname = args.FirstName;
        var lastName = args.LastName
    }

    /**
     * 
     * 
     * @private
     */
    private OnDoWork: (eventMsg: DoWorkEventMessage) => void = (e) => {
        this.logMessage(e, MsgDirection.Received);
    }

    // ===== Private Methods ===== 

    /**
     * 
     */
    private Stop(): void {
        console.log(`${this._name} - Release All Subscriptions)`);
        this._subscriptions.forEach(s => s.unsubscribe());

        console.log(`${this._name} - Stopped`);
    }

    /**
     * 
     * 
     * @private
     * @param {ITypedObject} msg
     */
    private logMessage(msg: ITypedObject, direction: MsgDirection): void {
        let directionPattern = (direction === MsgDirection.Received) ? "<==" : "==>";
        console.log("");
        console.log(LineSeparator);
        console.log(`${this._name} ${directionPattern} ${msg.getTypeName()}`);
        console.dir(msg);
    }

    /**
     * 
     * 
     * @private
     */
    private Initialize() {
        this.InitSubscriptions();
    }

    /**
     * 
     * 
     * @private
     */
    private InitSubscriptions(): void {
        console.log(`${this._name} - Init Subscriptions`);

        //--  Create the subscription
        this._subscriptions.push(
            this.Bus.subscribe(new SubscriptionName(NameChangedEventMessage.prototype), this.OnNameChanged));
        this._subscriptions.push(
            this.Bus.subscribe(new SubscriptionName(DoWorkEventMessage.prototype), this.OnDoWork));
        this._subscriptions.push(
            this.Bus.subscribe(new SubscriptionName(StopWorkEventMessage.prototype), this.OnStop));
    }
}