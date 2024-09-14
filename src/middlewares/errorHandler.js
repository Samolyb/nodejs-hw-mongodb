import createHttpError, { HttpError } from 'http-errors';

export const errorHandler = (err, req, res, next) => {
    if (err instanceof HttpError) {
        res.status(err.status || 500).json({
            status: err.status || 500,
            message: err.message || 'Internal Server Error',
            data: err.expose ? err : undefined,
        });
        return;
    }

    res.status(500).json({
        status: 500,
        message: 'Something went wrong',
        data: err.message || 'Internal Server Error',
    });
};