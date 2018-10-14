import * as express from 'express';
import * as passport from 'passport';
import User from "../data/schemas/UserModel";
import {ExtractJwt} from "passport-jwt";

const passportJWT = require("passport-jwt");
const LocalStrategy = require('passport-local').Strategy;
const JWTStrategy = passportJWT.Strategy;

export default async function passportStartup(app: express.Application) {
    app.use(passport.initialize());
    app.use(passport.session());

    passport.use(new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password'
    }, (username, password, callback) => {
        return User.findOne({username}).then(user => {
            if (!user) {
                return callback(null, {message: 'Incorrect username/password combination'});
            }
        }).catch(err => {
            console.error('somerr', err);
            return callback(err);
        });
    }));

    passport.use(new JWTStrategy({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET
    }, (jwtPlayload, callback) => {
        return User.findById(jwtPlayload.id).then(user => {
            return callback(null, user);
        }).catch(err => {
            return callback(err);
        });
    }));
}
