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

// @desc    Show one user's friends
// @route   GET /users/:id/friends
router.get('/:id/friends', ensureAuth, async (req, res) => {
    try {
        const oneUser = await User.findById(req.params.id)
            .lean();
        
        const users = await User.find()
            .lean();

        res.render('users/friends', { oneUser, users });
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

// @desc    Update user's friends --> pushing a friend
// @route   PUT /users/:id/friends/push
router.put('/:id/friends/push', ensureAuth, async (req, res) => {
    try {

        let user = await User.findById(req.params.id).lean();
        if(!user) return res.render('error/404');

        if(user._id != req.user.id) res.render('error/500');
        else if(req.body.friend === '') res.render('error/500');
        else if(req.body.friend === 'repeat') res.redirect(`/users/${user._id}`);
        else {
            // push friend to friends array
            user = await User.findOneAndUpdate(
                { _id: req.params.id }, 
                { $push: { friends: req.body.friendToPush } },
                {   new: true,
                    runValidators: true
                }
            );

            res.redirect(`/users/${user._id}/friends`);
        }
    } catch (err) {
        console.error(err);
        res.render('error/500');
    }
});

// @desc    Update user's friends --> pulling a friend
// @route   PUT /users/:id/friends/pull/:friendID
router.put('/:id/friends/pull/:friendID', ensureAuth, async (req, res) => {
    try {
        let user = await User.findById(req.params.id).lean();
        if(!user) return res.render('error/404');

        if(user._id != req.user.id) res.render('error/500');
        else {
            // remove friend from friends array
            user = await User.findOneAndUpdate(
                { _id: req.params.id }, 
                { $pull: { friends: req.params.friendID } }
            );

            res.redirect(`/users/${user._id}/friends`);
        }
    } catch (err) {
        console.error(err);
        res.render('error/500');
    }
});

module.exports = router;