/**
 * EN: Singleton Design Pattern
 *
 * Intent: Lets you ensure that a class has only one instance, while providing a
 * global access point to this instance.
 *
 * RU: Паттерн Одиночка
 *
 * Назначение: Гарантирует, что у класса есть только один экземпляр, и
 * предоставляет к нему глобальную точку доступа.
 */

/**
 * EN: The Singleton class defines an `instance` getter, that lets clients
 * access the unique singleton instance.
 *
 * RU: Класс Одиночка определяет геттер `instance`, который позволяет
 * клиентам получить доступ к уникальному экземпляру одиночки.
 */
class Singleton {
    static #instance: Singleton;

    /**
     * EN: The Singleton's constructor should always be private to prevent
     * direct construction calls with the `new` operator.
     *
     * RU: Конструктор Одиночки всегда должен быть скрытым, чтобы предотвратить
     * создание объекта через оператор new.
     */
    private constructor() { }

    /**
     * EN: The static getter that controls access to the singleton instance.
     *
     * This implementation allows you to extend the Singleton class while
     * keeping just one instance of each subclass around.
     *
     * RU: Статический геттер, управляющий доступом к экземпляру одиночки.
     *
     * Эта реализация позволяет вам расширять класс Одиночки, сохраняя повсюду
     * только один экземпляр каждого подкласса.
     */
    public static get instance(): Singleton {
        if (!Singleton.#instance) {
            Singleton.#instance = new Singleton();
        }

        return Singleton.#instance;
    }

    /**
     * EN: Finally, any singleton can define some business logic, which can
     * be executed on its instance.
     *
     * RU: Наконец, любой одиночка может содержать некоторую бизнес-логику,
     * которая может быть выполнена на его экземпляре.
     */
    public someBusinessLogic() {
        // ...
    }
}

/**
 * EN: The client code.
 *
 * RU: Клиентский код.
 */
function clientCode() {
    const s1 = Singleton.instance;
    const s2 = Singleton.instance;

    if (s1 === s2) {
        console.log(
            'Singleton works, both variables contain the same instance.'
        );
    } else {
        console.log('Singleton failed, variables contain different instances.');
    }
}

clientCode();
