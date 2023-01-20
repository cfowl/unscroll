const express = require('express');
const router = express.Router();
const { ensureAuth } = require('../middleware/auth');

const Scroll = require('../models/Scroll');
const User = require('../models/User');

// @desc    Show add page
// @route   GET /scrolls/add
router.get('/add', ensureAuth, (req, res) => {
    res.render('scrolls/add');
});

// @desc    Process add form
// @route   POST /scrolls
router.post('/', ensureAuth, async (req, res) => {
    try {
        req.body.user = req.user.id;
        await Scroll.create(req.body);
        res.redirect('/dashboard');  
    } catch (err) {
        console.error(err);
        res.render('error/500');
    }
});

// @desc    Show all public scrolls
// @route   GET /scrolls
router.get('/', ensureAuth, async (req, res) => {
    try {
        const scrolls = await Scroll.find({ status: 'public' })
            .populate('user')
            .sort({ createdOn: 'desc' })
            .lean();

        const users = await User.find()
            .sort({ firstName: 'asc' })
            .lean();

        res.render('scrolls/index', { scrolls, users });
    } catch (err) {
        console.error(err);
        res.render('error/500');
    }
});

// @desc    Show one scroll
// @route   GET /scrolls/:id
// guests and authorized users can access this route, therefore no ensureAuth
router.get('/:id', async (req, res) => {
    try {
        const scroll = await Scroll.findById(req.params.id)
          .populate('user')
          .lean();
        
        if(!scroll) return res.render('error/404');

        res.render('scrolls/show', { scroll });
    } catch (err) {
        console.error(err);
        res.render('error/500');
    }
});

// @desc    Show edit page
// @route   GET /scrolls/edit/:id
router.get('/edit/:id', ensureAuth, async (req, res) => {
    try {
        const scroll = await Scroll.findOne({ _id: req.params.id }).lean();
        if(!scroll) return res.render('error/404');

        if(scroll.user != req.user.id) res.redirect('/scrolls');
        else res.render('scrolls/edit', { scroll });
    } catch (err) {
        console.error(err);
        res.render('error/500');
    }
});

// @desc    Update scroll
// @route   PUT /scrolls/:id
router.put('/:id', ensureAuth, async (req, res) => {
    try {
        let scroll = await Scroll.findById(req.params.id).lean();
        if(!scroll) return res.render('error/404');

        if(scroll.user != req.user.id) res.redirect('/scrolls');
        else {
            scroll = await Scroll.findOneAndUpdate({ _id: req.params.id }, req.body, {
                new: true,
                runValidators: true
            });

            res.redirect('/dashboard');
        }
    } catch (err) {
        console.error(err);
        res.render('error/500');
    }
});

// @desc    Delete scroll
// @route   DELETE /scrolls/:id
router.delete('/:id', ensureAuth, async (req, res) => {
    try {
        const scroll = await Scroll.findById(req.params.id).lean();
        if(!scroll) return res.render('error/404');

        if(scroll.user != req.user.id) res.redirect('/scrolls');

        else {
            await Scroll.remove({ _id: req.params.id });
            res.redirect('/dashboard');
        }
    } catch (err) {
        console.error(err);
        res.render('error/500');
    }
});

// @desc    User scrolls
// @route   GET /scrolls/user/:id
router.get('/user/:userId', ensureAuth, async (req, res) => {
    try {
        const scrolls = await Scroll.find({
            user: req.params.userId,
            status: 'public'
        })
          .populate('user')
          .lean();

        const author = await User.findById(req.params.userId)
          .lean();

        res.render('scrolls/index', { scrolls, author });
    } catch (err) {
        console.error(err);
        res.render('error/500');
    }
});

module.exports = router;