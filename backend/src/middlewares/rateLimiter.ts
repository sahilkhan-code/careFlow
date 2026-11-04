import rateLimit from 'express-rate-limit'

const rateLimiter = rateLimit({
    windowMs : 60*1000,
    limit:5,
    standardHeaders:'draft-8',
    legacyHeaders:false,
    message:{
        status:false,
        message:"Too many requests. Please try again later."
    },
});

export default rateLimiter;