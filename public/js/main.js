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

hambars.addEventListener('click', () => {
    hambars.classList.toggle('open');
    navMenu.classList.toggle('open');
});


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
// edit account button
// ------------ //
let editAccountBtn = document.querySelector('#editAccountBtn');
let editAccountFormBtns = document.querySelector('#editAccountFormBtns');
let accountInputDisabled = Array.from(document.getElementsByClassName('accountInputDisabled'));

editAccountBtn.addEventListener('click', () => {
    editAccountBtn.classList.add('hide');
    editAccountFormBtns.classList.remove('hide');
    accountInputDisabled.forEach(input => {
        input.attributes.removeNamedItem('disabled');
    });
});