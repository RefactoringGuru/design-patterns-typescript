export interface Visitor {
  doForCity(city: City): void;
  doForIndustry(industry: Industry): void;
  doForSightSeeing(sightSeeing: SightSeeing): void;
}

abstract class Node {
  abstract accept(visitor: Visitor): void;
}

class City extends Node {
  accept(visitor: Visitor) {
    visitor.doForCity(this);
  }
}

class Industry extends Node {
  accept(visitor: Visitor) {
    visitor.doForIndustry(this);
  }
}

class SightSeeing extends Node {
  accept(visitor: Visitor) {
    visitor.doForSightSeeing(this);
  }
}

class ExportVisitor implements Visitor {
  doForCity(city: City) {
    console.log(`Exporting City node to XML: ${city}`);
  }

  doForIndustry(industry: Industry) {
    console.log(`Exporting Industry node to XML: ${industry}`);
  }

  doForSightSeeing(sightSeeing: SightSeeing) {
    console.log(`Exporting SightSeeing node to XML: ${sightSeeing}`);
  }
}

const graph: Node[] = [];

graph.push(new City());
graph.push(new Industry());
graph.push(new SightSeeing());

const xmlExportVisitor = new ExportVisitor();

graph.forEach((node) => node.accept(xmlExportVisitor));
