import User from "../data/schemas/UserModel";

export default async function databaseClear() {
    await User.deleteMany({})
}
