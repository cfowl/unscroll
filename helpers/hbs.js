const moment = require('moment');
const momentTimezone = require('moment-timezone');

module.exports = {
    formatDate: (date, USERZONE) => {
        // using Intl.DateTimeFormat().resolvedOptions().timeZone to get user timezone didn't work with Heroku
        // const userZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        return moment(date).tz(USERZONE).format('lll');
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
    editIcon: (scrollUser, loggedUser, scrollId, floating = true) => {
        if(scrollUser._id.toString() === loggedUser._id.toString()) {
            if(floating) {
                return `<a href="/scrolls/edit/${scrollId}" class="btn-floating halfway-fab blue">
                <i class="fas fa-edit fa-small"></i></a>`;
            } else {
                return `<a href="/scrolls/edit/${scrollId}">
                <i class="fas fa-edit"></i></a>`;
            }
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
    }
};