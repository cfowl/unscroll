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
    });
    selectRadio.addEventListener('click', () => {
        multiUserSelectWrapper.classList.remove('hide');
    });
    friendsRadio.addEventListener('click', () => {
        multiUserSelectWrapper.classList.add('hide');
    });
    publicRadio.addEventListener('click', () => {
        multiUserSelectWrapper.classList.add('hide');
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
    let statusUsers = [];
    let authorID = document.querySelector('#authorID').innerHTML;
    statusUsers.push(authorID)
    
    // everytime a user box is checked, a list of statusUsers is updated
    // and the hidden input which gets submitted with the form as statusUsers is populated
    let statusUsersInput = document.querySelector('#statusUsers');
    let userCheckboxes = Array.from(document.getElementsByClassName('checkbox'));
    userCheckboxes.forEach(box => {
        box.addEventListener('click', () => {
            if(box.checked) {
                statusUsers.push(box.value);
            } else {
                let i = statusUsers.indexOf(box.value);
                statusUsers.splice(i, 1);
            }
            statusUsersInput.value = statusUsers;
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