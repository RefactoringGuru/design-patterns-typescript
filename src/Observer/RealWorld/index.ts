import { EventEmitter } from 'node:events';
/**
 * EN: Real World Example for the Observer design pattern
 *
 * Need: Log any modification of the device volume that the user do.
 *
 * Solution: We will use the Observer pattern implemented by Node and its
 * Events.
 */

/**
 * EN: The subject will extend the EventEmitter class. We will automatically
 * subscribe to any new listener added or removed to log activity
 */
class VolumeControllerSubject extends EventEmitter {
    private _volume: number = 50;

    public get volume(): number { return this._volume; }

    constructor() {
        super();
        this.on('newListener', (eventName) => {
            console.log(`Added a new listener to the '${eventName}' event`);
        });
        this.on('removeListener', (eventName) => {
            console.log(`Removed a listener of the ${eventName} event from the list`);
        });
    }

    volumeUp(): void {
        this._volume += 5;
        this.emit('volumeUp', this._volume);
    }

    volumeDown(): void {
        this._volume -= 5;
        this.emit('volumeDown', this._volume);
    }
}

/**
 * EN: We will define a custom class for an observer. It will keep an
 * instance of the subject received on the constructor. Also in the constructor
 * it will automatically subscribe to the 2 events available.
 */
class LoggingObserver {
    constructor(private volumeController: VolumeControllerSubject) {
        this.volumeController.on('volumeUp', this.volumeUpObserver);
        this.volumeController.on('volumeDown', this.volumeDownObserver);
    }

    private volumeUpObserver(volume) {
        console.log(`Volume up, now the volume value is ${volume}`);
    }

    private volumeDownObserver(volume) {
        console.log(`Volume down, now the volume value is ${volume}`);
    }

    /**
     * EN: We will also include a method to unsubscribe from one of the events
     */
    public stopObservingVolumeDown() {
        this.volumeController.removeListener('volumeDown', this.volumeDownObserver);
    }
}

/**
 * EN: The client code will declare instances for the subject and the observer
 * and start interacting with the device volume
 */
const volumeController = new VolumeControllerSubject();
const loggingObserver = new LoggingObserver(volumeController);

volumeController.volumeUp();
volumeController.volumeDown();
volumeController.volumeUp();
volumeController.volumeDown();

/**
 * EN: It is expected that if we stop observing one of the events, then we will
 * only observe the other event
 */
loggingObserver.stopObservingVolumeDown();

volumeController.volumeUp();
volumeController.volumeDown();
volumeController.volumeUp();
volumeController.volumeDown();
