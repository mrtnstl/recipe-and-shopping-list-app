export class DatabaseError extends Error {
    constructor(message) {
        super(message);
        this.errorName = "DatabaseError";
        this.statusCode = "";
    }
}
export class AuthenticationError extends Error {
    constructor(message) {
        super(message);
        this.errorName = "AuthError";
        this.statusCode = "";
    }
}