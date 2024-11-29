const Account = require('../models/Account');

// fetch account profile
const getAcccountProfile = async (req, res) => {
    try {
        const account = await Account.findById(req.user.accountId).select('-password');
        res.status(200).json(account);
    } catch (error) {
        res.status(500).json({
            message: 'Error fetching account profile', error
        })
    }
};

module.exports = { getAcccountProfile };