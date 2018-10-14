import seedUsers from "./SeedUsers";

export default async function seed() {
    const users = await seedUsers();
}
