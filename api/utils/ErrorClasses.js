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


const ErrorClasses = { DatabaseError, AuthenticationError };
export default ErrorClasses;