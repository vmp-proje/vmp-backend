import mongoose from 'mongoose'
import Joi from 'joi'
import bcrypt from 'bcrypt'

const schema = mongoose.Schema

mongoose.set('useCreateIndex', true)
const userSchema = new schema({
    username: {type: String, required: true, unique: true},
    mail: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    profilePicture: {
        small_picture_url: {type: String},
        big_picture_url: {type: String}
    }
}, {timestamps: true})


userSchema.statics.isValid = function(body) {
    const schema = Joi.object().keys({
        username: Joi.string().required(),
        mail: Joi.string().email().required(),
        password: Joi.string().required()
    })

    return Joi.validate(body, schema)
}

userSchema.pre('save', function(next) {
    const user = this
    const saltRound = 10

    bcrypt.hash(user.password, saltRound,(error, hashed) => {
        if(error) {
            return next(error)
        }
        user.password = hashed
        next()
    })
})

export const User = mongoose.model('user', userSchema)