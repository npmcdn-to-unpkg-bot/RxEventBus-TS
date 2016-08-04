/**
 * This file contains the following compoennts
 * @class : EventProducer
 */
import { Observable } from 'rxjs/Observable';
import { Subscription} from 'rxjs/Rx';
import 'rxjs/add/observable/interval';

import { EventMessage, EventSender, SubscriptionName } from "../bus/events";
import { StatusChangedEventArgs, LogicReadyEventArgs, InitStatusEventArgs } from './eventArgs';
import { StatusChangedEventMessage, LogicReadyEventMessage, InitStatusEventMessage } from './eventMessages';
import { LoginEventSignal, LogoutEventSignal, StatusLogoutEventSignal } from './eventSignals';
import { IRxEventBus, IEventMessage, IEventSignal, IEventSender, IRxEventBusContainer} from '../bus/eventContracts';
import { RxEventBus } from '../bus/eventBus';
import { ITypedObject, Environment } from '../common/share';
import { RxEventBusContainer } from '../bus/eventBusContainer'

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
 * @class EventProducer
 */
export class UdLogic {

    // ===== Fields ===== 
    private _name: string;
    private _subscriptions: Array<Subscription>
    private _eventSender: IEventSender;
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
     * Creates an instance of EventProducer.
     * 
     * @param {string} busName
     * @param {string} name
     * @param {number} [eventsCount=10]
     * @param {number} [timeSeconds=1]
     */
    constructor(busName: string, name: string) {
        this._subscriptions = new Array<Subscription>();
        this._eventSender = new EventSender(name);

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

        // Emit the LogicReady
        var args = new LogicReadyEventArgs("media", 30);
        var msg = new LogicReadyEventMessage(args, this._eventSender);
        this.logMessage(msg, MsgDirection.Emit);
        this.Bus.emit(msg);
    }

    /**
     * 
     */
    private Stop(): void {

        console.log(`${this._name} - Release All Subscriptions`);
        this._subscriptions.forEach(s => s.unsubscribe());

        console.log(`${this._name} - Stopped`);
    }

    // ===== Event Handlers ===== 

    /**
     * 
     * 
     * @private
     */
    private OnLogin: (value: LoginEventSignal) => void = (e) => {

        this.logMessage(e, MsgDirection.Received);

        // Emit the StatusChange
        var args = new InitStatusEventArgs("XX");
        var msg = new InitStatusEventMessage(args, this._eventSender);
        this.logMessage(msg, MsgDirection.Emit);
        this.Bus.emit(msg);
    }

/**
 * 
 * 
 * @private
 */
    private OnStatusChanged: (value: StatusChangedEventMessage) => void = (e) => {
        this.logMessage(e, MsgDirection.Received);
    }

/**
 * 
 * 
 * @private
 */ 
    private OnLogout: (value: LogoutEventSignal) => void = (e) => {
        this.logMessage(e, MsgDirection.Received);

        // Emit the DoWorkEventArgs
        var signal = new StatusLogoutEventSignal(this._eventSender);
        this.logMessage(signal, MsgDirection.Emit);
        this.Bus.emit(signal);
    }

    // ===== Private Methods ===== 

    /**
     * 
     * 
     * @private
     * @param {ITypedObject} msg
     * @param {MsgDirection} direction
     * @param {number} [id]
     */
    private logMessage(msg: ITypedObject, direction: MsgDirection, id?: number): void {
        let directionPattern = (direction == MsgDirection.Received) ? "<==" : "==>";
        console.log("");
        let IdStrg = (id == null) ? "" : id.toString();
        console.log(`${IdStrg} ${LineSeparator}`);
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
        console.log(`${this._name} - InitSubscriptions`);

        //--  Create the subscription and add it to the collection
         
        this._subscriptions.push(
            this.Bus.subscribe(new SubscriptionName(LoginEventSignal.prototype), this.OnLogin));

        this._subscriptions.push(
            this.Bus.subscribe(new SubscriptionName(StatusChangedEventMessage.prototype), this.OnStatusChanged));

        this._subscriptions.push(
            this.Bus.subscribe(new SubscriptionName(LogoutEventSignal.prototype), this.OnLogout));
    }
}


