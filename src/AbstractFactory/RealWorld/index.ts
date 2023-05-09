/**
 * EN: Real World Example for the Abstract Factory design pattern
 *
 * Need: Provide different infrastructure connectors for different
 * environments, for example to mock some dependencies in testing
 * environments, use cloud services in production, etc.
 *
 * Solution: Create an abstract factory to supply variants of file systems,
 * databases and log providers. There is a concrete factory for each
 * environment. This factory is configured to provide different concrete
 * connectors for each type of environment. For example, in development we
 * use the console to log messages, whereas in production we use the Sentry
 * service.
 */

/**
 * EN: First of all create some abstract products = connectors
 */
export abstract class DB {
    public abstract connect();
}

export abstract class FS {
    public abstract readFile(filename: string);
}

export abstract class LogProvider {
    public abstract log(message: string);
}

/**
 * EN: Declare the different concrete product variants
 */
export class MySQLDB extends DB {
    public connect() {
        console.log('Connected to MySQL');
    }
}

export class InMemoryMockDB extends DB {
    public connect() {
        console.log('Mocking DB in memory');
    }
}

export class S3FS extends FS {
    public readFile(filename: string) {
        console.log(`Reading file ${filename} from S3`);
    }
}

export class RealFS extends FS {
    public readFile(filename: string) {
        console.log(`Reading file ${filename} from a real FS`);
    }
}

export class MockFS extends FS {
    public readFile(filename: string) {
        console.log(`Mocking a read file call to ${filename}`);
    }
}

export class ConsoleLogProvider extends LogProvider {
    public log(message: string) {
        console.log(`From console: ${message}`);
    }
}

export class SentryLogProvider extends LogProvider {
    public log(message: string) {
        console.log(`From Sentry: ${message}`);
    }
}

/**
 * EN: Then create the abstract factory
 */
export abstract class EnvironmentFactory {
    public abstract getDB(): DB;
    public abstract getFS(): FS;
    public abstract getLogProvider(): LogProvider;
}

/**
 * EN: Finally create a concrete factory, one for each environment. Each
 * factory produces different concrete products = connectors, depending on
 * each environment needs
 */
export class DevEnvironmentFactory extends EnvironmentFactory {
    public getDB(): DB {
        return new InMemoryMockDB();
    }

    public getFS(): FS {
        return new MockFS();
    }

    public getLogProvider(): LogProvider {
        return new ConsoleLogProvider();
    }
}

export class ProdEnvironmentFactory extends EnvironmentFactory {
    public getDB(): DB {
        return new MySQLDB();
    }

    public getFS(): FS {
        return new RealFS();
    }

    public getLogProvider(): LogProvider {
        return new SentryLogProvider();
    }
}

/**
 * EN: The client function receives a factory to produce what it needs to
 * execute the application. It's not concerned about the environment.
 */
function client(environmentFactory: EnvironmentFactory) {
    const db = environmentFactory.getDB();
    db.connect();

    const fs = environmentFactory.getFS();
    fs.readFile('document.txt');

    const logProvider = environmentFactory.getLogProvider();
    logProvider.log('hello world');
}

/**
 * EN: Based on an environment variable, inject the concrete factory
 * implementation of the environment to the client function
 */
if (process.env.NODE_ENV === 'production') {
    client(new ProdEnvironmentFactory());
} else {
    client(new DevEnvironmentFactory());
}
