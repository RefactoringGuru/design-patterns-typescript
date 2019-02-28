/**
 * EN: Builder Design Pattern
 *
 * Intent: Lets you construct complex objects step by step. The pattern allows
 * you to produce different types and representations of an object using the
 * same construction code.
 *
 * RU: Паттерн Строитель
 *
 * Назначение: Позволяет создавать сложные объекты пошагово. Строитель даёт
 * возможность использовать один и тот же код строительства для получения разных
 * представлений объектов.
 */

/**
 * EN: The Builder interface specifies methods for creating the different parts
 * of the Product objects.
 *
 * RU: Интерфейс Строителя объявляет создающие методы для различных частей
 * объектов Продуктов.
 */
interface Builder {
    producePartA(): void;
    producePartB(): void;
    producePartC(): void;
}

/**
 * EN: The Concrete Builder classes follow the Builder interface and provide
 * specific implementations of the building steps. Your program may have several
 * variations of Builders, implemented differently.
 *
 * RU: Классы Конкретного Строителя следуют интерфейсу Строителя и предоставляют
 * конкретные реализации шагов построения. Ваша программа может иметь несколько
 * вариантов Строителей, реализованных по-разному.
 */
class ConcreteBuilder1 implements Builder {
    private product: Product1;

    /**
     * EN: A fresh builder instance should contain a blank product object, which
     * is used in further assembly.
     *
     * RU: Новый экземпляр строителя должен содержать пустой объект продукта,
     * который используется в дальнейшей сборке.
     */
    constructor() {
        this.reset();
    }

    public reset(): void {
        this.product = new Product1();
    }

    /**
     * EN: All production steps work with the same product instance.
     *
     * RU: Все этапы производства работают с одним и тем же экземпляром
     * продукта.
     */
    public producePartA(): void {
        this.product.parts.push('PartA1');
    }

    public producePartB(): void {
        this.product.parts.push('PartB1');
    }

    public producePartC(): void {
        this.product.parts.push('PartC1');
    }

    /**
     * EN: Concrete Builders are supposed to provide their own methods for
     * retrieving results. That's because various types of builders may create
     * entirely different products that don't follow the same interface.
     * Therefore, such methods cannot be declared in the base Builder interface
     * (at least in a statically typed programming language).
     *
     * Usually, after returning the end result to the client, a builder instance
     * is expected to be ready to start producing another product. That's why
     * it's a usual practice to call the reset method at the end of the
     * `getProduct` method body. However, this behavior is not mandatory, and
     * you can make your builders wait for an explicit reset call from the
     * client code before disposing of the previous result.
     *
     * RU: Конкретные Строители должны предоставить свои собственные методы
     * получения результатов. Это связано с тем, что различные типы строителей
     * могут создавать совершенно разные продукты с разными интерфейсами.
     * Поэтому такие методы не могут быть объявлены в базовом интерфейсе
     * Строителя (по крайней мере, в статически типизированном языке
     * программирования).
     *
     * Как правило, после возвращения конечного результата клиенту, экземпляр
     * строителя должен быть готов к началу производства следующего продукта.
     * Поэтому обычной практикой является вызов метода сброса в конце тела
     * метода getProduct. Однако такое поведение не является обязательным, вы
     * можете заставить своих строителей ждать явного запроса на сброс из кода
     * клиента, прежде чем избавиться от предыдущего результата.
     */
    public getProduct(): Product1 {
        const result = this.product;
        this.reset();
        return result;
    }
}

/**
 * EN: It makes sense to use the Builder pattern only when your products are
 * quite complex and require extensive configuration.
 *
 * Unlike in other creational patterns, different concrete builders can produce
 * unrelated products. In other words, results of various builders may not
 * always follow the same interface.
 *
 * RU: Имеет смысл использовать паттерн Строитель только тогда, когда ваши
 * продукты достаточно сложны и требуют обширной конфигурации.
 *
 * В отличие от других порождающих паттернов, различные конкретные строители
 * могут производить несвязанные продукты. Другими словами, результаты различных
 * строителей могут не всегда следовать одному и тому же интерфейсу.
 */
class Product1 {
    public parts: string[] = [];

    public listParts(): void {
        console.log(`Product parts: ${this.parts.join(', ')}\n`);
    }
}

/**
 * EN: The Director is only responsible for executing the building steps in a
 * particular sequence. It is helpful when producing products according to a
 * specific order or configuration. Strictly speaking, the Director class is
 * optional, since the client can control builders directly.
 *
 * RU: Директор отвечает только за выполнение шагов построения в определённой
 * последовательности. Это полезно при производстве продуктов в определённом
 * порядке или особой конфигурации. Строго говоря, класс Директор необязателен,
 * так как клиент может напрямую управлять строителями.
 */
class Director {
    private builder: Builder;

    /**
     * EN: The Director works with any builder instance that the client code
     * passes to it. This way, the client code may alter the final type of the
     * newly assembled product.
     *
     * RU: Директор работает с любым экземпляром строителя, который передаётся
     * ему клиентским кодом. Таким образом, клиентский код может изменить
     * конечный тип вновь собираемого продукта.
     */
    public setBuilder(builder: Builder): void {
        this.builder = builder;
    }

    /**
     * EN: The Director can construct several product variations using the same
     * building steps.
     *
     * RU: Директор может строить несколько вариаций продукта, используя
     * одинаковые шаги построения.
     */
    public buildMinimalViableProduct(): void {
        this.builder.producePartA();
    }

    public buildFullFeaturedProduct(): void {
        this.builder.producePartA();
        this.builder.producePartB();
        this.builder.producePartC();
    }
}

/**
 * EN: The client code creates a builder object, passes it to the director and
 * then initiates the construction process. The end result is retrieved from the
 * builder object.
 *
 * RU: Клиентский код создаёт объект-строитель, передаёт его директору, а затем
 * инициирует процесс построения. Конечный результат извлекается из
 * объекта-строителя.
 */
function clientCode(director: Director) {
    const builder = new ConcreteBuilder1();
    director.setBuilder(builder);

    console.log('Standard basic product:');
    director.buildMinimalViableProduct();
    builder.getProduct().listParts();

    console.log('Standard full featured product:');
    director.buildFullFeaturedProduct();
    builder.getProduct().listParts();

    // EN: Remember, the Builder pattern can be used without a Director class.
    //
    // RU: Помните, что паттерн Строитель можно использовать без класса
    // Директор.
    console.log('Custom product:');
    builder.producePartA();
    builder.producePartC();
    builder.getProduct().listParts();
}

const director = new Director();
clientCode(director);
