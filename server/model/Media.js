import mongoose from 'mongoose'
import Joi from 'joi'

const schema = mongoose.Schema

const mediaSchema = new schema({
    title: {type: String, required: true},
    duration: {type: String, required: true},
    thumbnail: {type: String, required: true},
    path: {type: String, required: true}
},{timestamps: true})

export const Media = mongoose.model('media', mediaSchema)