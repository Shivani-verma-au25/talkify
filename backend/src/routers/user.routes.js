import { Router } from "express";
import { protectRoute } from "../middlewares.js/auth.middleware.js";
import { acceptFriendRequest, getFriendRequest, getMyFriends, getOutGoingFreindRequest, getRecommendedUsers, sendFriendRequest } from "../controller/user.controller.js";

const router = Router()

router.route('/').get(protectRoute,getRecommendedUsers)
router.route('/friends').get(protectRoute,getMyFriends)

router.route('/friend-request/:id').post(protectRoute,sendFriendRequest)
router.route('/friend-request/:id/accept').put(protectRoute,acceptFriendRequest)

router.route('/frined-request').get(protectRoute , getFriendRequest)
router.route('/outgoing-friend-request').get(protectRoute , getOutGoingFreindRequest)


export default router;