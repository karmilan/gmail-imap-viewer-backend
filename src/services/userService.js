import User from "../models/user.js";

export async function getUserByEmail(email) {
    return await User.findOne({ where: { email } });
}

export async function createUser(data) {
    return await User.create(data);
}
