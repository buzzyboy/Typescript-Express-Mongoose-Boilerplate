import databaseSetup from "../startup/database";
import seedUsers from "./SeedUsers";
import * as mongoose from 'mongoose';
import seed from "./Seed";

require('dotenv').config();

async function runSeed() {
    await databaseSetup();

    await seed();

    await mongoose.disconnect();
}

runSeed();
