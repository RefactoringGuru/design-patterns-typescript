/**
 * EN: Command Design Pattern
 *
 * Intent: Turns a request into a stand-alone object that contains all
 * information about the request. This transformation lets you parameterize
 * methods with different requests, delay or queue a request's execution, and
 * support undoable operations.
 *
 * RU: Паттерн Команда
 *
 * Назначение: Превращает запросы в объекты, позволяя передавать их как
 * аргументы при вызове методов, ставить запросы в очередь, логировать их, а
 * также поддерживать отмену операций.
 */

/**
 * EN: The Command interface declares a method for executing a command.
 *
 * RU: Интерфейс Команды объявляет метод для выполнения команд.
 */
interface Command {
    execute(): void;
}

/**
 * EN: Some commands can implement simple operations on their own.
 *
 * RU: Некоторые команды способны выполнять простые операции самостоятельно.
 */
class SimpleCommand implements Command {
    private payload: string;

    constructor(payload: string) {
        this.payload = payload;
    }

    public execute(): void {
        console.log(`SimpleCommand: See, I can do simple things like printing (${this.payload})`);
    }
}

/**
 * EN: However, some commands can delegate more complex operations to other
 * objects, called "receivers."
 *
 * RU: Но есть и команды, которые делегируют более сложные операции другим
 * объектам, называемым «получателями».
 */
class ComplexCommand implements Command {
    private receiver: Receiver;

    /**
     * EN: Context data, required for launching the receiver's methods.
     *
     * RU: Данные о контексте, необходимые для запуска методов получателя.
     */
    private a: string;

    private b: string;

    /**
     * EN: Complex commands can accept one or several receiver objects along
     * with any context data via the constructor.
     *
     * RU: Сложные команды могут принимать один или несколько
     * объектов-получателей вместе с любыми данными о контексте через
     * конструктор.
     */
    constructor(receiver: Receiver, a: string, b: string) {
        this.receiver = receiver;
        this.a = a;
        this.b = b;
    }

    /**
     * EN: Commands can delegate to any methods of a receiver.
     *
     * RU: Команды могут делегировать выполнение любым методам получателя.
     */
    public execute(): void {
        console.log('ComplexCommand: Complex stuff should be done by a receiver object.');
        this.receiver.doSomething(this.a);
        this.receiver.doSomethingElse(this.b);
    }
}

/**
 * EN: The Receiver classes contain some important business logic. They know how
 * to perform all kinds of operations, associated with carrying out a request.
 * In fact, any class may serve as a Receiver.
 *
 * RU: Классы Получателей содержат некую важную бизнес-логику. Они умеют
 * выполнять все виды операций, связанных с выполнением запроса. Фактически,
 * любой класс может выступать Получателем.
 */
class Receiver {
    public doSomething(a: string): void {
        console.log(`Receiver: Working on (${a}.)`);
    }

    public doSomethingElse(b: string): void {
        console.log(`Receiver: Also working on (${b}.)`);
    }
}

/**
 * EN: The Invoker is associated with one or several commands. It sends a
 * request to the command.
 *
 * RU: Отправитель связан с одной или несколькими командами. Он отправляет
 * запрос команде.
 */
class Invoker {
    private onStart: Command;

    private onFinish: Command;

    /**
     * EN: Initialize commands.
     *
     * RU: Инициализация команд.
     */
    public setOnStart(command: Command): void {
        this.onStart = command;
    }

    public setOnFinish(command: Command): void {
        this.onFinish = command;
    }

    /**
     * EN: The Invoker does not depend on concrete command or receiver classes.
     * The Invoker passes a request to a receiver indirectly, by executing a
     * command.
     *
     * RU: Отправитель не зависит от классов конкретных команд и получателей.
     * Отправитель передаёт запрос получателю косвенно, выполняя команду.
     */
    public doSomethingImportant(): void {
        console.log('Invoker: Does anybody want something done before I begin?');
        if (this.isCommand(this.onStart)) {
            this.onStart.execute();
        }

        console.log('Invoker: ...doing something really important...');

        console.log('Invoker: Does anybody want something done after I finish?');
        if (this.isCommand(this.onFinish)) {
            this.onFinish.execute();
        }
    }

    private isCommand(object): object is Command {
        return object.execute !== undefined;
    }
}

/**
 * EN: The client code can parameterize an invoker with any commands.
 *
 * RU: Клиентский код может параметризовать отправителя любыми командами.
 */
const invoker = new Invoker();
invoker.setOnStart(new SimpleCommand('Say Hi!'));
const receiver = new Receiver();
invoker.setOnFinish(new ComplexCommand(receiver, 'Send email', 'Save report'));

invoker.doSomethingImportant();
