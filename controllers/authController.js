const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Account = require('../models/Account');
const { JWT_SECRET } = require('../config/config');
const { nanoid } = require('nanoid');

// login
const loginAccount = async (req, res) => {
    const { username, password } = req.body;

    try {
        // check if account exists
        const account = await Account.findOne({ username });

        if (!account) {
            return res.status(400).json({
                message: 'Invalid username or password'
            });
        }

        // validate password
        const isPasswordValid = await bcrypt.compare(password, account.password);

        if (!isPasswordValid) {
            return res.status(400).json({
                message: 'Invalid Username or password'
            });
        }

        // new jwt token
        const token = jwt.sign(
            {
                accountId: account._id,
                username: account.username
            },
            JWT_SECRET,
            {
                expiresIn: '1h'
            }
        );

        const accountData = {
            userId: account._id,
            username: account.username,
            fullName: account.fullName,
            profilePicture: account.profilePicture
        }

        res.status(200).json({
            message: 'Login successful', token, accountData
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
};

// register
const registerAccount = async (req, res) => {
    const { username, password, fullName, profilePicture } = req.body;
    try {
        // check if account exists
        const existingAccount = await Account.findOne({ username });

        if (existingAccount) {
            return res.status(400).json({
                message: 'Username already exists'
            });
        }

        // hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // create a new acount
        const newAccount = new Account({
            userId: nanoid(),
            username,
            password: hashedPassword,
            fullName,
            profilePicture,
        });

        await newAccount.save();
        res.status(201).json({newAccount});
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// reset
const resetPassword = async (req, res) => {
    const { username, oldpassword, newpassword } = req.body;

    try {
        // check if username exists
        const account = await Account.findOne({ username });

        if (!account) {
            return res.status(404).json({
                message: 'User not found'
            });
        }
    
        // check if the password matches
        const isOldPasswordValid = await bcrypt.compare(oldpassword, account.password);

        if (!isOldPasswordValid) {
            return res.status(400).json({
                message: 'Invalid old password'
            })
        }

        if (oldpassword === newpassword) {
            return res.status(400).json({
                message: 'New password cannot be the same as the old password'
            })
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(newpassword, 10);

        // Update the password
        account.password = hashedPassword;
        await account.save();

        res.status(200).json({
            message: 'Password successfully updated'
        });

    } catch (error) {
        res.status(500).json({
            message: 'Error resetting password', 
            error: error.message,
            stack: error.stack
        });
    }
};

// 
module.exports = { registerAccount, loginAccount, resetPassword };