// DEPENDENCIES
const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const User = require('../model/userModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsycn');

// Setting up host
// const host =
//     process.env.NODE_ENV === 'development' ? process.env.HOST_DEV : process.env.HOST_PROD;

// Promisify jwt sign and verify
const signJwt = (id) => {
    const sign = promisify(jwt.sign);
    return sign({ id }, process.env.JWT_KEY);
};

const verifyJwt = (token) => {
    const verify = promisify(jwt.verify);
    return verify(token, process.env.JWT_KEY);
};

// LOGIN
exports.login = catchAsync(async (req, res, next) => {
    // Validating the user
    const user = await User.findById(req.body.id).select('+password');
    if (!user) new AppError('User does not exist', 404);

    // Check the password
    const isPasswordValid = await user.checkPassword(req.body.password, user.password);
    if (!isPasswordValid) new AppError('Wrong password', 401);

    const token = await signJwt(user._id);

    res.cookie('jwt', token, {
        expires: new Date(Date.now() + +process.env.JWT_EXPIRE * 24 * 60 * 60 * 1000),
        httpOnly: true,
        secure: req.secure || req.headers['x-fowarded-proto'] === 'https',
    });

    user.password = undefined;

    res.status(200).json({
        status: 'success',
        token,
        data: user,
    });
});

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
    const user = await User.findById(id).populate('todos');
    if (!user) new AppError('User did not exist', 404);

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
