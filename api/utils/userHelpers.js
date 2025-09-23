import { v4 as uuidv4 } from "uuid";

function generateUserId() { // TODO: func not needed, postgres generates uuids
    return uuidv4();
}
function generateUserHandle(userName) {
    const base = userName.toLowerCase();
    const postfix = (Math.random() * 999999).toFixed();
    return `${base}${postfix}`;
}
const userHelpers = { generateUserId, generateUserHandle };
export default userHelpers;