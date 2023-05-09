/**
 * EN: Real World Example for the Adapter Design Pattern
 *
 * Need: Interact with a Taxi price calculator that works with miles and £
 * with a client that provide Kms and expect a price in €.
 *
 * Solution: Create an adapter that translates the input and output values
 * into the expected formats.
 */

/**
 * EN: In this case, the target is an interface that the application is
 * compatible with
 */
export interface TaxiCalculator {
    calculatePriceInEuros(km: number, isAirport: boolean): number;
}

/**
 * EN: The Adaptee is an existing library that contains the logic that we want
 * to reuse.
 */
export class UKTaxiCalculatorLibrary {
    public getPriceInPounds(miles: number, fare: Fares): number {
        if (fare === Fares.Airport) {
            return 5 + miles * 2.15;
        }
        return miles * 1.95;
    }
}

export enum Fares {
    Standard,
    Airport,
}

/**
 * EN: The Taxi Calculator Adapter makes the Adaptee's interface compatible
 * with the one that the client expects.
 */
class UKTaxiCalculatorLibraryAdapter implements TaxiCalculator {
    constructor(private adaptee: UKTaxiCalculatorLibrary) {
    }

    calculatePriceInEuros(km: number, isAirport: boolean): number {
        const miles = km * 1.609;
        const fare = isAirport ? Fares.Airport : Fares.Standard;
        const pounds = this.adaptee.getPriceInPounds(miles, fare);
        const euros = pounds * 1.15;
        return euros;
    }
}

/**
 * EN: The client code works with objects that implements the TaxiCalculator
 * interface, so we can use the adapter to reuse the incompatible library
 */
function client(taxiCalculator: TaxiCalculator): void {
    console.log('Calculating the price for a 15 Km run to the airport');
    const priceInEuros = taxiCalculator.calculatePriceInEuros(15, true);
    console.log(`Total price: ${priceInEuros}€`);
}

const incompatibleLibrary = new UKTaxiCalculatorLibrary();
const adaptedLibrary = new UKTaxiCalculatorLibraryAdapter(incompatibleLibrary);
client(adaptedLibrary);
