/**
 * EN: Prototype Design Pattern
 *
 * Intent: Produce new objects by copying existing ones without compromising
 * their internal structure.
 *
 * RU: Паттерн Прототип
 *
 * Назначение: Создаёт новые объекты, копируя существующие без нарушения их
 * внутренней структуры.
 */

/**
 * EN: The example class that has cloning ability.
 *
 * RU: Пример класса, имеющего возможность клонирования.
 */
class Prototype {
    public primitive: any;
    public component: object;
    public circularReference: ComponentWithBackReference;

    /**
     * EN: PHP has built-in cloning support. You can `clone` an object without
     * defining any special methods as long as it has fields of primitive types.
     * Fields containing objects retain their references in a cloned object.
     * Therefore, in some cases, you might want to clone those referenced
     * objects as well. You can do this in a special `__clone()` method.
     *
     * RU: PHP имеет встроенную поддержку клонирования. Вы можете «клонировать»
     * объект  без определения каких-либо специальных методов, при условии, что
     * его поля  имеют примитивные типы. Поля, содержащие объекты, сохраняют
     * свои ссылки  в клонированном объекте. Поэтому в некоторых случаях вам
     * может понадобиться клонировать также и вложенные объекты. Это можно
     * сделать специальным методом clone.
     */
    public clone(): this {
        const clone = Object.create(this);

        clone.component = Object.create(this.component);

        // EN: Cloning an object that has a nested object with backreference
        // requires special treatment. After the cloning is completed, the
        // nested object should point to the cloned object, instead of the
        // original object. Spread operator can be handy for this case.
        //
        // RU: Клонирование объекта, который имеет вложенный объект с обратной
        // ссылкой, требует специального подхода. После завершения клонирования
        // вложенный объект должен указывать на клонированный объект, а не на
        // исходный объект. Для данного случая хорошо подойдёт оператор
        // расширения (spread).
        clone.circularReference = {
            ...this.circularReference,
            prototype: { ...this },
        };

        return clone;
    }
}

class ComponentWithBackReference {
    public prototype;

    /**
     * EN: Note that the constructor won't be executed during cloning. If you
     * have complex logic inside the constructor, you may need to execute it in
     * the `clone` method as well.
     *
     * RU: Обратите внимание, что конструктор не будет выполнен во время
     * клонирования. Если у вас сложная логика внутри конструктора, вам может
     * потребоваться выполнить ее также и в методе clone.
     */
    constructor(prototype: Prototype) {
        this.prototype = prototype;
    }
}

/**
 * EN: The client code.
 *
 * RU: Клиентский код.
 */
function clientCode() {
    const p1 = new Prototype();
    p1.primitive = 245;
    p1.component = new Date();
    p1.circularReference = new ComponentWithBackReference(p1);

    const p2 = p1.clone();
    if (p1.primitive === p2.primitive) {
        console.log('Primitive field values have been carried over to a clone. Yay!');
    } else {
        console.log('Primitive field values have not been copied. Booo!');
    }
    if (p1.component === p2.component) {
        console.log('Simple component has not been cloned. Booo!');
    } else {
        console.log('Simple component has been cloned. Yay!');
    }

    if (p1.circularReference === p2.circularReference) {
        console.log('Component with back reference has not been cloned. Booo!');
    } else {
        console.log('Component with back reference has been cloned. Yay!');
    }

    if (p1.circularReference.prototype === p2.circularReference.prototype) {
        console.log('Component with back reference is linked to original object. Booo!');
    } else {
        console.log('Component with back reference is linked to the clone. Yay!');
    }
}

clientCode();
