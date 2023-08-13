import { formatDates } from "./modules/dates.js";
import { enableDashSearch } from "./modules/dashSearch.js";
import { enablePublicSearch } from "./modules/publicSearch.js";
import { enableFavoriteSearch } from "./modules/favoriteSearch.js";


// ++++++++++++ //
// update the <title>
// ------------ //
let docTitle = document.querySelector('#doc-title');
let scrollTitle = document.querySelector('#scroll-title');
if(scrollTitle != null) {
    // set the page title
    docTitle.innerText = scrollTitle.innerText;
    // set a shared link preview title using <meta>
    // let newMeta = document.createElement('meta');
    // newMeta.setAttribute('property', 'og:title');
    // newMeta.setAttribute('content', scrollTitle.innerText);
    // document.querySelector('#head').append(newMeta);
    $(document).ready(() => {
        let metaTitle = scrollTitle.innerText;
		$('head').append(`<meta property="og:title" content="${metaTitle}">`);
    });
}


// ++++++++++++ //
// format the dates dynamically outside the Heroku server
// ------------ //
let scrollDates = document.querySelectorAll('.scroll-date');
formatDates(scrollDates);


// ++++++++++++ //
// hamburger nav toggle
// ------------ //
let hambars = document.querySelector('.hambars');
let navMenu = document.querySelector('.navMenu');

if(hambars != null) {
    hambars.addEventListener('click', () => {
        hambars.classList.toggle('open');
        navMenu.classList.toggle('open');
    });
}


// ++++++++++++ //
// nav active link
// ------------ //
// remove active class for all links
let links = Array.from(document.querySelectorAll('.navLink'));
links.forEach(link => {
    link.classList.remove('active');
});
// add active class for link that matches page URL
let URL = location.href;
if(URL.includes('/dash')) {
    document.querySelector('#dashLink').classList.add('active');
} else if(URL.includes('/add')) {
    document.querySelector('#addLink').classList.add('active');
} else if(URL.includes('/scrolls') && !(URL.includes('/add'))) {
    document.querySelector('#scrollsLink').classList.add('active');
} else if(URL.includes('/friends')) {
    document.querySelector('#friendsLink').classList.add('active');
} else if(URL.includes('/users/')) {
    document.querySelector('#accountLink').classList.add('active');
} else if(URL.includes('/users') && !(URL.includes('/users/'))) {
    document.querySelector('#usersLink').classList.add('active');
}


// ++++++++++++ //
// copyright date
// ------------ //
let currentYear = new Date().getFullYear();
let yearDisplay = document.querySelector('#copyright-year');
yearDisplay.innerHTML = currentYear;


// ++++++++++++ //
// enable dashboard search functionality
// ------------ //
enableDashSearch();


// ++++++++++++ //
// enable public search functionality
// ------------ //
enablePublicSearch();


// ++++++++++++ //
// enable public search functionality
// ------------ //
enableFavoriteSearch();


// ++++++++++++ //
// toggle search box
// ------------ //
let filterButton = document.querySelector('#filterButton');
if(filterButton != null) {
    filterButton.addEventListener('click', () => {
        let searchBox = document.querySelector('#searchBox');
        searchBox.classList.toggle('hide');
        filterButton.classList.toggle('hide');
    });
}


// ++++++++++++ //
// edit account button
// ------------ //
let editAccountBtn = document.querySelector('#editAccountBtn');
if(editAccountBtn != null) {
    let editAccountFormBtns = document.querySelector('#editAccountFormBtns');
    let accountInputDisabled = Array.from(document.getElementsByClassName('accountInputDisabled'));

    editAccountBtn.addEventListener('click', () => {
        editAccountBtn.classList.add('hide');
        editAccountFormBtns.classList.remove('hide');
        accountInputDisabled.forEach(input => {
            input.attributes.removeNamedItem('disabled');
        });
    });
}


