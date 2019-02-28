/**
 * EN: State Design Pattern
 *
 * Intent: Lets an object alter its behavior when its internal state changes. It
 * appears as if the object changed its class.
 *
 * RU: Паттерн Состояние
 *
 * Назначение: Позволяет объектам менять поведение в зависимости от своего
 * состояния. Извне создаётся впечатление, что изменился класс объекта.
 */

/**
 * EN: The Context defines the interface of interest to clients. It also
 * maintains a reference to an instance of a State subclass, which represents
 * the current state of the Context.
 *
 * RU: Контекст определяет интерфейс, представляющий интерес для клиентов. Он
 * также хранит ссылку на экземпляр подкласса Состояния, который отображает
 * текущее состояние Контекста.
 */
class Context {
    /**
     * EN: @type {State} A reference to the current state of the Context.
     *
     * RU: @type {State} Ссылка на текущее состояние Контекста.
     */
    private state: State;

    constructor(state: State) {
        this.transitionTo(state);
    }

    /**
     * EN: The Context allows changing the State object at runtime.
     *
     * RU: Контекст позволяет изменять объект Состояния во время выполнения.
     */
    public transitionTo(state: State): void {
        console.log(`Context: Transition to ${(<any>state).constructor.name}.`);
        this.state = state;
        this.state.setContext(this);
    }

    /**
     * EN: The Context delegates part of its behavior to the current State
     * object.
     *
     * RU: Контекст делегирует часть своего поведения текущему объекту
     * Состояния.
     */
    public request1(): void {
        this.state.handle1();
    }

    public request2(): void {
        this.state.handle2();
    }
}

/**
 * EN: The base State class declares methods that all Concrete State should
 * implement and also provides a backreference to the Context object, associated
 * with the State. This backreference can be used by States to transition the
 * Context to another State.
 *
 * RU: Базовый класс Состояния объявляет методы, которые должны реализовать все
 * Конкретные Состояния, а также предоставляет обратную ссылку на объект
 * Контекст, связанный с Состоянием. Эта обратная ссылка может использоваться
 * Состояниями для передачи Контекста другому Состоянию.
 */
abstract class State {
    protected context: Context;

    public setContext(context: Context) {
        this.context = context;
    }

    public abstract handle1(): void;

    public abstract handle2(): void;
}

/**
 * EN: Concrete States implement various behaviors, associated with a state of
 * the Context.
 *
 * RU: Конкретные Состояния реализуют различные модели поведения, связанные с
 * состоянием Контекста.
 */
class ConcreteStateA extends State {
    public handle1(): void {
        console.log('ConcreteStateA handles request1.');
        console.log('ConcreteStateA wants to change the state of the context.');
        this.context.transitionTo(new ConcreteStateB());
    }

    public handle2(): void {
        console.log('ConcreteStateA handles request2.');
    }
}

class ConcreteStateB extends State {
    public handle1(): void {
        console.log('ConcreteStateB handles request1.');
    }

    public handle2(): void {
        console.log('ConcreteStateB handles request2.');
        console.log('ConcreteStateB wants to change the state of the context.');
        this.context.transitionTo(new ConcreteStateA());
    }
}

/**
 * EN: The client code.
 *
 * RU: Клиентский код.
 */
const context = new Context(new ConcreteStateA());
context.request1();
context.request2();
