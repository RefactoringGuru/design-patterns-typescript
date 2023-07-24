/**
 * EN: Real World Example for the Visitor design pattern
 *
 * Need: Calculate the shipping costs and taxes of a set of products without
 * coupling this calculations with the original class
 *
 * Solution: Create a visitor object that calculates the associated costs of
 * each product
 */

/**
 * EN: The Component interface declares an accept method that should take the
 * base visitor interface as an argument.
 */
interface VisitableComponent {
    accept(visitor: Visitor): number;
}

/**
 * EN: Each product component will implement the accept method to return the
 * associated cost
 */
class HeadPhonesProduct implements VisitableComponent {
    constructor(
    public brand: string,
    public model: string,
    public isWireless: boolean,
    public weight: number,
    public price: number) {}

    public accept(visitor: Visitor): number {
        return visitor.visitHeadPhones(this);
    }
}

class WashingMachineProduct implements VisitableComponent {
    constructor(
      public brand: string,
      public model: string,
      public isIndustrial: boolean,
      public weight: number,
      public price: number) {}

    public accept(visitor: Visitor): number {
        return visitor.visitWashingMachine(this);
    }
}

class TVProduct implements VisitableComponent {
    constructor(
      public brand: string,
      public model: string,
      public inches: number,
      public os: string,
      public price: number) {}

    public accept(visitor: Visitor): number {
        return visitor.visitTV(this);
    }
}
/**
 * EN: The Visitor Interface declares a visiting method for each product. This
 * way the visitor knows the product type.
 */
interface Visitor {
    visitHeadPhones(headphones: HeadPhonesProduct): number;
    visitWashingMachine(washingMachine: WashingMachineProduct): number;
    visitTV(tv: TVProduct): number;
}

/**
 * EN: We will have 2 different visitors implementing the interface. One to
 * calculate the shipping costs and another one for the taxes.
 */
const CLASS_A_SHIPPING_COST_MULTIPLIER = 10;
const CLASS_B_SHIPPING_COST_MULTIPLIER = 0.005;
const CLASS_C_SHIPPING_COST_MULTIPLIER = 25;
const INDUSTRIAL_EXTRA_SHIPPING_COST = 200;
const STANDARD_EXTRA_SHIPPING_COST = 20;
const WEBOS_EXTRA_SHIPPING_COST = 20;
const APPLE_EXTRA_SHIPPING_COST = 100;
const APPLE_BRAND_NAME = 'Apple';
const WEBOS_OS_NAME = 'webOS';
class ShippingCostCalculatorVisitor implements Visitor {
    public visitHeadPhones(headphones: HeadPhonesProduct): number {
        const shippingCost = headphones.weight * CLASS_A_SHIPPING_COST_MULTIPLIER;
        if (headphones.brand === APPLE_BRAND_NAME) {
            return shippingCost + APPLE_EXTRA_SHIPPING_COST;
        }
        return shippingCost;
    }

    public visitWashingMachine(washingMachine: WashingMachineProduct): number {
        const shippingCost =
    washingMachine.weight * CLASS_B_SHIPPING_COST_MULTIPLIER;
        if (washingMachine.isIndustrial) {
            return shippingCost + INDUSTRIAL_EXTRA_SHIPPING_COST;
        }
        return shippingCost + STANDARD_EXTRA_SHIPPING_COST;
    }

    public visitTV(tv: TVProduct): number {
        const shippingCost = tv.inches * CLASS_C_SHIPPING_COST_MULTIPLIER;
        if (tv.os === WEBOS_OS_NAME) {
            return shippingCost + WEBOS_EXTRA_SHIPPING_COST;
        }
        return shippingCost;
    }
}

const RECYCLABLE_ELECTRONIC_PRODUCT_SPECIAL_TAX = 25;
const VAT = 0.21;
class TaxCalculatorVisitor implements Visitor {
    visitHeadPhones(headphones: HeadPhonesProduct): number {
        return headphones.price * VAT;
    }

    visitWashingMachine(washingMachine: WashingMachineProduct): number {
        return washingMachine.price * VAT +
    RECYCLABLE_ELECTRONIC_PRODUCT_SPECIAL_TAX;
    }

    visitTV(tv: TVProduct): number {
        return tv.price * VAT;
    }
}

/**
 * EN: The client code can be factored to reuse several visitors with the same
 * product set.
 */
function calculateCosts(
  products: VisitableComponent[],
  visitor: Visitor): number {
    return products.reduce((acc, curr) => (acc + curr.accept(visitor)), 0);
}

const products = [
    new HeadPhonesProduct('Apple', 'Airpods', true, 50, 200),
    new WashingMachineProduct('Balay', 'C', false, 30000, 950),
    new TVProduct('LG', 'RW330', 65, 'WebOS', 350),
];

const shippingCostCalculator = new ShippingCostCalculatorVisitor();
const shippingCosts = calculateCosts(products, shippingCostCalculator);
console.log(`Total shipping costs are ${shippingCosts}`);

const taxesCalculator = new TaxCalculatorVisitor();
const taxes = calculateCosts(products, taxesCalculator);
console.log(`Total taxes are ${taxes}`);
