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
import { StatusChangedEventArgs, InitStatusEventArgs  } from './eventArgs';
import { LogicReadyEventMessage, StatusChangedEventMessage, InitStatusEventMessage  } from './eventMessages';
import { LoginEventSignal, LogoutEventSignal, StatusLogoutEventSignal  } from './eventSignals';

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
export class UdFrontEnd {

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
    }

    // ===== Event Handlers ===== 

    /**
     * 
     * 
     * @private
     */
    private OnStatusLogout: (eventMsg: StatusLogoutEventSignal) => void = (e) => {
        this.logMessage(e, MsgDirection.Received);
        this.Stop();
    }

    private OnInitStatus: (eventMsg: InitStatusEventMessage) => void = (e) => {
        this.logMessage(e, MsgDirection.Received);

        // Emit the StatusChanged
        var args = new StatusChangedEventArgs("YY");
        var msg = new StatusChangedEventMessage(args);
        this.logMessage(msg, MsgDirection.Emit);
        this.Bus.emit(msg);

        // Emit the Logout
        var signal = new LogoutEventSignal();
        this.logMessage(signal, MsgDirection.Emit);
        this.Bus.emit(signal);
    }

    private OnLogicReady: (eventMsg: LogicReadyEventMessage) => void = (e) => {
        this.logMessage(e, MsgDirection.Received);

        // Emit the Login Signal
        var signal = new LoginEventSignal();
        this.logMessage(signal, MsgDirection.Emit);
        this.Bus.emit(signal);
    }


   // ===== Private Methods ===== 

    /**
     * 
     */
    private Stop(): void {

        console.log(`${this._name} - Release All Subscriptions`);
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
            this.Bus.subscribe(new SubscriptionName(LogicReadyEventMessage.prototype), this.OnLogicReady));
        this._subscriptions.push(
            this.Bus.subscribe(new SubscriptionName(StatusLogoutEventSignal.prototype), this.OnStatusLogout));
        this._subscriptions.push(
            this.Bus.subscribe(new SubscriptionName(InitStatusEventMessage.prototype), this.OnInitStatus));
    }
}