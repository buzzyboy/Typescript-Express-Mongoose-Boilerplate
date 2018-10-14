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
        const user = await User.findOne({username: body.username});
        if (!user) {
            throw new UnauthorizedError('Incorrect username/password combination');
        }
        const isCorrectPassword = await user.comparePassword(body.password);
        if (!isCorrectPassword) {
            throw new UnauthorizedError('Incorrect username/password combination');
        }
        const userModel = user.toJSON();
        const token = jwt.sign(userModel, process.env.JWT_SECRET);
        return {
            user: userModel,
            token,
        };
    }

    @UseBefore(AuthenticationMiddleware)
    @Get('/test')
    test(@Req() req) {
        console.log(req.user);
        return true;
    }

}
