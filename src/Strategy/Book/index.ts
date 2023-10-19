export interface RouteStrategy {
  buildRoute(origin: string, destination: string): string;
}

class RoadStrategy implements RouteStrategy {
  buildRoute(origin: string, destination: string): string {
    return `Road route from ${origin} to ${destination}`;
  }
}

class WalkingStrategy implements RouteStrategy {
  buildRoute(origin: string, destination: string): string {
    return `Walking route from ${origin} to ${destination}`;
  }
}

class PublicTransportStrategy implements RouteStrategy {
  buildRoute(origin: string, destination: string): string {
    return `Public transport route from ${origin} to ${destination}`;
  }
}

class Navigator {
  private routeStrategy: RouteStrategy;

  setRouteStrategy(strategy: RouteStrategy) {
    this.routeStrategy = strategy;
  }

  buildRoute(origin: string, destination: string): string {
    if (this.routeStrategy) {
      return this.routeStrategy.buildRoute(origin, destination);
    } else {
      return "No route strategy set.";
    }
  }
}

const navigator = new Navigator();

navigator.setRouteStrategy(new RoadStrategy());
console.log(navigator.buildRoute("City A", "City B"));

navigator.setRouteStrategy(new WalkingStrategy());
console.log(navigator.buildRoute("Park X", "Museum Y"));

navigator.setRouteStrategy(new PublicTransportStrategy());
console.log(navigator.buildRoute("Station P", "Station Q"));