// ++++++++++++ //
// share a scroll with select users functionality
// ------------ //
let scrollStatusToggle = document.querySelector('#scrollStatusToggle');
// make sure we're on the add or edit scroll page before proceeding
if(scrollStatusToggle != null) {
    let privateRadio = document.querySelector('#private');
    let selectRadio = document.querySelector('#select');
    let friendsRadio = document.querySelector('#friends');
    let publicRadio = document.querySelector('#public');
    let message = document.querySelector('#message');
    let shareUserSelectWrapper = document.querySelector('#shareUserSelectWrapper');
    let selectUsersInput = document.querySelector('#selectUsers');
    let selectUserCheckboxes = Array.from(document.getElementsByClassName('selectUserCheckbox'));

    // create an empty array and add the authorID to it 
    let selectUsers = [];
    let authorID = document.querySelector('#authorID');
    if(authorID != null) {
        // only add authorID on add page
        selectUsers.push(authorID.innerHTML);
    }

    window.addEventListener('load', () => {
        // if public status is checked when the page loads, make sure user dropdown is available
        if(selectRadio.checked) {
            shareUserSelectWrapper.classList.toggle('hide');
        }

        if(selectUsersInput.value != '') {
            selectUsers = selectUsersInput.value.split(',');
        }
    });

    // toggle user dropdown when scroll status changes to/from private/friends/public and select
    privateRadio.addEventListener('click', () => {
        shareUserSelectWrapper.classList.add('hide');
        if(message != null) {
            message.innerHTML = '* this scroll will only be visible to you';
        }
    });
    selectRadio.addEventListener('click', () => {
        shareUserSelectWrapper.classList.remove('hide');
        if(message != null) {
            message.innerHTML = '* this scroll will only be visible to users you select';
        }
    });
    friendsRadio.addEventListener('click', () => {
        shareUserSelectWrapper.classList.add('hide');
        if(message != null) {
            message.innerHTML = '* this scroll will only be visible to your friends';
        }
    });
    publicRadio.addEventListener('click', () => {
        shareUserSelectWrapper.classList.add('hide');
        if(message != null) {
            message.innerHTML = '* this scroll will be visible to everyone';
        }
    });
    
    // toggle user checkboxes when user dropdown is clicked
    let shareUserDropdown = document.querySelector('#shareUserDropdown');
    let shareUserCheckboxes = document.querySelector('#shareUserCheckboxes');
    shareUserDropdown.addEventListener('click', (event) => {
        event.preventDefault();
        shareUserDropdown.classList.toggle('row');
        shareUserDropdown.querySelector('.search-box').classList.toggle('no-border-radius-bottom');
        shareUserCheckboxes.classList.toggle('hide');
    });

    // everytime a user box is checked, a list of selectUsers is updated
    // and the hidden input which gets submitted with the form as selectUsers is populated
    selectUserCheckboxes.forEach(box => {
        // add/remove selectUser when checked/unchecked
        box.addEventListener('click', () => {
            if(box.checked) {
                selectUsers.push(box.value);
            } else {
                let i = selectUsers.indexOf(box.value);
                selectUsers.splice(i, 1);
            }
            selectUsersInput.value = selectUsers;
        });        
    });
}


// ++++++++++++ //
// add coAuthors to a scroll functionality
// ------------ //
let hasCoAuthors = document.querySelector('#hasCoAuthors');

if(hasCoAuthors != null) {
    let coAuthorUserDropdown = document.querySelector('#coAuthorUserDropdown');
    let coAuthorUserCheckboxes = document.querySelector('#coAuthorUserCheckboxes');
    let coAuthorUserSelectWrapper = document.querySelector('#coAuthorUserSelectWrapper');
    let coAuthorCheckboxes = Array.from(document.getElementsByClassName('coAuthorCheckbox'));
    let coAuthorsInput = document.querySelector('#coAuthors');
    let coAuthors = [];

    window.addEventListener('load', ()=> {
        if(hasCoAuthors.checked) {
            coAuthorUserSelectWrapper.classList.remove('hide');
        }

        if(coAuthorsInput.value != '') {
            coAuthors = coAuthorsInput.value.split(',');
        }
    });

    hasCoAuthors.addEventListener('change', ()=> {
        coAuthorUserSelectWrapper.classList.toggle('hide');
    });

    coAuthorUserDropdown.addEventListener('click', (event) => {
        event.preventDefault();
        coAuthorUserDropdown.classList.toggle('row');
        coAuthorUserDropdown.querySelector('.search-box').classList.toggle('no-border-radius-bottom');
        coAuthorUserCheckboxes.classList.toggle('hide');
    });

    coAuthorCheckboxes.forEach(box => {
        box.addEventListener('click', () => {
            if(box.checked) {
                coAuthors.push(box.value);
            } else {
                let i = coAuthors.indexOf(box.value);
                coAuthors.splice(i, 1);
            }
            coAuthorsInput.value = coAuthors;

            console.log(coAuthors);
        });        
    });
}


// ++++++++++++ //
// adding a friend functionality
// ------------ //
let userList = document.querySelector('#userList');
// make sure we're on the right page before proceeding
if(userList != null) {
    // listen for user to select a friend from the datalist
    userList.addEventListener('change', () => {
        // get the list of existing friends
        let friendList = document.querySelector('#friendList').innerHTML.toString();
        // get the hidden input whose value will be submitted
        let friend = document.querySelector('#friendToPush');
        // get the newly selected friend's name
        let friendValue = userList.value;
        // get the matching datalist option
        let friendOption = document.querySelector(`#users option[value='${friendValue}']`);
        // check input
        if(friendOption === null) {
            // if the input doesn't match a datalist option, notify the user
            friend.value = '';
            userList.value = 'select a valid user';
            userList.style.color = 'grey';
        } else if(friendList.includes(friendOption.dataset.value)) {
            // if the input is already a friend, notify the user
            friend.value = 'repeat';
            userList.value = `${friendValue.split(' ')[0]} is already a friend`;
            userList.style.color = 'grey';
        } else {
            // set hidden input value to the selected friend's ID
            friend.value = friendOption.dataset.value;
            userList.style.color = 'black';
        }
    });
}