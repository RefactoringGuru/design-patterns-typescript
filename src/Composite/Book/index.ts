export interface Component {
  getPrice(): number;
}

class Product implements Component {
  constructor(private name: string, private price: number) {}

  getPrice(): number {
    return this.price;
  }
}

class Box implements Component {
  private items: Component[] = [];

  constructor(private name: string, private packagingCost: number) {}

  addItem(item: Component) {
    this.items.push(item);
  }
  removeItem(item: Component) {
    this.items = this.items.filter((i) => i !== item);
  }

  getPrice(): number {
    return (
      this.packagingCost +
      this.items.reduce((acc, item) => acc + item.getPrice(), 0)
    );
  }
}

const smallProduct = new Product("Small Product", 10);
const smallBox = new Box("Small Box", 1);

smallBox.addItem(smallProduct);

const bigProduct = new Product("Big Product", 100);
const bigBox = new Box("Big Box", 5);

bigBox.addItem(bigProduct);
bigBox.addItem(smallBox);

console.log(bigBox.getPrice());
