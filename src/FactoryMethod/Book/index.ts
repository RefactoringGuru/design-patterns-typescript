interface Transport {
  deliver(): void;
}

class Truck implements Transport {
  deliver(): void {
    console.log("Delivering by land (Truck)");
  }
}

class Ship implements Transport {
  deliver(): void {
    console.log("Delivering by sea (Ship)");
  }
}

abstract class Logistics {
  transport: Transport;
  abstract createTransport(): void;
  /**
   * planDelivery is an abstract method to be implemented by each logistics subclass.
   * It defines the logic for planning and executing the delivery.
   */
  abstract planDelivery(): void;
}

class RoadLogistics extends Logistics {
  createTransport(): Transport {
    return new Truck();
  }
  planDelivery(): void {
    this.transport = this.createTransport();
    this.transport.deliver();
  }
}

class SeaLogistics extends Logistics {
  createTransport(): Transport {
    return new Ship();
  }
  planDelivery(): void {
    this.transport = this.createTransport();
    this.transport.deliver();
  }
}

const roadLogistics = new RoadLogistics();
roadLogistics.planDelivery();

const seaLogistics = new SeaLogistics();
seaLogistics.planDelivery();
