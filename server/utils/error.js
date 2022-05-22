const createError = (status, message) => {
    const err = new Error(message);
    err.status = status;
    err.message = message;

    return err;
}


exports.module = { createError }