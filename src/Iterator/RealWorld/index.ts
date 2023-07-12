/**
 * EN: Real World Example for the Iterator design pattern
 *
 * Need: Provide a standard way of traversing a collection of contacts to a
 * certain depth.
 *
 * Solution: Create an abstract factory to supply variants of file systems,
 * databases and log providers. There is a concrete factory for each
 * environment. This factory is configured to provide different concrete
 * connectors for each type of environment. For example, in development we
 * use the console to log messages, whereas in production we use the Sentry
 * service.
 */

class Contact implements IterableIterator<Contact> {
    private contacts: Contact[] = [];
    private iteratorFirstLevelIndex: number = 0;
    private iteratorSecondLevelIndex: number = 0;

    constructor(public name: string) {
    }

    addContact(contact: Contact) {
        this.contacts.push(contact);
    }

    next(): IteratorResult<Contact> {
        const done = this.iteratorFirstLevelIndex === this.contacts.length;
        if (done) {
            return { value: null, done: true };
        }
        const firstLevelContact = this.contacts[this.iteratorFirstLevelIndex];
        const value = firstLevelContact.contacts[this.iteratorSecondLevelIndex];
        if (this.iteratorSecondLevelIndex === firstLevelContact.contacts.length - 1) {
            this.iteratorFirstLevelIndex += 1;
            this.iteratorSecondLevelIndex = 0;
        } else {
            this.iteratorSecondLevelIndex += 1;
        }
        return { value, done };
    }

    // tslint:disable-next-line
    [Symbol.iterator]() {
        return this;
    }
}

/**
* EN: The client code can use the for..of syntax to traverse the first 2
* levels of the contact tree
*/

const superboss = new Contact('Super Boss');
const boss1 = new Contact('Boss One');
const boss2 = new Contact('Boss Two');
const boss3 = new Contact('Boss Three');
const employee11 = new Contact('Employee One One');
const employee12 = new Contact('Employee One Two');
const employee13 = new Contact('Employee One Three');
const employee21 = new Contact('Employee Two One');
const employee22 = new Contact('Employee Two Two');
const employee23 = new Contact('Employee Two Three');
const employee31 = new Contact('Employee Three One');
const employee32 = new Contact('Employee Three Two');
const employee33 = new Contact('Employee Three Three');
const tooLowInTheTree = new Contact('Contact too low in the tree');

superboss.addContact(boss1);
superboss.addContact(boss2);
superboss.addContact(boss3);

boss1.addContact(employee11);
boss1.addContact(employee12);
boss1.addContact(employee13);

boss2.addContact(employee21);
boss2.addContact(employee22);
boss2.addContact(employee23);

boss3.addContact(employee31);
boss3.addContact(employee32);
boss3.addContact(employee33);

employee33.addContact(tooLowInTheTree);

for (const contact of superboss) {
    console.log(contact.name);
}
