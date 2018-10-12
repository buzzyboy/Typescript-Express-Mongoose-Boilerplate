import * as express from 'express';
import * as passport from 'passport';
import User from "../data/schemas/UserModel";
const LocalStrategy = require('passport-local').Strategy;

export default async function passportStartup(app: express.Application) {
    app.use(passport.initialize());
    app.use(passport.session());

    passport.use(User.createStrategy());

    passport.serializeUser(User.serializeUser());
    passport.deserializeUser(User.deserializeUser());
}
