const router = require('express').Router();
const userController = require('../controller/userController');

router.route('/login').post(userController.login);
router.route('/').post(userController.createUser).get(userController.getUsers);
router.route('/:id').get(userController.getUser);

module.exports = router;
