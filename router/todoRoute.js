const router = require('express').Router();
const todoController = require('../controller/todoController');

router.route('/:id').post(todoController.createTodo);

module.exports = router;
