import {Inject} from "typedi";
import User from "../data/schemas/UserModel";
import {ServiceResponse} from "./response/ServiceResponse";

@Inject()
export default class AuthService {
    constructor() {}

    async test() {
        const users = await User.find({});
        return users;
    }

    async authenticateUser(username: string, password: string): Promise<ServiceResponse<string>> {
        const user = await User.findOne({username});
        try {
            const isMatch = await user.comparePassword(password);
            if (!isMatch) {
                return ServiceResponse.createErrorResponse(401, 'Incorrect username/password combination');
            }
            return new ServiceResponse<string>(user.createAccessToken());
        } catch (ex) {
            return ServiceResponse.createErrorResponse(500, ex);
        }
    }
}
