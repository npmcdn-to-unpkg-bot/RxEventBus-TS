import { EventSender, EventMessage } from './bus/events';

// test
import { NameChangedEventArgs, DoWorkEventArgs} from './test/eventArgs';
import { NameChangedEventMessage, DoWorkEventMessage} from './test/eventMessages';
import { ReadyEventSignal} from './test/eventSignals';
import { EventReceiver } from './test/eventReceiver';
import { EventProducer } from './test/eventProducer';

// test UD
import { UdFrontEnd } from './testUD/udFrontEnd';
import { UdLogic } from './testUD/udLogic';


import { Environment } from './common/share';

'use strict';

/**
 * Application Main class
 * 
 * @export
 * @class Main
 */
export class Main {

    /**
     * 
     */
    testEventMessage(): void {

        // Build a NameChanged EventMessage with an EventSender
        let sender = new EventSender("Main app");
        let nameChangeEventArgs = new NameChangedEventArgs("firstName", "lastName");
        let nameChangedEventMessage = new NameChangedEventMessage(nameChangeEventArgs, sender);

        // Build a StartWork EventMessage without any EventSender
        let doWorkEventArgs = new DoWorkEventArgs(125);
        let doWorkEventMessage = new DoWorkEventMessage(doWorkEventArgs);

        // Build a ReadEventSignal
        let readyEventSignal = new ReadyEventSignal();
        let separator = '-'.repeat(25);

        console.log(Environment.NewLine, "=== Class names ===", Environment.NewLine);
        console.log(nameChangeEventArgs.getTypeName());
        console.log(nameChangedEventMessage.getTypeName());
        console.log(doWorkEventArgs.getTypeName());
        console.log(doWorkEventArgs.getTypeName());
        console.log(readyEventSignal.getTypeName());
        console.log(Environment.NewLine, separator, Environment.NewLine);

        console.log(Environment.NewLine, "=== Object dump names ===", Environment.NewLine);
        console.log(nameChangeEventArgs);
        console.log(nameChangedEventMessage);
        console.log(doWorkEventArgs);
        console.log(doWorkEventArgs);
        console.log(readyEventSignal);
        console.log(Environment.NewLine, separator, Environment.NewLine);
    }

    /**
     * 
     */
    test() {

        console.log(Environment.NewLine, "=== Start Event Message/Signal exchanges ===", Environment.NewLine);

        // Create the Event/Signal handlers
        var busName = "Default";
        var producer = new EventProducer(busName, "App-Producer", 22, 5)
        var receiver = new EventReceiver(busName, "App-Receiver")
        producer.Start();
        receiver.Start();
    }

    testUD() {

        console.log(Environment.NewLine, "=== Start UD Test ===", Environment.NewLine);

        // Create the Event/Signal handlers
        var busName = "Default";
        var udFrontEnd = new UdFrontEnd(busName, "UD-UI")
        var udLogic = new UdLogic(busName, "UD-Logic")
        udFrontEnd.Start();
        udLogic.Start();
    }
}

// Crete the App
export var app = new Main();

// Test EventMessages (EventArgs), EventSignals 
//app.testEventMessage();

// EventBased interaction between Producer / Receiver
app.test();

//app.testUD();


