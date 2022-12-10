// DEPENDENCIES
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const userRouter = require('./router/userRoute');
const todoRouter = require('./router/todoRoute');
const AppError = require('./utils/appError');
const globalErrorHandling = require('./controller/errorController');
const cookie = require('cookie-parser');

// SETUP APP
const app = express();

// MIDDLEWARE
// Cors
app.use(cors());

// Http logger
app.use(morgan('dev'));

// Body parser
app.use(express.json());
app.use(cookie());

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
