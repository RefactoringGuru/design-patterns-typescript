/**
 * EN: Iterator Design Pattern
 *
 * Intent: Lets you traverse elements of a collection without exposing its
 * underlying representation (list, stack, tree, etc.).
 *
 * RU: Паттерн Итератор
 *
 * Назначение: Даёт возможность последовательно обходить элементы составных
 * объектов, не раскрывая их внутреннего представления.
 */

interface Iterator<T> {
    // EN: Return the current element.
    //
    // RU: Возврат текущего элемента.
    current(): T;

    // EN: Return the current element and move forward to next element.
    //
    // RU: Возврат текущего элемента и переход к следующему элементу.
    next(): T;

    // EN: Return the key of the current element.
    //
    // RU: Возврат ключа текущего элемента.
    key(): number;

    // EN: Checks if current position is valid.
    //
    // RU: Проверяет корректность текущей позиции.
    valid(): boolean;

    // EN: Rewind the Iterator to the first element.
    //
    // RU: Перемотка Итератора к первому элементу.
    rewind(): void;
}

interface Aggregator {
    // EN: Retrieve an external iterator.
    //
    // RU: Получить внешний итератор.
    getIterator(): Iterator<string>;
}

/**
 * EN: Concrete Iterators implement various traversal algorithms. These classes
 * store the current traversal position at all times.
 *
 * RU: Конкретные Итераторы реализуют различные алгоритмы обхода. Эти классы
 * постоянно хранят текущее положение обхода.
 */

class AlphabeticalOrderIterator implements Iterator<string> {
    private collection: WordsCollection;

    /**
     * EN: Stores the current traversal position. An iterator may have a lot of
     * other fields for storing iteration state, especially when it is supposed
     * to work with a particular kind of collection.
     *
     * RU: Хранит текущее положение обхода. У итератора может быть множество
     * других полей для хранения состояния итерации, особенно когда он должен
     * работать с определённым типом коллекции.
     */
    private position: number = 0;

    /**
     * EN: This variable indicates the traversal direction.
     *
     * RU: Эта переменная указывает направление обхода.
     */
    private reverse: boolean = false;

    constructor(collection: WordsCollection, reverse: boolean = false) {
        this.collection = collection;
        this.reverse = reverse;

        if (reverse) {
            this.position = collection.getCount() - 1;
        }
    }

    public rewind() {
        this.position = this.reverse ?
            this.collection.getCount() - 1 :
            0;
    }

    public current(): string {
        return this.collection.getItems()[this.position];
    }

    public key(): number {
        return this.position;
    }

    public next(): string {
        const item = this.collection.getItems()[this.position];
        this.position += this.reverse ? -1 : 1;
        return item;
    }

    public valid(): boolean {
        if (this.reverse) {
            return this.position >= 0;
        }

        return this.position < this.collection.getCount();
    }
}

/**
 * EN: Concrete Collections provide one or several methods for retrieving fresh
 * iterator instances, compatible with the collection class.
 *
 * RU: Конкретные Коллекции предоставляют один или несколько методов для
 * получения новых экземпляров итератора, совместимых с классом коллекции.
 */
class WordsCollection implements Aggregator {
    private items: string[] = [];

    public getItems(): string[] {
        return this.items;
    }

    public getCount(): number {
        return this.items.length;
    }

    public addItem(item: string): void {
        this.items.push(item);
    }

    public getIterator(): Iterator<string> {
        return new AlphabeticalOrderIterator(this);
    }

    public getReverseIterator(): Iterator<string> {
        return new AlphabeticalOrderIterator(this, true);
    }
}

/**
 * EN: The client code may or may not know about the Concrete Iterator or
 * Collection classes, depending on the level of indirection you want to keep in
 * your program.
 *
 * RU: Клиентский код может знать или не знать о Конкретном Итераторе или
 * классах Коллекций, в зависимости от уровня косвенности, который вы хотите
 * сохранить в своей программе.
 */
const collection = new WordsCollection();
collection.addItem('First');
collection.addItem('Second');
collection.addItem('Third');

const iterator = collection.getIterator();

console.log('Straight traversal:');
while (iterator.valid()) {
    console.log(iterator.next());
}

console.log('');
console.log('Reverse traversal:');
const reverseIterator = collection.getReverseIterator();
while (reverseIterator.valid()) {
    console.log(reverseIterator.next());
}
