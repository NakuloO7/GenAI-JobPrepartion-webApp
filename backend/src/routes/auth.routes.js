const {Router} = require('express');
const router = Router();
const authController = require('../controllers/auth.controller');

/**
 * @route POST
 * @description register the new user
 */
router.post('/register', authController.registerUserController);  //the api is written inside the controller folder
router.post('/login', authController.loginController);  //the api is written inside the controller folder

module.exports = router;
