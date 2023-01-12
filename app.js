const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const connectDB = require('./config/db');

// load config
dotenv.config({ path: './config/config.env'});

// Passport config
require('./config/passport')(passport);

connectDB();

const app = express();

// Body parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Method override for forms
app.use(methodOverride((req, res) => {
    if(req.body && typeof req.body === 'object' && '_method' in req.body) {
        const method = req.body._method;
        delete req.body._method;
        return method;
    }
}));

// Logging
if(process.env.NODE_ENV === "development") {
    app.use(morgan('dev'));
}

// Handelbars helpers
const { formatDate, stripTags, truncate, editIcon, equals, contains, usersLink, usersMatch, logOutInLink } = require('./helpers/hbs');

// Handlebars
app.engine('hbs',
    exphbs.engine({
        helpers: {
            formatDate,
            stripTags,
            truncate,
            editIcon,
            equals,
            contains,
            usersLink,
            usersMatch,
            logOutInLink
        },
        defaultLayout: 'main',
        extname: '.hbs'
    })
);
app.set('view engine', '.hbs');

// Sessions
app.use(session({
    secret: 'things of my soul',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
    cookie: { maxAge: 21 * 24 * 60 * 60 * 1000 } // 21 days
}));

// Passport middleware
app
  .use(passport.initialize())
  .use(passport.session());

// Set global var
app.use((req, res, next) => {
    res.locals.user = req.user || null;
    next();
})


// Static folder
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', require('./routes/index'));
app.use('/auth', require('./routes/auth'));
app.use('/scrolls', require('./routes/scrolls'));
app.use('/users', require('./routes/users'));

const PORT = process.env.PORT || 3000;

app.listen(
    PORT,
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${process.env.PORT}`)
);
