const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const User = require('../model/userModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsycn');

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
    if (!user) throw new AppError('User does not exist', 404);

    // Check the password
    const isPasswordValid = await user.checkPassword(req.body.password, user.password);
    if (!isPasswordValid) throw new AppError('Wrong password', 401);

    const token = await signJwt(user._id);

    // res.cookie('jwt', token, {
    //     expires: new Date(Date.now() + +process.env.JWT_EXPIRE * 24 * 60 * 60 * 1000),
    //     httpOnly: true,
    //     secure: req.secure || req.headers['x-fowarded-proto'] === 'https',
    // });

    user.password = undefined;

    res.status(200).json({
        status: 'success',
        token,
        data: user,
    });
});

// PROTECT API
exports.protect = catchAsync(async (req, res, next) => {
    // Check if token exist
    if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer'))
        throw new AppError('Token does not exist', 400);

    const token = req.headers.authorization.split(' ')[1];

    // Verify token
    const decode = await verifyJwt(token);

    // Check if user still valid
    const user = User.findById(decode.id);
    if (!user) throw new AppError('User does not exist', 404);

    req.user = user;
    next();
});
