/**
 * EN: Template Method Design Pattern
 *
 * Intent: Defines the skeleton of an algorithm in the superclass but lets
 * subclasses override specific steps of the algorithm without changing its
 * structure.
 *
 * RU: Паттерн Шаблонный метод
 *
 * Назначение: Определяет общую схему алгоритма, перекладывая реализацию
 * некоторых шагов на подклассы. Шаблонный метод позволяет подклассам
 * переопределять отдельные шаги алгоритма без изменения структуры алгоритма.
 */

/**
 * EN: The Abstract Class defines a template method that contains a skeleton of
 * some algorithm, composed of calls to (usually) abstract primitive operations.
 *
 * Concrete subclasses should implement these operations, but leave the template
 * method itself intact.
 *
 * RU: Абстрактный Класс определяет шаблонный метод, содержащий скелет
 * некоторого алгоритма, состоящего из вызовов (обычно) абстрактных примитивных
 * операций.
 *
 * Конкретные подклассы должны реализовать эти операции, но оставить сам
 * шаблонный метод без изменений.
 */
abstract class AbstractClass {
    /**
     * EN: The template method defines the skeleton of an algorithm.
     *
     * RU: Шаблонный метод определяет скелет алгоритма.
     */
    public templateMethod(): void {
        this.baseOperation1();
        this.requiredOperations1();
        this.baseOperation2();
        this.hook1();
        this.requiredOperation2();
        this.baseOperation3();
        this.hook2();
    }

    /**
     * EN: These operations already have implementations.
     *
     * RU: Эти операции уже имеют реализации.
     */
    protected baseOperation1(): void {
        console.log('AbstractClass says: I am doing the bulk of the work');
    }

    protected baseOperation2(): void {
        console.log('AbstractClass says: But I let subclasses override some operations');
    }

    protected baseOperation3(): void {
        console.log('AbstractClass says: But I am doing the bulk of the work anyway');
    }

    /**
     * EN: These operations have to be implemented in subclasses.
     *
     * RU: А эти операции должны быть реализованы в подклассах.
     */
    protected abstract requiredOperations1(): void;

    protected abstract requiredOperation2(): void;

    /**
     * EN: These are "hooks." Subclasses may override them, but it's not
     * mandatory since the hooks already have default (but empty)
     * implementation. Hooks provide additional extension points in some crucial
     * places of the algorithm.
     *
     * RU: Это «хуки». Подклассы могут переопределять их, но это не обязательно,
     * поскольку у хуков уже есть стандартная (но пустая) реализация. Хуки
     * предоставляют дополнительные точки расширения в некоторых критических
     * местах алгоритма.
     */
    protected hook1(): void { }

    protected hook2(): void { }
}

/**
 * EN: Concrete classes have to implement all abstract operations of the base
 * class. They can also override some operations with a default implementation.
 *
 * RU: Конкретные классы должны реализовать все абстрактные операции базового
 * класса. Они также могут переопределить некоторые операции с реализацией по
 * умолчанию.
 */
class ConcreteClass1 extends AbstractClass {
    protected requiredOperations1(): void {
        console.log('ConcreteClass1 says: Implemented Operation1');
    }

    protected requiredOperation2(): void {
        console.log('ConcreteClass1 says: Implemented Operation2');
    }
}

/**
 * EN: Usually, concrete classes override only a fraction of base class'
 * operations.
 *
 * RU: Обычно конкретные классы переопределяют только часть операций базового
 * класса.
 */
class ConcreteClass2 extends AbstractClass {
    protected requiredOperations1(): void {
        console.log('ConcreteClass2 says: Implemented Operation1');
    }

    protected requiredOperation2(): void {
        console.log('ConcreteClass2 says: Implemented Operation2');
    }

    protected hook1(): void {
        console.log('ConcreteClass2 says: Overridden Hook1');
    }
}

/**
 * EN: The client code calls the template method to execute the algorithm.
 * Client code does not have to know the concrete class of an object it works
 * with, as long as it works with objects through the interface of their base
 * class.
 *
 * RU: Клиентский код вызывает шаблонный метод для выполнения алгоритма.
 * Клиентский код не должен знать конкретный класс объекта, с которым работает,
 * при условии, что он работает с объектами через интерфейс их базового класса.
 */
function clientCode(abstractClass: AbstractClass) {
    // ...
    abstractClass.templateMethod();
    // ...
}

console.log('Same client code can work with different subclasses:');
clientCode(new ConcreteClass1());
console.log('');

console.log('Same client code can work with different subclasses:');
clientCode(new ConcreteClass2());
