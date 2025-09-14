import { v4 as uuidv4 } from "uuid";

export function generateUserId() {
    return uuidv4();
}
export function generateUserHandle(userName) {
    const base = userName.toLowerCase();
    const postfix = (Math.random() * 999999).toFixed();
    return `${base}${postfix}`;
}
