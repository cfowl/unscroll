const moment = require('moment');
const momentTimezone = require('moment-timezone');

module.exports = {
    formatDate: (date) => {
        // using Intl.DateTimeFormat().resolvedOptions().timeZone to get user timezone didn't work with Heroku
        // const userZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        // return moment(date).tz('America/Denver').format('lll z');
        return moment(date).format('lll');
    },
    truncate: (str, len) => {
        if(str.length > len && str.length > 0) {
            let new_str = str + ' ';
            new_str = str.substr(0, len);
            new_str = str.substr(0, new_str.lastIndexOf(' '));
            new_str = new_str.length > 0 ? new_str : str.substr(0, len);
            return new_str + '...';
        }
        return str;
    },
    stripTags: (input) => {
        return input.replace(/<(?:.|\n)*?>/gm, '');
    },
    editIcon: (scrollUser, loggedUser, scrollId) => {
        if(scrollUser._id.toString() === loggedUser._id.toString()) {
            return `<a href="/scrolls/edit/${scrollId}">
                <i class="material-icons bg-blue lighten2 white pad-0_5 circle">edit</i></a>`;
        } else {
            return '';
        }
    },
    equals: (a, b) => {
        return a === b;
    },
    contains: (a, b) => {
        a = a.toString();
        return a.includes(b);
    },
    usersLink: (loggedUser) => {
        // if chris2fowler(at)gmail.com is the current user, then show users link
        console.log(loggedUser);
        if(loggedUser.googleId === '104800435635587428982') {
            return `<li><a href="/users">Users</a></li>`;
        }
    }
};