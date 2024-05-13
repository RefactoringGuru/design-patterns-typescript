/**
 * EN: Chain of Responsibility Design Pattern
 *
 * Intent: Lets you pass requests along a chain of handlers. Upon receiving a
 * request, each handler decides either to process the request or to pass it to
 * the next handler in the chain.
 *
 * RU: Паттерн Цепочка обязанностей
 *
 * Назначение: Позволяет передавать запросы последовательно по цепочке
 * обработчиков. Каждый последующий обработчик решает, может ли он обработать
 * запрос сам и стоит ли передавать запрос дальше по цепи.
 */

/**
 * EN: The Handler interface declares a method for building the chain of
 * handlers. It also declares a method for executing a request.
 *
 * RU: Интерфейс Обработчика объявляет метод построения цепочки обработчиков. Он
 * также объявляет метод для выполнения запроса.
 */
interface Handler<Request = string, Result = string> {
    setNext(handler: Handler<Request, Result>): Handler<Request, Result>;

    handle(request: Request): Result;
}

/**
 * EN: The default chaining behavior can be implemented inside a base handler
 * class.
 *
 * RU: Поведение цепочки по умолчанию может быть реализовано внутри базового
 * класса обработчика.
 */
abstract class AbstractHandler implements Handler
{
    private nextHandler: Handler;

    public setNext(handler: Handler): Handler {
        this.nextHandler = handler;
        // EN: Returning a handler from here will let us link handlers in a
        // convenient way like this:
        // monkey.setNext(squirrel).setNext(dog);
        //
        // RU: Возврат обработчика отсюда позволит связать обработчики простым
        // способом, вот так:
        // monkey.setNext(squirrel).setNext(dog);
        return handler;
    }

    public handle(request: string): string {
        if (this.nextHandler) {
            return this.nextHandler.handle(request);
        }

        return null;
    }
}

/**
 * EN: All Concrete Handlers either handle a request or pass it to the next
 * handler in the chain.
 *
 * RU: Все Конкретные Обработчики либо обрабатывают запрос, либо передают его
 * следующему обработчику в цепочке.
 */
class MonkeyHandler extends AbstractHandler {
    public handle(request: string): string {
        if (request === 'Banana') {
            return `Monkey: I'll eat the ${request}.`;
        }
        return super.handle(request);

    }
}

class SquirrelHandler extends AbstractHandler {
    public handle(request: string): string {
        if (request === 'Nut') {
            return `Squirrel: I'll eat the ${request}.`;
        }
        return super.handle(request);
    }
}

class DogHandler extends AbstractHandler {
    public handle(request: string): string {
        if (request === 'MeatBall') {
            return `Dog: I'll eat the ${request}.`;
        }
        return super.handle(request);
    }
}

/**
 * EN: The client code is usually suited to work with a single handler. In most
 * cases, it is not even aware that the handler is part of a chain.
 *
 * RU: Обычно клиентский код приспособлен для работы с единственным
 * обработчиком. В большинстве случаев клиенту даже неизвестно, что этот
 * обработчик является частью цепочки.
 */
function clientCode(handler: Handler) {
    const foods = ['Nut', 'Banana', 'Cup of coffee'];

    for (const food of foods) {
        console.log(`Client: Who wants a ${food}?`);

        const result = handler.handle(food);
        if (result) {
            console.log(`  ${result}`);
        } else {
            console.log(`  ${food} was left untouched.`);
        }
    }
}

/**
 * EN: The other part of the client code constructs the actual chain.
 *
 * RU: Другая часть клиентского кода создает саму цепочку.
 */
const monkey = new MonkeyHandler();
const squirrel = new SquirrelHandler();
const dog = new DogHandler();

monkey.setNext(squirrel).setNext(dog);

/**
 * EN: The client should be able to send a request to any handler, not just the
 * first one in the chain.
 *
 * RU: Клиент должен иметь возможность отправлять запрос любому обработчику, а
 * не только первому в цепочке.
 */
console.log('Chain: Monkey > Squirrel > Dog\n');
clientCode(monkey);
console.log('');

console.log('Subchain: Squirrel > Dog\n');
clientCode(squirrel);
