import User from "../data/schemas/UserModel";

export default async function seedUsers(userCount: number = 10, password: string = 'Testing123!') {
    const promises = [];
    for (let i = 1; i <= userCount; i++) {
        const user = new User({
            password,
            username: `User${i}`,
            email: `apiboilerplate-testinguser${i}@someemail.com`,
        });
        promises.push(user.save());
    }
    return await Promise.all(promises);
}
