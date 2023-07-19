const express = require('express');
const router = express.Router();
const { ensureAuth, ensureGuest } = require('../middleware/auth');

const Scroll = require('../models/Scroll');
const User = require('../models/User');

// @desc    Login/Landing page
// @route   GET /
router.get('/', ensureGuest, (req, res) => {
    res.render('login', {
        layout: 'login'
    });
});

// @desc    Dashboard
// @route   GET /dashboard
router.get('/dashboard', ensureAuth, async (req, res) => {
    try {
        let scrolls = await Scroll.find({ author: req.user.id })
          .lean()
          .sort({createdOn: 'desc'});
        let user = await User.findById(req.user.id).lean();
        res.render('dashboard', {
            name: req.user.firstName,
            scrolls,
            user
        });
    } catch (err) {
        console.error(err);
        res.render('error/500');
    }
});

module.exports = router;