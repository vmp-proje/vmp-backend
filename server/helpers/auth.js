import jwt from 'jsonwebtoken'
const secret = "jwtkeyforsigning123456789!!!!!"

export function sign(body){
    return jwt.sign(
        {
            uuid: body.uuid, 
            user_id: body._id
        }, secret)
}