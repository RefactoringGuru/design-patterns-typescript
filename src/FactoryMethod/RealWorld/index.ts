/**
 * EN: Real World Example for the Factory Method design pattern
 *
 * Need: Create different database connectors and be able to switch the
 * connector with an environment variable
 *
 * Solution: Create an abstract class with a factory method that returns
 * a concrete implementation of a database connection
 */

/**
 * EN: Abstract class with the factory method
 */
export abstract class DBConnectionFactory {
    public abstract createDBConnection(): DBConnection;
}

/**
 * EN: Concrete factories, each of them produces a concrete connection
 */
export class MongoConnectionFactory extends DBConnectionFactory {
    public createDBConnection(): DBConnection {
        return new MongoConnection();
    }
}

export class RedisConnectionFactory extends DBConnectionFactory {
    public createDBConnection(): DBConnection {
        return new RedisConnection();
    }
}

/**
 * EN: Abstract product to be created = database connection
 */
export abstract class DBConnection {
    provider: string;

    public connect() {
        console.log(`Connected to ${this.provider}`);
    }
}

/**
 * EN: Concrete product to be created = database connection
 */
export class MongoConnection extends DBConnection {
    provider: string;

    constructor() {
        super();
        this.provider = 'Mongo DB';
    }
}

export class RedisConnection extends DBConnection {
    provider: string;

    constructor() {
        super();
        this.provider = 'Redis';
    }
}

/**
 * EN: The client function accepts any concrete factory
 */
function main(dbConnectionFactory: DBConnectionFactory) {
    const dbConnection = dbConnectionFactory.createDBConnection();
    dbConnection.connect();
}

/**
 * EN: Based on an environment variable, we create a concrete factory and
 * inject it to the client function
 */
switch (process.env.DB) {
case 'Mongo':
    main(new MongoConnectionFactory());
    break;
case 'Redis':
    main(new RedisConnectionFactory());
    break;
default:
    console.error('Unknown DB');
}
