const express = require('express');
const router = express.Router();
const { ensureAuth } = require('../middleware/auth');

const User = require('../models/User');

// @desc    Show all users
// @route   GET /users
router.get('/', ensureAuth, async (req, res) => {
    try {
        const users = await User.find()
            .sort({ createdOn: 'desc' })
            .lean();

        res.render('users/index', {
            users,
            email: req.user.email
        });
    } catch (err) {
        console.error(err);
        res.render('error/500');
    }
});

module.exports = router;