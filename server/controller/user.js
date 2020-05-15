import { sign } from '../helpers/auth'
import { User } from '../model/User'
import bcrypt from 'bcrypt'

export const registerUser = async (req, res) => {  
    if(!req.body) {
        return res.status(400).send({
            status: 'failure',
            message: 'empty_body'
        })
    }

    try {
        const {error, value} = User.isValid(req.body)
        if(error) {
            console.error(error)
            return res.status(400).send({
                status: 'failure',
                message: 'invalid_body'
            })
        }

        const user = await User(value).save()

        return res.status(201).send({
            status: 'success',
            data: {
                token: sign(user)
            }
        })

    } catch (e) {
        console.log(e)
        return res.status(500).send({
            status: 'failure',
            message: 'server_error'
        })
    }
}

export const loginUser = async (req, res) => {
    if(!req.body) {
        return res.status(400).send({
            status: 'failure',
            message: 'empty_body'
        })
    }
    try {
        const user = await User.findOne({mail: req.body.mail})
        if(!user) {
            return res.status(404).send({
                status: 'failure',
                message: 'no_user'
            })
        }

        bcrypt.compare(req.body.password, user.password, (error, matched) => {

            if(error) {
                console.log(err)
            }

            if(matched) {
                return res.status(200).send({
                    status: 'success',
                    data: {
                        token: sign(user),
                        username: user.username
                    }
                })
            } else {
                return res.status(400).send({
                    status: 'failure',
                    message: 'no_user'
                })
            }
        })
        
    } catch(e) {
        console.error(e)
        return res.status(500).send({
            status: 'failure',
            message: 'server_error'
        })
    }
}