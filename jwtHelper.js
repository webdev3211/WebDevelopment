
const jwt = require('jsonwebtoken');

module.exports.verifyToken = (req, res, next) => {
    var token;
    if ('authorization' in req.headers) {
        token = req.headers['authorization'].split(' ')[1];
    }
    if (!token)
        return res.status(403).send({ auth: false, message: 'no Token Provided' });
    else {
        jwt.verify(token, "secret12345", (err, decoded) => {
            if (err)
                return res.status(500).send({ auth: false, message: 'Token Authentication' });
            else {
                req._id = decoded.userId;
                next();
            }
        })
    }
}