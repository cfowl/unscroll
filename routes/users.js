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

// @desc    Show one user
// @route   GET /users/:id
router.get('/:id', ensureAuth, async (req, res) => {
    try {
        const oneUser = await User.findById(req.params.id)
            .lean();

        res.render('users/show', { oneUser });
    } catch (err) {
        console.error(err);
        res.render('error/500');
    }
});

// @desc    Update user
// @route   PUT /users/:id
router.put('/:id', ensureAuth, async (req, res) => {
    try {

        let user = await User.findById(req.params.id).lean();
        if(!user) return res.render('error/404');

        if(user._id != req.user.id) res.render('error/500');
        else {
            user = await User.findOneAndUpdate({ _id: req.params.id }, req.body, {
                new: true,
                runValidators: true
            });

            res.redirect(`/users/${user._id}`);
        }
    } catch (err) {
        console.error(err);
        res.render('error/500');
    }
});

module.exports = router;