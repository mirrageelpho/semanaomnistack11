const { celebrate, Segments, Joi } = require('celebrate')

module.exports = {
     _PARAMS: celebrate({
        [Segments.PARAMS]: Joi.object().keys({
            id: Joi.number().required(),
        })
    }),
    _QUERY: celebrate({
        [Segments.QUERY]: Joi.object().keys({
            page: Joi.number()
        })
    })
}

