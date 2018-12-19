import joi from 'joi';
export default {
    validateSchema(body) {
        const schema = joi.object().keys({
            email: joi.string().required().email(),
            password: joi.string().required()
        });
        const { error, value } = joi.validate(body, schema);

        if (error && error.details) {
            return { error };
        }

        return { value };
    }
}