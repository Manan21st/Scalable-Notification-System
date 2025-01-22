import jwt from 'jsonwebtoken';

// Middleware to authenticate JWT
function authenticateJWT(req, res, next) {
    const authHeader = req.headers['authorization'];
    if (authHeader) {
        const token = authHeader.split(' ')[1]; 
        const secretKey = 'your_jwt_secret';  

        jwt.verify(token, secretKey, (err, user) => {
            if (err) {
                return res.status(403).json({ error: 'Forbidden: Invalid token' });
            }
            req.user = user; 
            next();
        });
    } else {
        res.status(401).json({ error: 'Unauthorized: No token provided' });
    }
}


export default authenticateJWT;