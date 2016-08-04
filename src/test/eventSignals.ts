/**
 * This file contains the following components
 * @class : ReadyEventSignal
 */

import { IEventSender } from '../bus/eventContracts';
import { EventSignal } from '../bus/events';

'use strict';

/**
 * 
 * 
 * @export
 * @class ReadyEventSignal
 * @extends {EventSignal}
 */
export class ReadyEventSignal extends EventSignal {

    /**
     * Creates an instance of ReadyEventSignal.
     * 
     * @param {IEventSender} [sender]
     */
    constructor(sender?: IEventSender) {
        super(sender);
    }
}

