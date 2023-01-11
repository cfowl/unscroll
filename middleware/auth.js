module.exports = {
    ensureAuth: (req, res, next) => {
        if(req.isAuthenticated()) {
            // if user is logged in, continue (to wherever they're trying to go)
            return next();
        }
        else {
            // otherwise, redirect to login page
            res.redirect('/');
        }
    },
    ensureGuest: (req, res, next) => {
        if(req.isAuthenticated()) {
            // if user is already logged in, redirect to dashboard
            res.redirect('/dashboard');
        }
        else {
            // otherwise, continue (to login page)
            return next();
        }
    }
};