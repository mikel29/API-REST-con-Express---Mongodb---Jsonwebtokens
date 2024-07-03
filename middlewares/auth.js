const jwt = require('jsonwebtoken');

const verifyToken = (token) => {
    try {
        return jwt.verify(token, 'your_jwt_secret');
    } catch (error) {
        console.error('Error verifying token:', error);
        return null;
    }
};

const auth = (req, res, next) => {
    const authHeader = req.header('Authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: "Acceso denegado, token no proporcionado o inválido" });
    }

    const token = authHeader.replace('Bearer ', '');
    const decodedToken = verifyToken(token);

    if (!decodedToken) {
        return res.status(401).json({ error: "Token inválido" });
    }

    req.userId = decodedToken.userId;
    next();
};

module.exports = auth;
