const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

function verifyTokenAndRole(roles) {
    return [
        bodyParser.json(),
        bodyParser.urlencoded({ extended: true }),
        (req, res, next) => {
            const token = req.headers.authorization.split(' ')[1];
    
            if (!token) {
                return res.status(401).json({ message: 'No token provided' });
            }
    
            jwt.verify(token, 'secret', { algorithms: ['HS256'] }, (err, decoded) => {
                if (err) {
                    return res.status(401).json({ message: 'Invalid token', error: err });
                }
    
                if (!roles.includes(decoded.role)) {
                    return res.status(403).json({ message: 'Forbidden' });
                }
                
                req.userId = decoded.userId;
    
                next();
            });
        }
    ];
}

module.exports = { verifyTokenAndRole };