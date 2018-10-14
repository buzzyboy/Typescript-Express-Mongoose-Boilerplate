import {ExpressMiddlewareInterface, UnauthorizedError} from "routing-controllers";
import * as passport from 'passport';

export class AuthenticationMiddleware implements ExpressMiddlewareInterface {

    authenticate = (callback: any) => {
        return passport.authenticate('jwt', {session: false}, callback);
    };

    use(request: any, response: any, next: (err?: any) => any): any {
        return this.authenticate((err: any, user: any, info: any) => {
            if (err || !user) {
                return next(new UnauthorizedError(err));
            }
            request.user = user;
            return next();
        })(request, response, next);
    }

}
