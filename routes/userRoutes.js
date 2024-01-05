const express = require ('express')
const { loginController, registerController,authController, applyDentistController,getAllNotificationController } = require('../controllers/userController')
const authMiddleware = require("../middlewares/authMiddleware");


//router inject
const router = express.Router()

//routes
//LOGIN||POST
router.post('/login', loginController)

//REGISTER||POST
router.post('/register', registerController);

//Auth || POST
router.post('/getUserData', authMiddleware, authController)

//Apply Dent || POST
router.post('/apply-dentist', authMiddleware, applyDentistController)


//Notification dent
router.post('/get-all-notification', authMiddleware, getAllNotificationController)
module.exports = router