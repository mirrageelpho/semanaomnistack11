const { celebrate, Segments, Joi } = require('celebrate')

module.exports = {
     _HEADERS: celebrate({
        [Segments.HEADERS]: Joi.object({
            authorization: Joi.string().required(),
        }).unknown()
    })
}
