import {Get, JsonController, Req, UseBefore} from "routing-controllers";
import {AuthenticationMiddleware} from "../middleware/AuthenticationMiddleware";

@JsonController('/user')
@UseBefore(AuthenticationMiddleware)
export default class UserController {
    @Get('/profile')
    async getMe(@Req() request) {
        const userModel = request.user.toJSON();
        return userModel;
    }
}
