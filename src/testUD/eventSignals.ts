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
 * @class LoginEventSignal
 * @extends {EventSignal}
 */
export class LoginEventSignal extends EventSignal {

/**
 * Creates an instance of LoginEventSignal.
 * 
 * @param {IEventSender} [sender]
 */    constructor(sender?: IEventSender) {
        super(sender);
    }
}

/**
 * 
 * 
 * @export
 * @class LogoutEventSignal
 * @extends {EventSignal}
 */
export class LogoutEventSignal extends EventSignal {

/**
 * Creates an instance of LogoutEventSignal.
 * 
 * @param {IEventSender} [sender]
 */    constructor(sender?: IEventSender) {
        super(sender);
    }
}

/**
 * 
 * 
 * @export
 * @class StatusLogoutEventSignal
 * @extends {EventSignal}
 */
export class StatusLogoutEventSignal extends EventSignal {

    /**
     * Creates an instance of StatusLogoutEventSignal.
     * 
     * @param {IEventSender} [sender]
     */
    constructor(sender?: IEventSender) {
        super(sender);
    }
}


