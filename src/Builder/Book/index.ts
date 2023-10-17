class House {
  private walls: number;
  private doors: number;
  private windows: number;
  private roof: string;
  private swimmingPool: boolean;

  setWalls(walls: number) {
    this.walls = walls;
  }

  setDoors(doors: number) {
    this.doors = doors;
  }

  setWindows(windows: number) {
    this.windows = windows;
  }

  setRoof(roof: string) {
    this.roof = roof;
  }

  setSwimmingPool(swimmingPool: boolean) {
    this.swimmingPool = swimmingPool;
  }

  describeHouse() {
    console.log("House description:");
    console.log("Walls: ", this.walls);
    console.log("Doors: ", this.doors);
    console.log("Windows: ", this.windows);
    console.log("Roof: ", this.roof);
    console.log("Swimming pool: ", this.swimmingPool);
  }
}

interface HouseBuilder {
  buildWalls(): void;
  buildDoors(): void;
  buildWindows(): void;
  buildRoof(): void;
  buildSwimmingPool(): void;
  getResult(): House;
}

class SmallHouseBuilder implements HouseBuilder {
  private house: House;

  constructor() {
    this.house = new House();
  }

  buildWalls() {
    this.house.setWalls(4);
  }

  buildDoors() {
    this.house.setDoors(1);
  }

  buildWindows() {
    this.house.setWindows(1);
  }

  buildRoof() {
    this.house.setRoof("wooden roof");
  }

  buildSwimmingPool() {
    this.house.setSwimmingPool(false);
  }

  getResult() {
    return this.house;
  }
}

class LargeHouseBuilder implements HouseBuilder {
  private house: House;

  constructor() {
    this.house = new House();
  }

  buildWalls() {
    this.house.setWalls(12);
  }

  buildDoors() {
    this.house.setDoors(5);
  }

  buildWindows() {
    this.house.setWindows(4);
  }

  buildRoof() {
    this.house.setRoof("concrete roof");
  }

  buildSwimmingPool() {
    this.house.setSwimmingPool(true);
  }

  getResult() {
    return this.house;
  }
}

class HouseDirector {
  private builder: HouseBuilder;

  constructor(builder: HouseBuilder) {
    this.builder = builder;
  }

  constructHouse() {
    this.builder.buildWalls();
    this.builder.buildDoors();
    this.builder.buildWindows();
    this.builder.buildRoof();
    this.builder.buildSwimmingPool();
  }
}

const smallBuilder = new SmallHouseBuilder();
const largeBuilder = new LargeHouseBuilder();

const director1 = new HouseDirector(smallBuilder);
director1.constructHouse();
const smallHouse = smallBuilder.getResult();
smallHouse.describeHouse();

const director2 = new HouseDirector(largeBuilder);
director2.constructHouse();
const largeHouse = largeBuilder.getResult();
largeHouse.describeHouse();
