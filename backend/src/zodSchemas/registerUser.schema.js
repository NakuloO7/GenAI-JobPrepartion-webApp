const z = require('zod');

const registerUserSchema = z.object({
    username : z.string().min(1, "Username required!"),
    email : z.email(),
    password : z.string().min(4)
});

const loginUserSchema = z.object({
    email : z.email(),
    password : z.string().min(4)
});

module.exports = {
    registerUserSchema,
    loginUserSchema
}