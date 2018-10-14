import {Body, JsonController, Post, Req, Res, UnauthorizedError} from "routing-controllers";
import AuthService from "../services/AuthService";
import ILoginModel from "../models/ILoginModel";

@JsonController('/auth')
export default class AuthController {
    constructor(
        private authService: AuthService,
    ) {
    }

    @Post()
    async authenticate(@Body() body: ILoginModel, @Res() response, @Req() request) {
        const result = await this.authService.authenticateUser(body.username, body.password);
        if (result.isSuccess()) {
            return {
                token: result.data
            };
        } else {
            throw new UnauthorizedError(result.error);
        }
    }
}
