/**
 * This file contains the following compoennts
 * @class : EventProducer
 */
import { Observable } from 'rxjs/Observable';
import { Subscription} from 'rxjs/Rx';
import 'rxjs/add/observable/interval';

import { EventMessage, EventSender, SubscriptionName } from "../bus/events";
import { DoWorkEventArgs, NameChangedEventArgs, StopWorkEventArgs } from './eventArgs';
import { NameChangedEventMessage, StopWorkEventMessage, DoWorkEventMessage } from './eventMessages';
import { ReadyEventSignal } from './eventSignals';
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
export class EventProducer {

    // ===== Fields ===== 
    private _eventsCount: number;
    private _timeSeconds: number;
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
    constructor(busName: string, name: string, eventsCount: number = 10, timeSeconds: number = 1) {
        this._subscriptions = new Array<Subscription>();
        this._eventSender = new EventSender(name);

        this._busName = busName;
        this._name = name;
        this._eventsCount = eventsCount;
        this._timeSeconds = timeSeconds;

        this.Initialize();
    }

    // ===== Public Methods ===== 



    /**
     * 
     */
    public Start(): void {
        console.log(`${this._name} - Started`);
    }

    /**
     * 
     */
    private Stop(): void {
        // Emit the StopWorkEventArgs
        var args = new StopWorkEventArgs();
        var msg = new StopWorkEventMessage(args, this._eventSender);
        this.logMessage(msg, MsgDirection.Emit);
        this.Bus.emit(msg);

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
    private OnReady: (value: ReadyEventSignal) => void = (e) => {

        this.logMessage(e, MsgDirection.Received);

        // Emit the DoWorkEventArgs
        var args = new DoWorkEventArgs(69);
        var msg = new DoWorkEventMessage(args, this._eventSender);
        this.logMessage(msg, MsgDirection.Emit);
        this.Bus.emit(msg);

        console.log(`${Environment.NewLine}Emitting ${this._eventsCount} messages, one message per ${this._timeSeconds} second(s)`);

        // Emit _eventsCount messages each per _timeSeconds second 
        let msgIdx = 1;
        Observable.interval(this._timeSeconds * 1000)
            .take(this._eventsCount)
            .subscribe(
            t => {
                let firstName = `$FirstName--${msgIdx}`;
                let lastName = `$LastName--${msgIdx}`;
                var args = new NameChangedEventArgs(firstName, lastName);
                // var msg = new EventMessage(args, this._eventSender);

                var msg = new NameChangedEventMessage(args, this._eventSender);

                this.logMessage(msg, MsgDirection.Emit, msgIdx++);
                this.Bus.emit(msg);
            },

            //-- OnError
            () => { },

            //-- OnCommplete
            () => {
                this.Stop();
            });
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
        let subscription = this.Bus.subscribe(new SubscriptionName(ReadyEventSignal.prototype), this.OnReady);
        this._subscriptions.push(subscription);
    }
}


