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
    editIcon: (author, coAuthors, loggedUser, scrollId) => {
        if(loggedUser === null) {
            // guests will be null, don't show anything
            return '';
        }
        if(coAuthors === undefined) {
            coAuthors = '';
        }
        if(author._id.toString() === loggedUser._id.toString() || coAuthors.toString().includes(loggedUser._id.toString())) {
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
            return `<li><a id="usersLink" class="navLink" href="/users">Users</a></li>`;
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
    getLoggedUserId: (loggedUser) => {
        return loggedUser._id;
    },
    isInAllScrolls: (author, status, selectUsers, coAuthors, users, loggedUser) => {
        author = author._id.toString();
        status = status.toString();
        selectUsers = selectUsers.toString();
        loggedUser = loggedUser._id.toString();
        let authorFriends = users.find(i => i._id.toString() === author).friends;

        if(coAuthors === undefined) {
            coAuthors = '';
        } else {
            coAuthors = coAuthors.toString();
        }

        if(status === 'public') {
            return true;
        } else if(status === 'select' && selectUsers.includes(loggedUser)) {
            return true;
        } else if(status === 'friends' && (authorFriends.includes(loggedUser) || author === loggedUser)) {
            return true;
        } else if(status === 'private' && coAuthors.includes(loggedUser)) {
            return true;
        } else {
            return false;
        }
    },
    isViewableScroll: (author, status, selectUsers, coAuthors, users, loggedUser) => {
        author = author._id.toString();
        status = status.toString();
        selectUsers = selectUsers.toString();
        loggedUser = loggedUser._id.toString();
        let authorFriends = users.find(i => i._id.toString() === author).friends;

        if(coAuthors === undefined) {
            coAuthors = '';
        } else {
            coAuthors = coAuthors.toString();
        }

        if(status === 'public') {
            return true;
        } else if(status === 'select' && selectUsers.includes(loggedUser)) {
            return true;
        } else if(status === 'friends' && authorFriends.includes(loggedUser)) {
            return true;
        } else if(status === 'private' && coAuthors.includes(loggedUser)) {
            return true;
        } else if(author === loggedUser) {
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
    hasSelectUsers: (selectUsers) => {
        if(selectUsers === undefined) {
            return false;
        }
        if(selectUsers.toString() === '') {
            return false;
        } else {
            return true;
        }
    },
    isSelectUser: (user, selectUsers) => {
        if(selectUsers.toString().includes(user.toString())) {
            return true;
        } else {
            return false
        }
    },
    isCoAuthor: (user, coAuthors) => {
        if(coAuthors === undefined) {
            return false;
        }
        if(coAuthors.toString().includes(user.toString())) {
            return true;
        } else {
            return false
        }
    },
    hasCoAuthors: (coAuthors) => {
        if(coAuthors === undefined) {
            return false;
        }
        if(coAuthors.toString() === '') {
            return false;
        } else {
            return true;
        }
    },
    getFriendsInfo: (friends, users) => {
        let friendsInfo = [];
        friends.forEach(friend => {
            users.forEach(user => {
                if(friend.toString() === user._id.toString()) {
                    friendsInfo.push(user);
                }
            });
        });
        return friendsInfo;
    },
    isAuthor: (author, loggedUser) => {
        if(author.toString() === loggedUser._id.toString()) {
            return true;
        } else {
            return false;
        }
    }
};