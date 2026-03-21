const {Router} = require('express');
const router = Router();
const authController = require('../controllers/auth.controller');
const authUser = require('../middleware/auth.middleware');

/**
 * @route POST
 * @description register the new user
 */
router.post('/register', authController.registerUserController);  //the api is written inside the controller folder
router.post('/login', authController.loginController);  //the api is written inside the controller folder
router.get('/logout', authController.logoutUserController);

/**
 * @route /api/auth/get-me
 * @description get the current logged in user details
 * @access private
 */

router.get('/get-me', authUser, authController.getMeController);

module.exports = router;
