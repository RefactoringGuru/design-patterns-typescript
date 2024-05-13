/**
 * EN: Real World Example for the Chain of Responsibility Design Pattern
 *
 * Need: Handle different types of authentication in an HTTP request
 *
 * Solution: Create a chain of authentication handlers, where each handler
 * checks a specific authentication type. If a handler can't authenticate the
 * request, it passes the request to the next handler in the chain.
 */

/**
 * EN: The Handler interface declares a method for building the chain of
 * handlers. It also declares a method for executing a request.
 *
 * RU: Интерфейс Обработчика объявляет метод построения цепочки обработчиков. Он
 * также объявляет метод для выполнения запроса.
 */
interface Handler<Request = string, Result = string> {
    setNext(handler: Handler<Request, Result>): Handler<Request, Result>;

    handle(request: Request): Result;
}
/**
 * EN: The AuthenticationHandler interface declares a method for authenticating
 * an HTTP request.
 */
interface AuthenticationHandler
    extends Handler<AuthenticationRequest, AuthenticationResult> { }

/**
 * EN: The AuthenticationRequest represents an HTTP request that needs to be
 * authenticated
 */
type AuthenticationRequest = {
    user?: {
        name: string;
        password: string;
    };
    apiKey?: string;
    jwtToken?: string;
};

/**
 * EN: The AuthenticationResult represents the result of an authentication
 * attempt
 */
type AuthenticationResult = {
    success: boolean,
    message: string
}

/**
 * EN: The base AbstractAuthenticationHandler implements the default chaining
 * behavior
 */
abstract class AbstractAuthenticationHandler implements AuthenticationHandler {
    private nextHandler: AuthenticationHandler;

    public setNext(handler: AuthenticationHandler): AuthenticationHandler {
        this.nextHandler = handler;
        return handler;
    }

    public handle(request: AuthenticationRequest): AuthenticationResult {
        if (this.nextHandler) {
            return this.nextHandler.handle(request);
        }

        return { success: false, message: 'Unable to authenticate user.' };
    }
}

/**
 * EN: All Concrete Handlers either handle a request or pass it to the next
 * handler in the chain.
 *
 * RU: Все Конкретные Обработчики либо обрабатывают запрос, либо передают его
 * следующему обработчику в цепочке.
 */
class BasicAuthenticationHandler extends AbstractAuthenticationHandler {
    public handle(request: AuthenticationRequest): AuthenticationResult {
        const user = request.user;
        if (user.name === 'admin' && user.password === 'password') {
            return {
                success: true,
                message: 'User authenticated with basic authentication.'
            };
        }
        return super.handle(request);
    }
}

class ApiKeyAuthenticationHandler extends AbstractAuthenticationHandler {
    public handle(request: AuthenticationRequest): AuthenticationResult {
        if (request.apiKey === 'my-api-key') {
            return {
                success: true, message: 'User authenticated with API key.'
            };
        }
        return super.handle(request);
    }
}

class JwtAuthenticationHandler extends AbstractAuthenticationHandler {
    public handle(request: AuthenticationRequest): AuthenticationResult {
        if (request.jwtToken === 'my-jwt-token') {
            return {
                success: true, message: 'User authenticated with JWT token.'
            };
        }
        return super.handle(request);
    }
}