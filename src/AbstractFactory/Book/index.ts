interface Chair {
  sitOn(): void;
}
interface Sofa {
  lieOn(): void;
}
interface CoffeeTable {
  putCoffee(): void;
}

interface FurnitureFactory {
  createChair(): Chair;
  createSofa(): Sofa;
  createCoffeeTable(): CoffeeTable;
}

class ModernChair implements Chair {
  sitOn() {
    console.log("Sitting on a modern chair.");
  }
}
class ModernSofa implements Sofa {
  lieOn() {
    console.log("Lying on a modern sofa.");
  }
}
class ModernCoffeeTable implements CoffeeTable {
  putCoffee() {
    console.log("Placing coffee on a modern coffee table.");
  }
}

class VictorianChair implements Chair {
  sitOn() {
    console.log("Sitting on a Victorian chair.");
  }
}
class VictorianSofa implements Sofa {
  lieOn() {
    console.log("Lying on a Victorian sofa.");
  }
}
class VictorianCoffeeTable implements CoffeeTable {
  putCoffee() {
    console.log("Placing coffee on a Victorian coffee table.");
  }
}

class ModernFurnitureFactory implements FurnitureFactory {
  createChair(): Chair {
    return new ModernChair();
  }
  createSofa(): Sofa {
    return new ModernSofa();
  }
  createCoffeeTable(): CoffeeTable {
    return new ModernCoffeeTable();
  }
}

class VictorianFurnitureFactory implements FurnitureFactory {
  createChair(): Chair {
    return new VictorianChair();
  }
  createSofa(): Sofa {
    return new VictorianSofa();
  }
  createCoffeeTable(): CoffeeTable {
    return new VictorianCoffeeTable();
  }
}

function createFurniture(factory: FurnitureFactory) {
  const chair = factory.createChair();
  const sofa = factory.createSofa();
  const coffeeTable = factory.createCoffeeTable();

  chair.sitOn();
  sofa.lieOn();
  coffeeTable.putCoffee();
}

createFurniture(new ModernFurnitureFactory());
createFurniture(new VictorianFurnitureFactory());
