const rateLimit = require('express-rate-limit');
export const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 10,
    message: 'Too many requests from this IP, please try again later'
});