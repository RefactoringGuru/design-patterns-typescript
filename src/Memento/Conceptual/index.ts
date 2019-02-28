/**
 * EN: Memento Design Pattern
 *
 * Intent: Lets you save and restore the previous state of an object without
 * revealing the details of its implementation.
 *
 * RU: Паттерн Снимок
 *
 * Назначение: Фиксирует и восстанавливает внутреннее состояние объекта таким
 * образом, чтобы в дальнейшем объект можно было восстановить в этом состоянии
 * без нарушения инкапсуляции.
 */

/**
 * EN: The Originator holds some important state that may change over time. It
 * also defines a method for saving the state inside a memento and another
 * method for restoring the state from it.
 *
 * RU: Создатель содержит некоторое важное состояние, которое может со временем
 * меняться. Он также объявляет метод сохранения состояния внутри снимка и метод
 * восстановления состояния из него.
 */
class Originator {
    /**
     * EN: For the sake of simplicity, the originator's state is stored inside a
     * single variable.
     *
     * RU: Для удобства состояние создателя хранится внутри одной переменной.
     */
    private state: string;

    constructor(state: string) {
        this.state = state;
        console.log(`Originator: My initial state is: ${state}`);
    }

    /**
     * EN: The Originator's business logic may affect its internal state.
     * Therefore, the client should backup the state before launching methods of
     * the business logic via the save() method.
     *
     * RU: Бизнес-логика Создателя может повлиять на его внутреннее состояние.
     * Поэтому клиент должен выполнить резервное копирование состояния с помощью
     * метода save перед запуском методов бизнес-логики.
     */
    public doSomething(): void {
        console.log('Originator: I\'m doing something important.');
        this.state = this.generateRandomString(30);
        console.log(`Originator: and my state has changed to: ${this.state}`);
    }

    private generateRandomString(length: number = 10): string {
        const charSet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

        return Array
            .apply(null, { length })
            .map(() => charSet.charAt(Math.floor(Math.random() * charSet.length)))
            .join('');
    }

    /**
     * EN: Saves the current state inside a memento.
     *
     * RU: Сохраняет текущее состояние внутри снимка.
     */
    public save(): Memento {
        return new ConcreteMemento(this.state);
    }

    /**
     * EN: Restores the Originator's state from a memento object.
     *
     * RU: Восстанавливает состояние Создателя из объекта снимка.
     */
    public restore(memento: Memento): void {
        this.state = memento.getState();
        console.log(`Originator: My state has changed to: ${this.state}`);
    }
}

/**
 * EN: The Memento interface provides a way to retrieve the memento's metadata,
 * such as creation date or name. However, it doesn't expose the Originator's
 * state.
 *
 * RU: Интерфейс Снимка предоставляет способ извлечения метаданных снимка, таких
 * как дата создания или название. Однако он не раскрывает состояние Создателя.
 */
interface Memento {
    getState(): string;

    getName(): string;

    getDate(): string;
}

/**
 * EN: The Concrete Memento contains the infrastructure for storing the
 * Originator's state.
 *
 * RU: Конкретный снимок содержит инфраструктуру для хранения состояния
 * Создателя.
 */
class ConcreteMemento implements Memento {
    private state: string;

    private date: string;

    constructor(state: string) {
        this.state = state;
        this.date = new Date().toISOString().slice(0, 19).replace('T', ' ');
    }

    /**
     * EN: The Originator uses this method when restoring its state.
     *
     * RU: Создатель использует этот метод, когда восстанавливает своё
     * состояние.
     */
    public getState(): string {
        return this.state;
    }

    /**
     * EN: The rest of the methods are used by the Caretaker to display
     * metadata.
     *
     * RU: Остальные методы используются Опекуном для отображения метаданных.
     */
    public getName(): string {
        return `${this.date} / (${this.state.substr(0, 9)}...)`;
    }

    public getDate(): string {
        return this.date;
    }
}

/**
 * EN: The Caretaker doesn't depend on the Concrete Memento class. Therefore, it
 * doesn't have access to the originator's state, stored inside the memento. It
 * works with all mementos via the base Memento interface.
 *
 * RU: Опекун не зависит от класса Конкретного Снимка. Таким образом, он не
 * имеет доступа к состоянию создателя, хранящемуся внутри снимка. Он работает
 * со всеми снимками через базовый интерфейс Снимка.
 */
class Caretaker {
    private mementos: Memento[] = [];

    private originator: Originator;

    constructor(originator: Originator) {
        this.originator = originator;
    }

    public backup(): void {
        console.log('\nCaretaker: Saving Originator\'s state...');
        this.mementos.push(this.originator.save());
    }

    public undo(): void {
        if (!this.mementos.length) {
            return;
        }
        const memento = this.mementos.pop();

        console.log(`Caretaker: Restoring state to: ${memento.getName()}`);
        this.originator.restore(memento);
    }

    public showHistory(): void {
        console.log('Caretaker: Here\'s the list of mementos:');
        for (const memento of this.mementos) {
            console.log(memento.getName());
        }
    }
}

/**
 * EN: Client code.
 *
 * RU: Клиентский код.
 */
const originator = new Originator('Super-duper-super-puper-super.');
const caretaker = new Caretaker(originator);

caretaker.backup();
originator.doSomething();

caretaker.backup();
originator.doSomething();

caretaker.backup();
originator.doSomething();

console.log('');
caretaker.showHistory();

console.log('\nClient: Now, let\'s rollback!\n');
caretaker.undo();

console.log('\nClient: Once more!\n');
caretaker.undo();
