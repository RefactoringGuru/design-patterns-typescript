/**
 * EN: Real World Example for the Proxy Design Pattern
 *
 * Need: Cache and log access to an external weather service SDK
 *
 * Solution: Create a proxy class to cache the SDK calls and log the requests
 */

/**
 * EN: The WeatherService defines the SDK interface and response
 */
interface WeatherService {
    request(): Promise<WeatherForecast>;
}

interface WeatherForecast {
    avgTemperature: number;
    maxPrecipitationProbability: number;
}

/**
 * EN: The real service emulates a network request to an external service with
 * a 1 second delay
 */
class RealWeatherServiceSDK implements WeatherService {
    public async request(): Promise<WeatherForecast> {
        const randomWeatherForecast = {
            avgTemperature: Math.random() * 35,
            maxPrecipitationProbability: Math.random() * 100,
        };

        return new Promise((resolve) => {
            setTimeout(() => resolve(randomWeatherForecast), 1000);
        });
    }
}

/**
 * EN: The Proxy implements the same interface than the real service. However
 * the proxy uses an internal cache to store responses. Subsequent calls to the
 * proxied service will go faster as they won't call the real slow service. The
 * proxy also logs useful information about the cache usage and timmings.
 */
class ProxyWeatherService implements WeatherService {
    private cachedResponse : WeatherForecast;
    private cacheDate : Date;
    private expirationTimeInMillis = 24 * 60  * 60 * 1000;

    constructor(private realWeatherService: WeatherService) {
    }

    public async request(): Promise<WeatherForecast> {
        console.log(`Requesting forecast on date ${new Date().toISOString()}.`);
        const initialTime = Date.now();
        if (this.isCacheExpired()) {
            console.log('Invalid cache. Calling real weather service...');
            this.setCache(await this.realWeatherService.request());
        }
        const requestTimeInMillis = Date.now() - initialTime;
        console.log(`Request processed in ${requestTimeInMillis} milliseconds`);
        return this.cachedResponse;
    }

    private isCacheExpired() : boolean {
        return this.cachedResponse ?
            Date.now() > this.cacheDate.getTime() + this.expirationTimeInMillis :
            true;
    }

    private setCache(weatherForecast: WeatherForecast) {
        this.cachedResponse = weatherForecast;
        this.cacheDate = new Date();
    }
}

/**
 * EN: The client code works with real and proxied services
 */
async function clientCode(weatherService: WeatherService) {
    for (let i = 0; i < 3; i += 1) {
        const weatherForecast = await weatherService.request();
        console.log(`The weather forecast is ${weatherForecast.avgTemperature}º average temperature and ${weatherForecast.maxPrecipitationProbability}% max precipitation probability.`);
    }
}

async function main() {
    console.log('Client: Executing the client code with a real weather service:');
    const realWeatherService = new RealWeatherServiceSDK();
    await clientCode(realWeatherService);

    console.log('');

    console.log('Client: Executing the same client code with a proxied weather service:');
    const proxy = new ProxyWeatherService(realWeatherService);
    await clientCode(proxy);
}

main();
