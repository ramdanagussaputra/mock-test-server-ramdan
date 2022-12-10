const router = require('express').Router();
const todoController = require('../controller/todoController');

router.route('/:id').post(todoController.createTodo).delete(todoController.deleteTodo);

module.exports = router;
