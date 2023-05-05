/**
 * EN: Real World Example for the Builder design pattern
 *
 * Need: To have a User class with a lot of optional parameters and some complex logic
 *
 * Solution: Create a new class that knows how to build the User by parts
 */

/**
 * EN: User concrete class
 */
export class User {
    public name: string;
    public surname: string;
    public email: string;
    public gender: Gender = Gender.Undefined;
    public address: string;
    public isAdmin: boolean = false;
    public phoneNumber: string;

    public setName(name: string) {
        this.name = name;
    }

    public setSurname(surname: string) {
        this.surname = surname;
    }

    public setEmail(email: string) {
        if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
            throw new Error('Invalid email format');
        }
        this.email = email;
    }

    public setGender(gender: Gender) {
        this.gender = gender;
    }

    public setAddress(
      streetName: string,
      number: number,
      city: string,
      zipCode: string,
      country: string) {
        this.address = `${streetName} ${number}, ${city} (${zipCode}) ${country}`;
    }

    public setIsAdmin(isAdmin: boolean) {
        this.isAdmin = isAdmin;
    }

    public setPhoneNumber(phoneNumber: string) {
        if (!/^[+]?[(]?\d{3})?[-\s.]?\d{3}[-\s.]?\d{4,6}$/.test(phoneNumber)) {
            throw new Error('Invalid phone number format');
        }
        this.phoneNumber = phoneNumber;
    }
}

enum Gender { Male = 'Male', Female = 'Female', Undefined = 'Undefined' }

/**
 * EN: General interface Builder
 */
export interface Builder {
    reset();
    getProduct();
}

/**
 * EN: User concrete Builder
 */
export class UserBuilder implements Builder {
    #user: User;

    constructor() {
        this.reset();
    }

    public reset() {
        this.#user = new User();
        return this;
    }

    getProduct() {
        const product = this.#user;
        this.reset();
        return product;
    }

    public setName(name: string) {
        this.#user.setName(name);
        return this;
    }

    public setSurname(surname: string) {
        this.#user.setSurname(surname);
        return this;
    }

    public setEmail(email: string) {
        this.#user.setEmail(email);
        return this;
    }

    public setMaleGender() {
        this.#user.setGender(Gender.Male);
        return this;
    }

    public setFemaleGender() {
        this.#user.setGender(Gender.Female);
        return this;
    }

    public setUndefinedGender() {
        this.#user.setGender(Gender.Undefined);
        return this;
    }

    public setAddress(
      streetName: string,
      number: number,
      city: string,
      zipCode: string,
      country: string) {
        this.#user.setAddress(streetName, number, city, zipCode, country);
        return this;
    }

    public setIsAdmin() {
        this.#user.setIsAdmin(true);
        return this;
    }

    public setPhoneNumber(phoneNumber: string) {
        this.#user.setPhoneNumber(phoneNumber);
        return this;
    }
}

/**
 * EN: The client can create as many users needed and with the parts needed
 * with a single builder
 */
const userBuilder = new UserBuilder();
const user1 = userBuilder
  .setName('Justin')
  .setSurname('Case')
  .setEmail('justin.case@gmail.com')
  .setMaleGender()
  .getProduct();

const user2 = userBuilder
  .setName('Pat')
  .setSurname('Roll')
  .setPhoneNumber('+34555989898')
  .setAddress('Corner Case', 7, 'LA', '08080', 'US')
  .getProduct();

const user3 = userBuilder
  .setEmail('hugo.first@gmail.com')
  .setIsAdmin()
  .getProduct();
