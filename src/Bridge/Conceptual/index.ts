/**
 * EN: Bridge Design Pattern
 *
 * Intent: Lets you split a large class or a set of closely related classes into
 * two separate hierarchies—abstraction and implementation—which can be
 * developed independently of each other.
 *
 *               A
 *            /     \                        A         N
 *          Aa      Ab        ===>        /     \     / \
 *         / \     /  \                 Aa(N) Ab(N)  1   2
 *       Aa1 Aa2  Ab1 Ab2
 *
 * RU: Паттерн Мост
 *
 * Назначение: Разделяет один или несколько классов на две отдельные иерархии —
 * абстракцию и реализацию, позволяя изменять их независимо друг от друга.
 *
 *               A
 *            /     \                        A         N
 *          Aa      Ab        ===>        /     \     / \
 *         / \     /  \                 Aa(N) Ab(N)  1   2
 *       Aa1 Aa2  Ab1 Ab2
 */

/**
 * EN: The Abstraction defines the interface for the "control" part of the two
 * class hierarchies. It maintains a reference to an object of the
 * Implementation hierarchy and delegates all of the real work to this object.
 *
 * RU: Абстракция устанавливает интерфейс для «управляющей» части двух иерархий
 * классов. Она содержит ссылку на объект из иерархии Реализации и делегирует
 * ему всю настоящую работу.
 */
class Abstraction {
    protected implementation: Implementation;

    constructor(implementation: Implementation) {
        this.implementation = implementation;
    }

    public operation(): string {
        const result = this.implementation.operationImplementation();
        return `Abstraction: Base operation with:\n${result}`;
    }
}

/**
 * EN: You can extend the Abstraction without changing the Implementation
 * classes.
 *
 * RU: Можно расширить Абстракцию без изменения классов Реализации.
 */
class ExtendedAbstraction extends Abstraction {
    public operation(): string {
        const result = this.implementation.operationImplementation();
        return `ExtendedAbstraction: Extended operation with:\n${result}`;
    }
}

/**
 * EN: The Implementation defines the interface for all implementation classes.
 * It doesn't have to match the Abstraction's interface. In fact, the two
 * interfaces can be entirely different. Typically the Implementation interface
 * provides only primitive operations, while the Abstraction defines higher-
 * level operations based on those primitives.
 *
 * RU: Реализация устанавливает интерфейс для всех классов реализации. Он не
 * должен соответствовать интерфейсу Абстракции. На практике оба интерфейса
 * могут быть совершенно разными. Как правило, интерфейс Реализации
 * предоставляет только примитивные операции, в то время как Абстракция
 * определяет операции более высокого уровня, основанные на этих примитивах.
 */
interface Implementation {
    operationImplementation(): string;
}

/**
 * EN: Each Concrete Implementation corresponds to a specific platform and
 * implements the Implementation interface using that platform's API.
 *
 * RU: Каждая Конкретная Реализация соответствует определённой платформе и
 * реализует интерфейс Реализации с использованием API этой платформы.
 */
class ConcreteImplementationA implements Implementation {
    public operationImplementation(): string {
        return 'ConcreteImplementationA: Here\'s the result on the platform A.';
    }
}

class ConcreteImplementationB implements Implementation {
    public operationImplementation(): string {
        return 'ConcreteImplementationB: Here\'s the result on the platform B.';
    }
}

/**
 * EN: Except for the initialization phase, where an Abstraction object gets
 * linked with a specific Implementation object, the client code should only
 * depend on the Abstraction class. This way the client code can support any
 * abstraction-implementation combination.
 *
 * RU: За исключением этапа инициализации, когда объект Абстракции связывается с
 * определённым объектом Реализации, клиентский код должен зависеть только от
 * класса Абстракции. Таким образом, клиентский код может поддерживать любую
 * комбинацию абстракции и реализации.
 */
function clientCode(abstraction: Abstraction) {
    // ..

    console.log(abstraction.operation());

    // ..
}

/**
 * EN: The client code should be able to work with any pre-configured
 * abstraction-implementation combination.
 *
 * RU: Клиентский код должен работать с любой предварительно сконфигурированной
 * комбинацией абстракции и реализации.
 */
let implementation = new ConcreteImplementationA();
let abstraction = new Abstraction(implementation);
clientCode(abstraction);

console.log('');

implementation = new ConcreteImplementationB();
abstraction = new ExtendedAbstraction(implementation);
clientCode(abstraction);
