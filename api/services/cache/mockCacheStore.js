
export let refreshTokens = [];

export function destroy(tokenToDelete) {
    refreshTokens = refreshTokens.filter(token => token !== tokenToDelete);
}

export function set(tokenToSet) {
    refreshTokens.push(tokenToSet);
}

export function get(tokenToFind) {
    const containsToken = refreshTokens.find(token => token === tokenToFind);
    return containsToken ? true : false;
}