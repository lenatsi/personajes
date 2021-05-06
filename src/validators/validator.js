const Joi = require('joi')
const schema = Joi.object({
    nombre:Joi.string().required(),
    apellidos:Joi.string().required(),
    role:Joi.string().required().valid('company', 'user', 'admin'),
    cv:Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}')).required()
})

function validate(body){
    return schema.validate({
        nombre:body.nombre,
        apellidos:body.apellidos,
        role:body.role,
        cv:body.cv,
        email:body.email,
        password: body.password
    },
    {abortEarly:false},)
}

module.exports = {validate}