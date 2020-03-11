import mongoose from 'mongoose'
const schema = mongoose.Schema
import Joi from 'joi'

mongoose.set('useCreateIndex', true)
const userSchema = new schema({
    username: {type: String, required: true, unique: true},
    mail: {type: String, required: true},
    profilePicture: {
        small_picture_url: {type: String},
        big_picture_url: {type: String}
    }
}, {timestamps: true})


userSchema.statics.isValid = function(body) {
    const schema = Joi.object().keys({
        username: Joi.string().required(),
        mail: Joi.string().required()
    })

    return Joi.validate(body, schema)
}

export const User = mongoose.model('user', userSchema)