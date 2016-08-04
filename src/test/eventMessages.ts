/**
 * This file contains the following components
 * @class : StopWorkEventMessage
 * @class : DoWorkEventMessage
 * @class : NameChangedEventMessage
 */

import { IEventSender } from '../bus/eventContracts';
import { StopWorkEventArgs, DoWorkEventArgs, NameChangedEventArgs } from './eventArgs';
import { EventMessage } from '../bus/events';

'use strict';


/**
 * 
 * 
 * @export
 * @class StopWorkEventMessage
 * @extends {EventMessage<StopWorkEventArgs>}
 */
export class StopWorkEventMessage extends EventMessage<StopWorkEventArgs>{

    /**
     * Creates an instance of StopWorkEventMessage.
     * 
     * @param {StopWorkEventArgs} args
     * @param {IEventSender} [sender]
     */
    constructor(args: StopWorkEventArgs, sender?: IEventSender) {
        super(args, sender);
    }
}

/**
 * 
 * 
 * @export
 * @class DoWorkEventMessage
 * @extends {EventMessage<DoWorkEventArgs>}
 */
export class DoWorkEventMessage extends EventMessage<DoWorkEventArgs>{

    /**
     * Creates an instance of DoWorkEventMessage.
     * 
     * @param {DoWorkEventArgs} args
     * @param {IEventSender} [sender]
     */
    constructor(args: DoWorkEventArgs, sender?: IEventSender) {
        super(args, sender);
    }
}

/**
 * 
 * 
 * @export
 * @class NameChangedEventMessage
 * @extends {EventMessage<NameChangedEventArgs>}
 */
export class NameChangedEventMessage extends EventMessage<NameChangedEventArgs>{

    /**
     * Creates an instance of NameChangedEventMessage.
     * 
     * @param {NameChangedEventArgs} args
     * @param {IEventSender} [sender]
     */
    constructor(args: NameChangedEventArgs, sender?: IEventSender) {
        super(args, sender);
    }
}


