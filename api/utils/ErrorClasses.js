class DatabaseError extends Error {
    constructor(message) {
        super(message);
        this.errorName = "DatabaseError";
        this.statusCode = "";
    }
}
class AuthenticationError extends Error {
    constructor(message) {
        super(message);
        this.errorName = "AuthError";
        this.statusCode = "";
    }
}
// TODO: finish this (might ditch custom errors, not sure)

const ErrorClasses = { DatabaseError, AuthenticationError };
export default ErrorClasses;