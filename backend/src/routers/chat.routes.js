import {Router} from  'express'
import { protectRoute } from "../middlewares.js/auth.middleware.js";
import { getStreamToken } from '../controller/chat.controller.js';

const router = Router()
router.route('/token').get(protectRoute , getStreamToken)

export default router;

