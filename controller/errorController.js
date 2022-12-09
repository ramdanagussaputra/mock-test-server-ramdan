const sendDevError = (err, res) => {
    res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
        error: err,
    });
};

const sendProdError = (err, res) => {
    if (err.isOperational) {
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
        });
    }

    res.status(500).json({
        status: 'error',
        message: 'Something went wrong 🔥',
    });
};

const errorHandler = (err, _, res, __) => {
    err.status = err.status || 'error';
    err.statusCode = err.statusCode || '500';

    if (process.env.NODE_ENV === 'development') return sendDevError(err, res);

    if (process.env.NODE_ENV === 'production') return sendProdError();
};

module.exports = errorHandler;
