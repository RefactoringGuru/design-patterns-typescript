/**
 * EN: Adapter Design Pattern
 *
 * Intent: Provides a unified interface that allows objects with incompatible
 * interfaces to collaborate.
 *
 * RU: Паттерн Адаптер
 *
 * Назначение: Позволяет объектам с несовместимыми интерфейсами работать вместе.
 */

/**
 * EN: The Target defines the domain-specific interface used by the client code.
 *
 * RU: Целевой класс объявляет интерфейс, с которым может работать клиентский
 * код.
 */
class Target {
    public request(): string {
        return 'Target: The default target\'s behavior.';
    }
}

/**
 * EN: The Adaptee contains some useful behavior, but its interface is
 * incompatible with the existing client code. The Adaptee needs some adaptation
 * before the client code can use it.
 *
 * RU: Адаптируемый класс содержит некоторое полезное поведение, но его
 * интерфейс несовместим с существующим клиентским кодом. Адаптируемый класс
 * нуждается в некоторой доработке, прежде чем клиентский код сможет его
 * использовать.
 */
class Adaptee {
    public specificRequest(): string {
        return '.eetpadA eht fo roivaheb laicepS';
    }
}

/**
 * EN: The Adapter makes the Adaptee's interface compatible with the Target's
 * interface.
 *
 * RU: Адаптер делает интерфейс Адаптируемого класса совместимым с целевым
 * интерфейсом.
 */
class Adapter extends Target {
    private adaptee: Adaptee;

    constructor(adaptee: Adaptee) {
        super();
        this.adaptee = adaptee;
    }

    public request(): string {
        const result = this.adaptee.specificRequest().split('').reverse().join('');
        return `Adapter: (TRANSLATED) ${result}`;
    }
}

/**
 * EN: The client code supports all classes that follow the Target interface.
 *
 * RU: Клиентский код поддерживает все классы, использующие целевой интерфейс.
 */
function clientCode(target: Target) {
    console.log(target.request());
}

console.log('Client: I can work just fine with the Target objects:');
const target = new Target();
clientCode(target);

console.log('');

const adaptee = new Adaptee();
console.log('Client: The Adaptee class has a weird interface. See, I don\'t understand it:');
console.log(`Adaptee: ${adaptee.specificRequest()}`);

console.log('');

console.log('Client: But I can work with it via the Adapter:');
const adapter = new Adapter(adaptee);
clientCode(adapter);
