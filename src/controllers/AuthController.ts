import {Body, Controller, Get, JsonController, Post, Req, Res, UseBefore} from "routing-controllers";
import AuthService from "../services/AuthService";
import ILoginModel from "../models/ILoginModel";

@Controller('/auth')
export default class AuthController {
    constructor(
        private authService: AuthService,
    ) {
    }

    @Post()
    async authenticate(@Body() body: ILoginModel, @Res() response) {
        const res = await this.authService.authenticateUser(body.username, body.password);
        if (res.isSuccess()) {
            return response.json({
                accessToken: res.data,
            });
        } else {
            return response.statusCode(res.statusCode).send(res.error);
        }
    }
}
