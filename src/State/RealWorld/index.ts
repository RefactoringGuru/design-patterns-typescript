/**
 * EN: Real World Example for the State design pattern
 *
 * Need: To implement a controller for a multi-product vending machine
 *
 * Solution: To create a finite state machine that controls the possible states and transitions.
 */

/**
 * EN: Some auxiliary interfaces
 */
interface Coin {
    name: string;
    value: number;
}

interface Product {
    name: string;
    value: number;
}

interface InventoryItem {
    product: Product;
    items: number;
}

interface Inventory
{
    items: InventoryItem[];
}

/**
 * EN: The Context defines the interface of interest to clients. It also
 * maintains a reference to an instance of a State subclass, which represents
 * the current state of the Context.
 */
class VendingMachineContext {
    /**
     * EN: A reference to the current state
     */
    private state: State;
    private credit: number = 0;
    private inventory: Inventory = INITIAL_INVENTORY;

    constructor(state: State) {
        this.transitionTo(state);
    }

    /**
     * EN: Some context public methods that the state will interact with
     */
    public addCredit(credit: number) {
        this.credit += credit;
        console.log(`Credit is now ${this.credit}`);
    }

    public resetCredit() {
        this.credit = 0;
        console.log('Credit has been reset');
    }

    public hasStockOf(product: Product): boolean {
        return this.inventory.items.some(i => i.product.name === product.name && i.items > 0);
    }

    public isOutOfStock(): boolean {
        return !this.inventory.items.some(i => i.items > 0);
    }

    public dispenseProduct(product: Product) {
        if (product.value > this.credit) {
            throw new Error(`You are trying to buy a product with price ${product.value} but your credit is only ${this.credit}`);
        }
        if (!this.hasStockOf(product)) {
            throw new Error(`No ${product.name} products left, select another one`);
        }
        const inventoryItem = this.inventory.items.find(i => i.product.name === product.name);
        const newInventoryItem = {
            product,
            items: inventoryItem.items - 1,
        };
        const restOfInventory = this.inventory.items.filter(i => i.product.name !== product.name);
        this.inventory.items = [...restOfInventory, newInventoryItem];
        console.log(`Product ${product.name} dispensed. Inventory is now:`, this.inventory.items);
        this.resetCredit();
    }

    /**
     * EN: The Context allows changing the State object at runtime.
     */
    public transitionTo(state: State): void {
        console.log(`Context: Transition to ${(<any>state).constructor.name}.`);
        this.state = state;
        this.state.setContext(this);
    }

    /**
     * EN: The Context delegates part of its behavior to the current State
     */
    public insertCoin(coin: Coin): void {
        this.state.insertCoin(coin);
    }

    public selectProduct(product: Product): void {
        this.state.selectProduct(product);
    }
}

/**
 * EN: The base State class declares methods that all Concrete State should
 * implement and also provides a backreference to the Context object, associated
 * with the State. This backreference can be used by States to transition the
 * Context to another State.
 */
abstract class State {
    protected context: VendingMachineContext;

    public setContext(context: VendingMachineContext) {
        this.context = context;
    }

    public abstract insertCoin(coin: Coin): void;
    public abstract selectProduct(product: Product): void;
}

/**
 * EN: We will implement only 3 states. States are only responsible for the
 * state transitions. We will delegate all the actions to the context,
 * following the 'tell don't ask' principle.
 */
class InitialReadyState extends State {
    public insertCoin(coin: Coin): void {
        this.context.addCredit(coin.value);
        this.context.transitionTo(new TransactionStarted());
    }

    public selectProduct(_: Product): void {
        throw new Error('You should insert coins before selecting the product');
    }
}

class TransactionStarted extends State {
    public insertCoin(coin: Coin): void {
        this.context.addCredit(coin.value);
    }

    public selectProduct(product: Product): void {
        this.context.dispenseProduct(product);

        if (this.context.isOutOfStock()) {
            this.context.transitionTo(new OutOfStock());
        } else {
            this.context.transitionTo(new InitialReadyState());
        }
    }
}

class OutOfStock extends State {
    public insertCoin(_: Coin): void {
        throw new Error('Stop inserting coins, we completely run out of stock');
    }
    public selectProduct(_: Product): void {
        throw new Error('Stop selecting products, we completely run of stock');
    }
}

/**
 * EN: Constants to reuse throughtout the application
 */
const SODA: Product = {
    name: 'Soda',
    value: 15,
};
const NUTS: Product = {
    name: 'Nuts',
    value: 25,
};

const INITIAL_INVENTORY: Inventory = {
    items: [
        { product: SODA, items: 2 },
        { product: NUTS, items: 0 },
    ],
};

const NICKEL = { name: 'nickel', value: 5 };
const DIME = { name: 'dime', value: 10 };

/**
 * EN: The client code should handle edge cases and errors, in this case, only
 * to log them to the console output
 */
const context = new VendingMachineContext(new InitialReadyState());

const handleError = (error) => {
    console.error(error.message);
};

try {
    context.selectProduct(NUTS);
} catch (error) {
    handleError(error);
}
context.insertCoin(DIME);
try {
    context.selectProduct(SODA);
} catch (error) {
    handleError(error);
}
context.insertCoin(NICKEL);
context.selectProduct(SODA);

context.insertCoin(DIME);
context.insertCoin(NICKEL);
try {
    context.selectProduct(SODA);
} catch (error) {
    handleError(error);
}
try {
    context.insertCoin(NICKEL);
} catch (error) {
    handleError(error);
}
