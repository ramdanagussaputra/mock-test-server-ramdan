const router = require('express').Router();
const userController = require('../controller/userController');

router.route('/').post(userController.createUser);
router.route('/:id').get(userController.getUser);

module.exports = router;
