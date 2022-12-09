// DEPENDENCIES
// const { promisify } = require('util');
// const jwt = require('jsonwebtoken');
const User = require('../model/userModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsycn');

// CREATE USER
exports.createUser = catchAsync(async (req, res, next) => {
    const dataInput = {
        name: req.body.name,
        password: req.body.password,
    };

    const user = await User.create(dataInput);
    if (!user) new AppError('Invalid user input', 400);

    user.password = undefined;

    res.status(200).json({
        status: 'success',
        data: user,
    });
});

// GET ONE USER
exports.getUser = catchAsync(async (req, res, next) => {
    const id = req.params.id;
    const user = await User.findById(id);

    res.status(200).json({
        status: 'success',
        message: `Successfuly retrive ${user.name}`,
        data: user,
    });
});
