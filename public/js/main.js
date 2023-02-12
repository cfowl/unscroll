import { formatDates } from "./modules/dates.js";
import { enableDashSearch } from "./modules/dashSearch.js";
import { enablePublicSearch } from "./modules/publicSearch.js";

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
    let multiUserSelectWrapper = document.querySelector('#multiUserSelectWrapper');
    // if public status is checked when the page loads, make sure user dropdown is available
    window.addEventListener('load', () => {
        if(selectRadio.checked) {
            multiUserSelectWrapper.classList.toggle('hide');
        }
    });

    // toggle user dropdown when scroll status changes to/from private/friends/public and select
    privateRadio.addEventListener('click', () => {
        multiUserSelectWrapper.classList.add('hide');
        if(message != null) {
            message.innerHTML = '* this scroll will only be visible to you';
        }
    });
    selectRadio.addEventListener('click', () => {
        multiUserSelectWrapper.classList.remove('hide');
        if(message != null) {
            message.innerHTML = '* this scroll will only be visible to users you select';
        }
    });
    friendsRadio.addEventListener('click', () => {
        multiUserSelectWrapper.classList.add('hide');
        if(message != null) {
            message.innerHTML = '* this scroll will only be visible to your friends';
        }
    });
    publicRadio.addEventListener('click', () => {
        multiUserSelectWrapper.classList.add('hide');
        if(message != null) {
            message.innerHTML = '* this scroll will be visible to everyone';
        }
    });
    

    // toggle user checkboxes when user dropdown is clicked
    let multiUserDropdown = document.querySelector('#multiUserDropdown');
    let multiUserCheckboxes = document.querySelector('#multiUserCheckboxes');
    multiUserDropdown.addEventListener('click', (event) => {
        event.preventDefault();
        multiUserDropdown.classList.toggle('row');
        multiUserDropdown.querySelector('.search-box').classList.toggle('no-border-radius-bottom');
        multiUserCheckboxes.classList.toggle('hide');
    });

    // create an empty array and add the authorID to it 
    let selectUsers = [];
    let authorID = document.querySelector('#authorID').innerHTML;
    selectUsers.push(authorID)
    
    // everytime a user box is checked, a list of selectUsers is updated
    // and the hidden input which gets submitted with the form as selectUsers is populated
    let selectUsersInput = document.querySelector('#selectUsers');
    let userCheckboxes = Array.from(document.getElementsByClassName('checkbox'));
    userCheckboxes.forEach(box => {
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
    console.log(selectUsers);
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