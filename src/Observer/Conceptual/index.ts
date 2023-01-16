/**
 * EN: Observer Design Pattern
 *
 * Intent: Lets you define a subscription mechanism to notify multiple objects
 * about any events that happen to the object they're observing.
 *
 * Note that there's a lot of different terms with similar meaning associated
 * with this pattern. Just remember that the Subject is also called the
 * Publisher and the Observer is often called the Subscriber and vice versa.
 * Also the verbs "observe", "listen" or "track" usually mean the same thing.
 *
 * RU: Паттерн Наблюдатель
 *
 * Назначение: Создаёт механизм подписки, позволяющий одним объектам следить и
 * реагировать на события, происходящие в других объектах.
 *
 * Обратите внимание, что существует множество различных терминов с похожими
 * значениями, связанных с этим паттерном. Просто помните, что Субъекта также
 * называют Издателем, а Наблюдателя часто называют Подписчиком и наоборот.
 * Также глаголы «наблюдать», «слушать» или «отслеживать» обычно означают одно и
 * то же.
 */

/**
 * EN: The Subject interface declares a set of methods for managing subscribers.
 *
 * RU: Интерфейс издателя объявляет набор методов для управлениями
 * подписчиками.
 */
interface Subject {
    // EN: Attach an observer to the subject.
    //
    // RU: Присоединяет наблюдателя к издателю.
    attach(observer: Observer): void;

    // EN: Detach an observer from the subject.
    //
    // RU: Отсоединяет наблюдателя от издателя.
    detach(observer: Observer): void;

    // EN: Notify all observers about an event.
    //
    // RU: Уведомляет всех наблюдателей о событии.
    notify(): void;
}

/**
 * EN: The Subject owns some important state and notifies observers when the
 * state changes.
 *
 * RU: Издатель владеет некоторым важным состоянием и оповещает наблюдателей о
 * его изменениях.
 */
class ConcreteSubject implements Subject {
    /**
     * EN: @type {number} For the sake of simplicity, the Subject's state,
     * essential to all subscribers, is stored in this variable.
     *
     * RU: @type {number} Для удобства в этой переменной хранится состояние
     * Издателя, необходимое всем подписчикам.
     */
    public state: number;

    /**
     * EN: @type {Observer[]} List of subscribers. In real life, the list of
     * subscribers can be stored more comprehensively (categorized by event
     * type, etc.).
     *
     * RU: @type {Observer[]} Список подписчиков. В реальной жизни список
     * подписчиков может храниться в более подробном виде (классифицируется по
     * типу события и т.д.)
     */
    private observers: Observer[] = [];

    /**
     * EN: The subscription management methods.
     *
     * RU: Методы управления подпиской.
     */
    public attach(observer: Observer): void {
        const isExist = this.observers.includes(observer);
        if (isExist) {
            return console.log('Subject: Observer has been attached already.');
        }

        console.log('Subject: Attached an observer.');
        this.observers.push(observer);
    }

    public detach(observer: Observer): void {
        const observerIndex = this.observers.indexOf(observer);
        if (observerIndex === -1) {
            return console.log('Subject: Nonexistent observer.');
        }

        this.observers.splice(observerIndex, 1);
        console.log('Subject: Detached an observer.');
    }

    /**
     * EN: Trigger an update in each subscriber.
     *
     * RU: Запуск обновления в каждом подписчике.
     */
    public notify(): void {
        console.log('Subject: Notifying observers...');
        for (const observer of this.observers) {
            observer.update(this);
        }
    }

    /**
     * EN: Usually, the subscription logic is only a fraction of what a Subject
     * can really do. Subjects commonly hold some important business logic, that
     * triggers a notification method whenever something important is about to
     * happen (or after it).
     *
     * RU: Обычно логика подписки – только часть того, что делает Издатель.
     * Издатели часто содержат некоторую важную бизнес-логику, которая запускает
     * метод уведомления всякий раз, когда должно произойти что-то важное (или
     * после этого).
     */
    public someBusinessLogic(): void {
        console.log('\nSubject: I\'m doing something important.');
        this.state = Math.floor(Math.random() * (10 + 1));

        console.log(`Subject: My state has just changed to: ${this.state}`);
        this.notify();
    }
}

/**
 * EN: The Observer interface declares the update method, used by subjects.
 *
 * RU: Интерфейс Наблюдателя объявляет метод уведомления, который издатели
 * используют для оповещения своих подписчиков.
 */
interface Observer {
    // EN: Receive update from subject.
    //
    // RU: Получить обновление от субъекта.
    update(subject: Subject): void;
}

/**
 * EN: Concrete Observers react to the updates issued by the Subject they had
 * been attached to.
 *
 * RU: Конкретные Наблюдатели реагируют на обновления, выпущенные Издателем, к
 * которому они прикреплены.
 */
class ConcreteObserverA implements Observer {
    public update(subject: Subject): void {
        if (subject instanceof ConcreteSubject && subject.state < 3) {
            console.log('ConcreteObserverA: Reacted to the event.');
        }
    }
}

class ConcreteObserverB implements Observer {
    public update(subject: Subject): void {
        if (subject instanceof ConcreteSubject && (subject.state === 0 || subject.state >= 2)) {
            console.log('ConcreteObserverB: Reacted to the event.');
        }
    }
}

/**
 * EN: The client code.
 *
 * RU: Клиентский код.
 */

const subject = new ConcreteSubject();

const observer1 = new ConcreteObserverA();
subject.attach(observer1);

const observer2 = new ConcreteObserverB();
subject.attach(observer2);

subject.someBusinessLogic();
subject.someBusinessLogic();

subject.detach(observer2);

subject.someBusinessLogic();
