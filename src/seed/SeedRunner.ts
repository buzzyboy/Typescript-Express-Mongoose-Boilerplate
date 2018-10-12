import databaseSetup from "../startup/database";
import seedUsers from "./SeedUsers";
import * as mongoose from 'mongoose';

require('dotenv').config();

async function runSeed() {
    await databaseSetup();
    const users = await seedUsers();

    await mongoose.disconnect();
}

runSeed();
