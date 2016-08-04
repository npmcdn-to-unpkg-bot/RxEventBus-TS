/**
 * This file contains the following components
 * @class : StopWorkEventMessage
 */

import { IEventSender } from '../bus/eventContracts';
import { LogicReadyEventArgs, StatusChangedEventArgs, InitStatusEventArgs } from './eventArgs';
import { EventMessage } from '../bus/events';

'use strict';

/**
 * 
 * 
 * @export
 * @class LogicReadyEventMessage
 * @extends {EventMessage<LogicReadyEventArgs>}
 */
export class LogicReadyEventMessage extends EventMessage<LogicReadyEventArgs>{

/**
 * Creates an instance of LogicReadyEventMessage.
 * 
 * @param {LogicReadyEventArgs} args
 * @param {IEventSender} [sender]
 */
    constructor(args: LogicReadyEventArgs, sender?: IEventSender) {
        super(args, sender);
    }
}

/**
 * 
 * 
 * @export
 * @class StatusChangedEventMessage
 * @extends {EventMessage<StatusChangedEventArgs>}
 */
export class StatusChangedEventMessage extends EventMessage<StatusChangedEventArgs>{

/**
 * Creates an instance of StatusChangedEventMessage.
 * 
 * @param {StatusChangedEventArgs} args
 * @param {IEventSender} [sender]
 */
    constructor(args: StatusChangedEventArgs, sender?: IEventSender) {
        super(args, sender);
    }
}

export class InitStatusEventMessage extends EventMessage<InitStatusEventArgs>{

/**
 * Creates an instance of StatusChangedEventMessage.
 * 
 * @param {StatusChangedEventArgs} args
 * @param {IEventSender} [sender]
 */
    constructor(args: InitStatusEventArgs, sender?: IEventSender) {
        super(args, sender);
    }
}

