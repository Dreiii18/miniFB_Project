const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/config');
const Account = require('../models/Account');

const authenticateToken = async (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];

    if (!token) {
        return res.status(401).json({
            message: 'Authentication token missing'
        });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.account = await Account.findById(decoded.accountId);
        next();
    } catch (error) {
        res.status(403).json({
            message: 'Invalid or expired token'
        });
    }
};

module.exports = authenticateToken;