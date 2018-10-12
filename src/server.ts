import 'reflect-metadata';

const path = require('path');
import {createExpressServer, useContainer} from "routing-controllers";
import {Container} from "typedi";
import databaseSetup from "./startup/database";
import passportStartup from "./startup/passport";

require('dotenv').config();

console.clear();

useContainer(Container);

async function initialize() {
    await databaseSetup();

    const app = createExpressServer({
        routePrefix: '/api',
        middlewares: [],
        controllers: [__dirname + "/controllers/*{.js,.ts}"],
    });

    await passportStartup(app);

    app.listen(process.env.PORT, () => {
        console.log(`Listening on port ${process.env.PORT}.`);
        console.log('all routes', app._router.stack.filter((r: any) => r.route).map((r: any) => {
            const methods = Object.keys(r.route.methods);
            return '[' + methods.join(',') + '] ' + r.route.path;
        }));
    });

}

initialize();
