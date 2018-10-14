import {Body, Controller, Get, JsonController, Post, Req, Res, UnauthorizedError, UseBefore} from "routing-controllers";
import AuthService from "../services/AuthService";
import ILoginModel from "../models/ILoginModel";

const jwt = require('jsonwebtoken');
import User from "../data/schemas/UserModel";
import {AuthenticationMiddleware} from "../middleware/AuthenticationMiddleware";

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

    @UseBefore(AuthenticationMiddleware)
    @Get('/test')
    test(@Req() req) {
        console.log(req.user);
        return true;
    }

}
