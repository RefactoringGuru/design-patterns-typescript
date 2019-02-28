/**
 * EN: Singleton Design Pattern
 *
 * Intent: Ensure that a class has a single instance, and provide a global point
 * of access to it.
 *
 * RU: Паттерн Одиночка
 *
 * Назначение: Гарантирует существование единственного экземпляра класса и
 * предоставляет глобальную точку доступа к нему.
 */

/**
 * EN: The Singleton class defines the `getInstance` method that lets clients
 * access the unique singleton instance.
 *
 * RU: Класс Одиночка предоставляет метод getInstance, который позволяет
 * клиентам получить доступ к уникальному экземпляру одиночки.
 */
class Singleton {
    private static instance: Singleton;

    /**
     * EN: The Singleton's constructor should always be private to prevent
     * direct construction calls with the `new` operator.
     *
     * RU: Конструктор Одиночки всегда должен быть скрытым, чтобы предотвратить
     * создание объекта через оператор new.
     */
    private constructor() { }

    /**
     * EN: The static method that controls the access to the singleton instance.
     *
     * This implementation let you subclass the Singleton class while keeping
     * just one instance of each subclass around.
     *
     * RU: Статический метод, управляющий доступом к экземпляру одиночки.
     *
     * Эта реализация позволяет вам расширять класс Одиночки, сохраняя повсюду
     * только один экземпляр каждого подкласса.
     */
    public static getInstance(): Singleton {
        if (!Singleton.instance) {
            Singleton.instance = new Singleton();
        }

        return Singleton.instance;
    }

    /**
     * EN: Finally, any singleton should define some business logic, which can
     * be executed on its instance.
     *
     * RU: Наконец, любой одиночка должен содержать некоторую бизнес-логику,
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
    const s1 = Singleton.getInstance();
    const s2 = Singleton.getInstance();

    if (s1 === s2) {
        console.log('Singleton works, both variables contain the same instance.');
    } else {
        console.log('Singleton failed, variables contain different instances.');
    }
}

clientCode();
