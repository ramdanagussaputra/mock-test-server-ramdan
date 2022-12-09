const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const User = require('../model/todoModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsycn');

exports.createUser = catchAsync(async (req, res, next) => {
    const dataInput = {
        name: req.body.name,
        password: req.body.password,
    };

    const user = User.create(dataInput);
    if (!user) new AppError('Invalid user input', 400);

    res.status(200).json({
        status: 'success',
        data: user,
    });
});
