import { defaultValueSchemable } from "sequelize/lib/utils";

export const validate = (schema) => {
    return (req, res, next) => {
        const result = performValidation(schema, req.body);

        if (!result.isValid) {
            return res.status(400).json({ errors: result.errors });
        }

        req.body = result.value;
        delete req.body["operation"];
        next();
    }
}

export const performValidation = (schema, data) => {
    const { error, value } = schema.validate(data, {
        abortEarly: true,
        stripUnknown: true,
        convert: true,
    });

    if (error) {
        return {
            isValid: false,
            errors: error.details.map(e => ({
                field: e.path.join('.'),
                message: e.message
            }))
        };
    }

    return {
        isValid: true,
        value: value,
        errors: null,
    }
}