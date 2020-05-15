import { Router } from 'express'
import { registerUser, loginUser } from '../controller/user'
import { returnToVideo } from '../controller/media'

const router = Router()

router.post('/user/register', registerUser)
router.post('/user/login', loginUser)
router.post('/media/audio', returnToVideo)

export default router
