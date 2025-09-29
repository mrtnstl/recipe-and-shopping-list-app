import crypto from "node:crypto";

function generateUserId() { // TODO: func may not be needed, postgres generates uuids
    return crypto.randomUUID();
}
function generateUserHandle(userName) {
    const base = userName.toLowerCase();
    const postfix = crypto.randomBytes(4).toString("hex");
    return `${base}${postfix}`;
}
const userHelpers = { generateUserId, generateUserHandle };
export default userHelpers;