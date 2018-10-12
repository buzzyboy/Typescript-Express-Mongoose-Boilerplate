import * as mongoose from 'mongoose';

export default async function databaseSetup() {
    await mongoose.connect(process.env.MONGOOSE_URI, {
        useNewUrlParser: true,
    });
}
