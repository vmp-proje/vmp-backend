import { Router } from 'express'
import { registerUser, loginUser } from '../controller/user'

const router = Router()

router.post('/user/register', registerUser)
router.post('/user/login', loginUser)

export default router
