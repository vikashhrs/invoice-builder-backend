import joi from 'joi';
export default {
    validateCreateSchema(body) {
        const schema = joi.object().keys({
            firstName: joi.string().required(),
            lastName: joi.string().required(),
            email: joi.string().email().required()
        });

        const { error, value } = joi.validate(body, schema);

        if (error && error.details) {
            return { error };
        }

        return { value };
    },
    validateUpdateSchema(body) {
        const schema = joi.object().keys({
            firstName: joi.string().optional(),
            lastName: joi.string().optional(),
            email: joi.string().email().optional()
        });

        const { error, value } = joi.validate(body, schema);

        if (error && error.details) {
            return { error };
        }

        return { value };
    }
}