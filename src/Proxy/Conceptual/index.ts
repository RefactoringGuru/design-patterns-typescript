/**
 * EN: Proxy Design Pattern
 *
 * Intent: Provide a surrogate or placeholder for another object to control
 * access to the original object or to add other responsibilities.
 *
 * RU: Паттерн Заместитель
 *
 * Назначение: Позволяет подставлять вместо реальных объектов специальные
 * объекты-заменители. Эти объекты перехватывают вызовы к оригинальному объекту,
 * позволяя сделать что-то до или после передачи вызова оригиналу.
 */

/**
 * EN: The Subject interface declares common operations for both RealSubject and
 * the Proxy. As long as the client works with RealSubject using this interface,
 * you'll be able to pass it a proxy instead of a real subject.
 *
 * RU: Интерфейс Субъекта объявляет общие операции как для Реального Субъекта,
 * так и для Заместителя. Пока клиент работает с Реальным Субъектом, используя
 * этот интерфейс, вы сможете передать ему заместителя вместо реального
 * субъекта.
 */
interface Subject {
    request(): void;
}

/**
 * EN: The RealSubject contains some core business logic. Usually, RealSubjects
 * are capable of doing some useful work which may also be very slow or
 * sensitive - e.g. correcting input data. A Proxy can solve these issues
 * without any changes to the RealSubject's code.
 *
 * RU: Реальный Субъект содержит некоторую базовую бизнес-логику. Как правило,
 * Реальные Субъекты способны выполнять некоторую полезную работу, которая к
 * тому же может быть очень медленной или точной – например, коррекция входных
 * данных. Заместитель может решить эти задачи без каких-либо изменений в коде
 * Реального Субъекта.
 */
class RealSubject implements Subject {
    public request(): void {
        console.log('RealSubject: Handling request.');
    }
}

/**
 * EN: The Proxy has an interface identical to the RealSubject.
 *
 * RU: Интерфейс Заместителя идентичен интерфейсу Реального Субъекта.
 */
class Proxy implements Subject {
    private realSubject: RealSubject;

    /**
     * EN: The Proxy maintains a reference to an object of the RealSubject
     * class. It can be either lazy-loaded or passed to the Proxy by the client.
     *
     * RU: Заместитель хранит ссылку на объект класса РеальныйСубъект. Клиент
     * может либо лениво загрузить его, либо передать Заместителю.
     */
    constructor(realSubject: RealSubject) {
        this.realSubject = realSubject;
    }

    /**
     * EN: The most common applications of the Proxy pattern are lazy loading,
     * caching, controlling the access, logging, etc. A Proxy can perform one of
     * these things and then, depending on the result, pass the execution to the
     * same method in a linked RealSubject object.
     *
     * RU: Наиболее распространёнными областями применения паттерна Заместитель
     * являются ленивая загрузка, кэширование, контроль доступа, ведение журнала
     * и т.д. Заместитель может выполнить одну из этих задач, а затем, в
     * зависимости от результата, передать выполнение одноимённому методу в
     * связанном объекте класса Реального Субъект.
     */
    public request(): void {
        if (this.checkAccess()) {
            this.realSubject.request();
            this.logAccess();
        }
    }

    private checkAccess(): boolean {
        // EN: Some real checks should go here.
        //
        // RU: Некоторые реальные проверки должны проходить здесь.
        console.log('Proxy: Checking access prior to firing a real request.');

        return true;
    }

    private logAccess(): void {
        console.log('Proxy: Logging the time of request.');
    }
}

/**
 * EN: The client code is supposed to work with all objects (both subjects and
 * proxies) via the Subject interface in order to support both real subjects and
 * proxies. In real life, however, clients mostly work with their real subjects
 * directly. In this case, to implement the pattern more easily, you can extend
 * your proxy from the real subject's class.
 *
 * RU: Клиентский код должен работать со всеми объектами (как с реальными, так и
 * заместителями) через интерфейс Субъекта, чтобы поддерживать как реальные
 * субъекты, так и заместителей. В реальной жизни, однако, клиенты в основном
 * работают с реальными субъектами напрямую. В этом случае, для более простой
 * реализации паттерна, можно расширить заместителя из класса реального
 * субъекта.
 */
function clientCode(subject: Subject) {
    // ...

    subject.request();

    // ...
}

console.log('Client: Executing the client code with a real subject:');
const realSubject = new RealSubject();
clientCode(realSubject);

console.log('');

console.log('Client: Executing the same client code with a proxy:');
const proxy = new Proxy(realSubject);
clientCode(proxy);
