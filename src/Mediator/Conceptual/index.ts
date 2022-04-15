/**
 * EN: Mediator Design Pattern
 *
 * Intent: Lets you reduce chaotic dependencies between objects. The pattern
 * restricts direct communications between the objects and forces them to
 * collaborate only via a mediator object.
 *
 * RU: Паттерн Посредник
 *
 * Назначение: Позволяет уменьшить связанность множества классов между собой,
 * благодаря перемещению этих связей в один класс-посредник.
 */

/**
 * EN: The Mediator interface declares a method used by components to notify the
 * mediator about various events. The Mediator may react to these events and
 * pass the execution to other components.
 *
 * RU: Интерфейс Посредника предоставляет метод, используемый компонентами для
 * уведомления посредника о различных событиях. Посредник может реагировать на
 * эти события и передавать исполнение другим компонентам.
 */
interface Mediator {
    notify(sender: object, event: string): void;
}

/**
 * EN: Concrete Mediators implement cooperative behavior by coordinating several
 * components.
 *
 * RU: Конкретные Посредники реализуют совместное поведение, координируя
 * отдельные компоненты.
 */
class ConcreteMediator implements Mediator {
    private component1: Component1;

    private component2: Component2;

    constructor(c1: Component1, c2: Component2) {
        this.component1 = c1;
        this.component1.setMediator(this);
        this.component2 = c2;
        this.component2.setMediator(this);
    }

    public notify(sender: object, event: string): void {
        if (event === 'A') {
            console.log('Mediator reacts on A and triggers following operations:');
            this.component2.doC();
        }

        if (event === 'D') {
            console.log('Mediator reacts on D and triggers following operations:');
            this.component1.doB();
            this.component2.doC();
        }
    }
}

/**
 * EN: The Base Component provides the basic functionality of storing a
 * mediator's instance inside component objects.
 *
 * RU: Базовый Компонент обеспечивает базовую функциональность хранения
 * экземпляра посредника внутри объектов компонентов.
 */
class BaseComponent {
    protected mediator: Mediator;

    constructor(mediator?: Mediator) {
        this.mediator = mediator!;
    }

    public setMediator(mediator: Mediator): void {
        this.mediator = mediator;
    }
}

/**
 * EN: Concrete Components implement various functionality. They don't depend on
 * other components. They also don't depend on any concrete mediator classes.
 *
 * RU: Конкретные Компоненты реализуют различную функциональность. Они не
 * зависят от других компонентов. Они также не зависят от каких-либо конкретных
 * классов посредников.
 */
class Component1 extends BaseComponent {
    public doA(): void {
        console.log('Component 1 does A.');
        this.mediator.notify(this, 'A');
    }

    public doB(): void {
        console.log('Component 1 does B.');
        this.mediator.notify(this, 'B');
    }
}

class Component2 extends BaseComponent {
    public doC(): void {
        console.log('Component 2 does C.');
        this.mediator.notify(this, 'C');
    }

    public doD(): void {
        console.log('Component 2 does D.');
        this.mediator.notify(this, 'D');
    }
}

/**
 * EN: The client code.
 *
 * RU: Клиентский код.
 */
const c1 = new Component1();
const c2 = new Component2();
const mediator = new ConcreteMediator(c1, c2);

console.log('Client triggers operation A.');
c1.doA();

console.log('');
console.log('Client triggers operation D.');
c2.doD();
