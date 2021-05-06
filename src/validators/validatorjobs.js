const Joi = require('joi')
const schema = Joi.object({
    name:Joi.string().required(),
    description:Joi.string().max(400).required(),
    localization:Joi.string().required(),
    city:Joi.string().required(),
})

function validate(body){
    return schema.validate({
        name:body.name,
        description:body.description,
        localization:body.localization,
        city:body.city,
    },
    {abortEarly:false},)
}

module.exports = {validate}