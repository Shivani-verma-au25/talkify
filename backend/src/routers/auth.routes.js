import {Router} from 'express'
import { authLogin, authLogOut, authSignUp, onBoard } from '../controller/auth.controller.js'
import { protectRoute } from '../middlewares.js/auth.middleware.js'

const router = Router()


router.route('/signup').post(authSignUp)
router.route('/signin').post(authLogin)
router.route('/logout').post(authLogOut)

// protected routes
router.route('/onboarding').post( protectRoute , onBoard)

// check if user is logged in
router.route('/me').get(protectRoute , (req ,res) =>{
    res.status(200).json({success : true , user : req.user});
})

export default router


