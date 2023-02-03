const moment = require('moment');
const momentTimezone = require('moment-timezone');

module.exports = {
    formatDate: (date) => {
        return moment(date).format('lll');
    },
    truncate: (str, len) => {
        if(str.length > len && str.length > 0) {
            let new_str = str + ' ';
            new_str = str.substr(0, len);
            
            // split string before <em> and <strong> tags
            if(new_str.includes('<em>')) {
                new_str = new_str.split('<em>')[0];
            } else if (new_str.includes('<strong>')) {
                new_str = new_str.split('<strong>')[0];
            }

            // make sure new string isn't ''
            new_str = new_str.length > 0 ? new_str : str.substr(0, len);

            // make sure empty new lines count as string of text
            if(new_str.split('<p>').length >= 6) new_str = new_str.substring(0, 125);

            // don't end with a < or <*
            while(new_str.charAt(new_str.length - 1) === '<p' || new_str.charAt(new_str.length - 2) === '<') {
                new_str = new_str.slice(0, -1);
            }

            // strip off any trailing blanks spaces
            new_str = new_str.substr(0, new_str.lastIndexOf(' '));
            
            return new_str + '...';
        }
        return str;
    },
    stripTags: (input) => {
        return input.replace(/<(?:.|\n)*?>/gm, '');
    },
    editIcon: (scrollUser, loggedUser, scrollId) => {
        if(loggedUser === null) {
            // guests will be null, don't show anything
            return '';
        }
        if(scrollUser._id.toString() === loggedUser._id.toString()) {
            // scroll user and logged user match, so show the editIcon
            return `<a href="/scrolls/edit/${scrollId}">
                <i class="material-icons bg-color5 white marg-left-0_5 pad-0_5 circle">edit</i></a>`;
        } else {
            // scroll user and logged user don't match, don't show anything
            return '';
        }
    },
    equals: (a, b) => {
        return a === b;
    },
    notEqual: (a, b) => {
        return a != b;
    },
    contains: (a, b) => {
        a = a.toString();
        return a.includes(b);
    },
    usersLink: (loggedUser) => {
        if(loggedUser === null) {
            // guests will be null, don't show anything
            return '';
        }
        if(loggedUser.googleId === '104800435635587428982') {
            // if logged user is chris2fowler@gmail.com, show users link
            return `<li><a href="/users">Users</a></li>`;
        } else {
            // logged user is not authorized, don't show anything
            return '';
        }
    },
    usersMatch: (scrollUser, loggedUser) => {
        if(loggedUser === null) {
            // guests will be null
            return false;
        }
        if(scrollUser._id.toString() === loggedUser._id.toString()) {
            // scroll user and logged user match
            return true;
        } else {
            // scroll user and logged user don't match
            return false;
        }
    },
    logOutInLink: (loggedUser) => {
        if(loggedUser === null) {
            // guests will be null, show login link
            return `<li><a href="/">Log In</a></li>`;
        } else {
            // user logged in, show logout link
            return `<li><a href="/auth/logout">Log Out</a></li>`;
        }
    },
    not: (result) => {
        // switcth true/false like ! operator
        if(result === true) {
            return false;
        } else {
            return true;
        }
    },
    profileLink: (loggedUser) => {
        // created the My Profile link
        return `<li><a href="/users/${loggedUser._id}">My Account</a></li>`;
    },
    isPublicScroll: (statusUsers, item) => {
        statusUsers = statusUsers.toString();
        item = item._id.toString();

        // check if item is in list
        if(statusUsers.includes(item)) {
            return true;
        } else if(statusUsers === '') {
            return true;
        } else {
            return false;
        }
    },
    getUserIdFrom: (user) => {
        return user._id.toString();
    },
    isLoggedUser: (userID, loggedUser) => {
        if(userID.toString() === loggedUser._id.toString()) {
            return true;
        } else {
            return false;
        }
    },
    areStatusUsers: (statusUsers) => {
        if(statusUsers.toString() === '') {
            return false;
        } else {
            return true;
        }
    },
    isSharedUser: (user, sharedUsers) => {
        if(sharedUsers.toString().includes(user.toString())) {
            return true;
        } else {
            return false
        }
    },
    formatFriends: (friends, users) => {
        console.log(users);
        let html = `<ul id="friendList" class="no-list-style no-pad marg-bot-2">`;
        friends.forEach(friend => {
            users.forEach(user => {
                if(friend.toString() === user._id.toString()) {
                    html += `<li class="marg-bot-0_5 border-bot1 wide-fit"><img class="circle wide2" src="${user.image}">${user.displayName}</li>`;
                }
            });
        });
        html += '</ul>';
        return html;
    }
};