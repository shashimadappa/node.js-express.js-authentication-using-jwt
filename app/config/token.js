const jwt = require('jsonwebtoken');

// Middleware to validate JWT token
const validateToken = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ message: 'Token not provided' });
    }

    jwt.verify(token, 'your-secret-key', (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Invalid token' });
        }
        // Attach the decoded user ID to the request for later use
        req.userId = decoded.userId;
        next();
    });
};

module.exports = {
    validateToken: validateToken,
}
