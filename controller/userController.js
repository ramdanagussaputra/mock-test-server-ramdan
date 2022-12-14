// DEPENDENCIES
const User = require('../model/userModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsycn');

// Setting up host
// const host =
//     process.env.NODE_ENV === 'development' ? process.env.HOST_DEV : process.env.HOST_PROD;

// CREATE USER
exports.createUser = catchAsync(async (req, res, next) => {
    const dataInput = {
        name: req.body.name,
        password: req.body.password,
    };

    const user = await User.create(dataInput);
    if (!user) throw new AppError('Invalid user input', 400);

    user.password = undefined;

    res.status(200).json({
        status: 'success',
        data: user,
    });
});

// GET ONE USER
exports.getUser = catchAsync(async (req, res, next) => {
    const id = req.params.id;
    const user = await User.findById(id).populate('todos');
    if (!user) throw new AppError('User did not exist', 404);

    res.status(200).json({
        status: 'success',
        message: `Successfuly retrive ${user.name}`,
        data: user,
    });
});

// GET ALL USER
exports.getUsers = catchAsync(async (req, res, next) => {
    const user = await User.find({});

    res.status(200).json({
        status: 'success',
        message: user.length === 0 ? 'Data empty' : 'Successfuly retrive all user data',
        result: user.length,
        data: user,
    });
});
