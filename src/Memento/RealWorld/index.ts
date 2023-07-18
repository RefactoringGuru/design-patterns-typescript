/**
 * EN: Real World Example for the Memento design pattern
 *
 * Need: To save all versions of an employee thoughtout their lifecycle
 *
 * Solution: Employee can save and restore their mementos, stored in a history
 * class as caretaker
 */
const DEFAULT_MONTHLY_EXPENSES_LIMIT = 0;

class EmployeeOriginator {
    private _name: string;
    private _salary: number;
    private _monthlyExpensesLimit: number;

    constructor(name: string, salary: number) {
        this._name = name;
        this._salary = salary;
        this._monthlyExpensesLimit = DEFAULT_MONTHLY_EXPENSES_LIMIT;
    }

    get name() { return this._name; }
    get salary() { return this._salary; }
    /* We don't need a public getter to save montly expenses limit to the
     * state, as it's the employee who has the responsibility of saving their own state
     */

    public raiseSalaryTo(newSalary: number) {
        this._salary = newSalary;
    }

    public raiseLimitTo(newLimit: number) {
        this._monthlyExpensesLimit = newLimit;
    }

    public saveSnapshot(): Memento<EmployeeState> {
        return new EmployeeMemento({
            salary: this._salary,
            monthlyExpensesLimit: this._monthlyExpensesLimit,
        });
    }

    public restore(memento: Memento<EmployeeState>): void {
        this._salary = memento.state.salary;
        this._monthlyExpensesLimit = memento.state.monthlyExpensesLimit;
        console.log(`Originator: Restored state from memento: ${memento.name}`);
    }

    public showState(): void {
        console.log(`Employee: State for ${this.name} is salary=${this._salary} and monthlyExpensesLimit=${this._monthlyExpensesLimit}`);
    }
}

/**
 * EN: The Memento interface provides provides some metadata, apart from the
 * originator state. We created the state public, but we can hide this
 * implementation detail from the clients by setting the salary and
 * monthlyExpensesLimit in the memento constructor and moving the restore
 * method to the memento class instead of the originator
 */
interface Memento<T> {
    readonly state: T;
    readonly name: string;
    readonly date: Date;
}

/**
 * EN: We also declare an interface for the employee (originator) state. Not
 * all the employee fields should be in the state.
 */
interface EmployeeState {
    salary: number;
    monthlyExpensesLimit: number;
}

class EmployeeMemento implements Memento<EmployeeState> {
    private _state: EmployeeState;
    private _date: Date;
    private _name: string;

    constructor(state: EmployeeState) {
        this._state = state;
        this._date = new Date();
        this._name = `date=${this._date.toISOString().substring(0, 10)}, \
salary=${this._state.salary}, limit=\
${this._state.monthlyExpensesLimit}`;
    }

    get state() { return this._state; }
    get name() { return this._name; }
    get date() { return this._date; }
}

/**
 * EN: The Caretaker doesn't need to access the state of the originator.
 */
class EmployeeCaretaker {
    private _employeeMementos: Memento<EmployeeState>[] = [];

    private _employee: EmployeeOriginator;

    constructor(employee: EmployeeOriginator) {
        this._employee = employee;
    }

    public backup(): void {
        console.log('Employee caretaker: Saving employee\'s state...');
        this._employeeMementos.push(this._employee.saveSnapshot());
    }

    public undo(): void {
        if (!this._employeeMementos.length) {
            return;
        }
        const employeeMementoToRestore = this._employeeMementos.pop();

        console.log(`Employee caretaker: Restoring memento: ${employeeMementoToRestore.name}`);
        this._employee.restore(employeeMementoToRestore);
    }

    public showHistory(): void {
        if (!this._employeeMementos.length) {
            console.log('Empty employee mementos list');
        }
        for (const memento of this._employeeMementos) {
            console.log(memento.name);
        }
    }
}

/**
 * EN: The client code only interacts with mementos via the caretaker.
 */
console.log('Client: Creating employee originator and caretaker...');
const originator = new EmployeeOriginator('Justin Case', 50000);
const caretaker = new EmployeeCaretaker(originator);

console.log('\nClient: Let\'s change states saving state before each change...');
caretaker.backup();
originator.raiseSalaryTo(60000);
caretaker.backup();
originator.raiseLimitTo(100);
caretaker.backup();
originator.raiseSalaryTo(100000);

console.log('\nClient: This is the history of mementos and the state of the originator:');
caretaker.showHistory();
originator.showState();

console.log('\nClient: Changed state up to 3 times, let\'s rollback to the initial state!');
caretaker.undo();
originator.showState();
caretaker.undo();
originator.showState();
caretaker.undo();
originator.showState();

console.log('\nClient: Now the history of mementos should be empty');
caretaker.showHistory();

console.log('\nClient: A new undo will leave the employee untouched');
caretaker.undo();
originator.showState();
