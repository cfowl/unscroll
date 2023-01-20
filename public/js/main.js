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