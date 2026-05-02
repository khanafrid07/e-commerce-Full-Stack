const validate = (schema) => (req, res, next) => {
    if (!schema || typeof schema.safeParse !== "function") {
        console.error("Validation Middleware: Invalid schema provided");
        return next();
    }

    const result = schema.safeParse(req.body);

    if (!result.success) {
        return res.status(400).json({
            message: "Validation failed",
            errors: result.error.flatten(),
        });
    }

    // Replace with validated/coerced data
    req.body = result.data;
    next();
};

module.exports = { validate };