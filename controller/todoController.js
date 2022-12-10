const Todo = require('../model/todoModel');
const catchAsync = require('../utils/catchAsycn');
const AppError = require('../utils/appError');

exports.createTodo = catchAsync(async (req, res, next) => {
    const todoInput = {
        task: req.body.task,
        targetDate: req.body.targetDate,
        expired: req.body.targetDate < Date.now(),
        user: req.params.id,
    };

    const todo = await Todo.create(todoInput);
    if (!todo) throw new AppError('Invalid todo input', 400);

    res.status(200).json({
        status: 'success',
        message: 'Successful to create todo',
        data: todo,
    });
});
