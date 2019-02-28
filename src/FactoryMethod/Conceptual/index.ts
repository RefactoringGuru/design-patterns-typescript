/**
 * EN: Factory Method Design Pattern
 *
 * Intent: Provides an interface for creating objects in a superclass, but
 * allows subclasses to alter the type of objects that will be created.
 *
 * RU: Паттерн Фабричный Метод
 *
 * Назначение: Определяет общий интерфейс для создания объектов в суперклассе,
 * позволяя подклассам изменять тип создаваемых объектов.
 */

/**
 * EN: The Creator class declares the factory method that is supposed to return
 * an object of a Product class. The Creator's subclasses usually provide the
 * implementation of this method.
 *
 * RU: Класс Создатель объявляет фабричный метод, который должен возвращать
 * объект класса Продукт. Подклассы Создателя обычно предоставляют реализацию
 * этого метода.
 */
abstract class Creator {
    /**
     * EN: Note that the Creator may also provide some default implementation of
     * the factory method.
     *
     * RU: Обратите внимание, что Создатель может также обеспечить реализацию
     * фабричного метода по умолчанию.
     */
    public abstract factoryMethod(): Product;

    /**
     * EN: Also note that, despite its name, the Creator's primary
     * responsibility is not creating products. Usually, it contains some core
     * business logic that relies on Product objects, returned by the factory
     * method. Subclasses can indirectly change that business logic by
     * overriding the factory method and returning a different type of product
     * from it.
     *
     * RU: Также заметьте, что, несмотря на название, основная обязанность
     * Создателя не заключается в создании продуктов. Обычно он содержит
     * некоторую базовую бизнес-логику, которая основана на объектах Продуктов,
     * возвращаемых фабричным методом. Подклассы могут косвенно изменять эту
     * бизнес-логику, переопределяя фабричный метод и возвращая из него другой
     * тип продукта.
     */
    public someOperation(): string {
        // EN: Call the factory method to create a Product object.
        //
        // RU: Вызываем фабричный метод, чтобы получить объект-продукт.
        const product = this.factoryMethod();
        // EN: Now, use the product.
        //
        // RU: Далее, работаем с этим продуктом.
        return `Creator: The same creator's code has just worked with ${product.operation()}`;
    }
}

/**
 * EN: Concrete Creators override the factory method in order to change the
 * resulting product's type.
 *
 * RU: Конкретные Создатели переопределяют фабричный метод для того, чтобы
 * изменить тип результирующего продукта.
 */
class ConcreteCreator1 extends Creator {
    /**
     * EN: Note that the signature of the method still uses the abstract product
     * type, even though the concrete product is actually returned from the
     * method. This way the Creator can stay independent of concrete product
     * classes.
     *
     * RU: Обратите внимание, что сигнатура метода по-прежнему использует тип
     * абстрактного продукта, хотя фактически из метода возвращается конкретный
     * продукт. Таким образом, Создатель может оставаться независимым от
     * конкретных классов продуктов.
     */
    public factoryMethod(): Product {
        return new ConcreteProduct1();
    }
}

class ConcreteCreator2 extends Creator {
    public factoryMethod(): Product {
        return new ConcreteProduct2();
    }
}

/**
 * EN: The Product interface declares the operations that all concrete products
 * must implement.
 *
 * RU: Интерфейс Продукта объявляет операции, которые должны выполнять все
 * конкретные продукты.
 */
interface Product {
    operation(): string;
}

/**
 * EN: Concrete Products provide various implementations of the Product
 * interface.
 *
 * RU: Конкретные Продукты предоставляют различные реализации интерфейса
 * Продукта.
 */
class ConcreteProduct1 implements Product {
    public operation(): string {
        return '{Result of the ConcreteProduct1}';
    }
}

class ConcreteProduct2 implements Product {
    public operation(): string {
        return '{Result of the ConcreteProduct2}';
    }
}

/**
 * EN: The client code works with an instance of a concrete creator, albeit
 * through its base interface. As long as the client keeps working with the
 * creator via the base interface, you can pass it any creator's subclass.
 *
 * RU: Клиентский код работает с экземпляром конкретного создателя, хотя и через
 * его базовый интерфейс. Пока клиент продолжает работать с создателем через
 * базовый интерфейс, вы можете передать ему любой подкласс создателя.
 */
function clientCode(creator: Creator) {
    // ...
    console.log('Client: I\'m not aware of the creator\'s class, but it still works.');
    console.log(creator.someOperation());
    // ...
}

/**
 * EN: The Application picks a creator's type depending on the configuration or
 * environment.
 *
 * RU: Приложение выбирает тип создателя в зависимости от конфигурации или
 * среды.
 */
console.log('App: Launched with the ConcreteCreator1.');
clientCode(new ConcreteCreator1());
console.log('');

console.log('App: Launched with the ConcreteCreator2.');
clientCode(new ConcreteCreator2());
