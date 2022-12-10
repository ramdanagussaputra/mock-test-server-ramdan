const router = require('express').Router();
const userController = require('../controller/userController');
const authController = require('../controller/authController');

router.route('/login').post(authController.login);

router.route('/').post(userController.createUser).get(userController.getUsers);
router.route('/:id').get(authController.protect, userController.getUser);

module.exports = router;
