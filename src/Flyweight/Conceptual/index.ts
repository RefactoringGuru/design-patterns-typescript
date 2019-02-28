/**
 * EN: Flyweight Design Pattern
 *
 * Intent: Lets you fit more objects into the available amount of RAM by sharing
 * common parts of state between multiple objects, instead of keeping all of the
 * data in each object.
 *
 * RU: Паттерн Легковес
 *
 * Назначение: Позволяет вместить бóльшее количество объектов в отведённую
 * оперативную память. Легковес экономит память, разделяя общее состояние
 * объектов между собой, вместо хранения одинаковых данных в каждом объекте.
 */

/**
 * EN: The Flyweight stores a common portion of the state (also called intrinsic
 * state) that belongs to multiple real business entities. The Flyweight accepts
 * the rest of the state (extrinsic state, unique for each entity) via its
 * method parameters.
 *
 * RU: Легковес хранит общую часть состояния (также называемую внутренним
 * состоянием), которая принадлежит нескольким реальным бизнес-объектам.
 * Легковес принимает оставшуюся часть состояния (внешнее состояние, уникальное
 * для каждого объекта) через его параметры метода.
 */
class Flyweight {
    private sharedState: any;

    constructor(sharedState: any) {
        this.sharedState = sharedState;
    }

    public operation(uniqueState): void {
        const s = JSON.stringify(this.sharedState);
        const u = JSON.stringify(uniqueState);
        console.log(`Flyweight: Displaying shared (${s}) and unique (${u}) state.`);
    }
}

/**
 * EN: The Flyweight Factory creates and manages the Flyweight objects. It
 * ensures that flyweights are shared correctly. When the client requests a
 * flyweight, the factory either returns an existing instance or creates a new
 * one, if it doesn't exist yet.
 *
 * RU: Фабрика Легковесов создает объекты-Легковесы и управляет ими. Она
 * обеспечивает правильное разделение легковесов. Когда клиент запрашивает
 * легковес, фабрика либо возвращает существующий экземпляр, либо создает новый,
 * если он ещё не существует.
 */
class FlyweightFactory {
    private flyweights: {[key: string]: Flyweight} = <any>{};

    constructor(initialFlyweights: string[][]) {
        for (const state of initialFlyweights) {
            this.flyweights[this.getKey(state)] = new Flyweight(state);
        }
    }

    /**
     * EN: Returns a Flyweight's string hash for a given state.
     *
     * RU: Возвращает хеш строки Легковеса для данного состояния.
     */
    private getKey(state: string[]): string {
        return state.join('_');
    }

    /**
     * EN: Returns an existing Flyweight with a given state or creates a new
     * one.
     *
     * RU: Возвращает существующий Легковес с заданным состоянием или создает
     * новый.
     */
    public getFlyweight(sharedState: string[]): Flyweight {
        const key = this.getKey(sharedState);

        if (!(key in this.flyweights)) {
            console.log('FlyweightFactory: Can\'t find a flyweight, creating new one.');
            this.flyweights[key] = new Flyweight(sharedState);
        } else {
            console.log('FlyweightFactory: Reusing existing flyweight.');
        }

        return this.flyweights[key];
    }

    public listFlyweights(): void {
        const count = Object.keys(this.flyweights).length;
        console.log(`\nFlyweightFactory: I have ${count} flyweights:`);
        for (const key in this.flyweights) {
            console.log(key);
        }
    }
}

/**
 * EN: The client code usually creates a bunch of pre-populated flyweights in
 * the initialization stage of the application.
 *
 * RU: Клиентский код обычно создает кучу предварительно заполненных легковесов
 * на этапе инициализации приложения.
 */
const factory = new FlyweightFactory([
    ['Chevrolet', 'Camaro2018', 'pink'],
    ['Mercedes Benz', 'C300', 'black'],
    ['Mercedes Benz', 'C500', 'red'],
    ['BMW', 'M5', 'red'],
    ['BMW', 'X6', 'white'],
    // ...
]);
factory.listFlyweights();

// ...

function addCarToPoliceDatabase(
    ff: FlyweightFactory, plates: string, owner: string,
    brand: string, model: string, color: string,
) {
    console.log('\nClient: Adding a car to database.');
    const flyweight = ff.getFlyweight([brand, model, color]);

    // EN: The client code either stores or calculates extrinsic state and
    // passes it to the flyweight's methods.
    //
    // RU: Клиентский код либо сохраняет, либо вычисляет внешнее состояние и
    // передает его методам легковеса.
    flyweight.operation([plates, owner]);
}

addCarToPoliceDatabase(factory, 'CL234IR', 'James Doe', 'BMW', 'M5', 'red');

addCarToPoliceDatabase(factory, 'CL234IR', 'James Doe', 'BMW', 'X1', 'red');

factory.listFlyweights();
