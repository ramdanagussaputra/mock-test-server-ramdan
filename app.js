// DEPENDENCIES
const express = require('express');
const morgan = require('morgan');
const userRouter = require('./router/userRoute');
const todoRouter = require('./router/todoRoute');
const AppError = require('./utils/appError');
const globalErrorHandling = require('./controller/errorController');

// SETUP APP
const app = express();

// MIDDLEWARE
// Http logger
app.use(morgan('dev'));

// Body parser
app.use(express.json());

// Router
app.use('/api/user', userRouter);
app.use('/api/todo', todoRouter);

// Error Handling
app.use('*', (req, _, next) => {
    next(
        new AppError(
            `Cannot find the path. ${req.originalUrl} does not exist in this server`,
            404
        )
    );
});

app.use(globalErrorHandling);

module.exports = app;
