/**
 * EN: Real World Example for the Mediator design pattern
 *
 * Need: To have a messaging application to notify groups of people. Users
 * should not know about each other.
 *
 * Solution: Create a mediator to manage subscriptions and messages
 */

/**
 * EN: Extending the Mediator interface to have a payload to include messages
 */
interface Mediator {
    notify(sender: object, event: string, payload?: string): void;
}

/**
 * EN: The user plays the role of the independent component. It has an
 * instance of the mediator.
 */
class User {
    constructor(public name: string, private mediator: Mediator) {
        this.mediator.notify(this, 'subscribe');
    }

    receiveMessage(message: string) {
        console.log(`Message received by ${this.name}: ${message}`);
    }

    publishMessage(message: string) {
        this.mediator.notify(this, 'publish', message);
    }
}

/**
 * EN: The app is the concrete Mediator and implements all the events that
 * collaborators can notify: subscribe and publish
 */
class ChatAppMediator implements Mediator {
    private users: User[] = [];

    public notify(sender: object, event: string, payload?: string): void {
        if (event === 'subscribe') {
            const user = sender as User;
            console.log(`Subscribing ${user.name}`);
            this.users.push(user);
        }

        if (event === 'publish') {
            console.log(`Publishing message "${payload}" to the group`);
            const usersExcludingSender = this.users.filter(u => u !== sender);
            for (const user of usersExcludingSender) {
                user.receiveMessage(payload);
            }
        }
    }
}

/**
 * EN: The client code. Creating a user automatically subscribes them to the
 * group.
 */
const chatAppMediator = new ChatAppMediator();
const user1 = new User('Lightning', chatAppMediator);
const user2 = new User('Doc', chatAppMediator);
const user3 = new User('Mater', chatAppMediator);

user1.publishMessage('Catchaw');
user2.publishMessage('Ey kid');
user3.publishMessage('Tomato');
