import crypto from "node:crypto";

function generateUserId() { // TODO: func not needed, postgres generates uuids
    return crypto.randomUUID();
}
function generateUserHandle(userName) {
    const base = userName.toLowerCase();
    const postfix = (Math.random() * 999999).toFixed();
    return `${base}${postfix}`;
}
const userHelpers = { generateUserId, generateUserHandle };
export default userHelpers;