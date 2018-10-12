import { expect } from 'chai';
import 'mocha';
import databaseSetup from "../../src/startup/database";
import User from "../../src/data/schemas/UserModel";
import databaseClear from "../../src/seed/DatabaseClear";
import 'reflect-metadata';
import {Container} from "typedi";
import AuthService from "../../src/services/AuthService";

describe('Auth Service', () => {
    const authService = Container.get(AuthService);

    before(async () => {
        require('dotenv').config();
        await databaseSetup();
    });

    it('Should Return JWT Token', async () => {
        const username = 'TestUser';
        const password = 'Testing123!';
        const user  = new User({
            username,
            email: 'test@email.com',
            password
        }).save();

        let res = await authService.authenticateUser(username, password);
        expect(res.statusCode).to.equal(200);
        expect(res.data.length).to.be.greaterThan(0);

        res = await authService.authenticateUser(username, 'IncorrectPassword');
        expect(res.statusCode).to.equal(401);
    });

    afterEach(async () => {
        await databaseClear();
    });
});
