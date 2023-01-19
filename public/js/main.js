import { formatDates } from "./modules/dates.js";

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
// dynamic dashboard search and display
// ------------ //
// get dashboard table scroll rows
let dashScrolls = Array.from(document.getElementsByClassName('scroll-row'));
// get status select dropdown
let statusSearch = document.querySelector('#statusSearch');
// listen for changes to status select dropdown value
statusSearch.addEventListener('change', () => {
    // loop through scrolls
    dashScrolls.forEach(scroll => {
        let scrollStatus = scroll.querySelector('.scroll-status').innerHTML;
        // show all scrolls
        if(statusSearch.value === 'all') {
            scroll.classList.remove('hide');
        }
        // show only private scrolls
        if(statusSearch.value === 'private' && scrollStatus.includes('public')) {
            scroll.classList.add('hide');
        } else if(statusSearch.value === 'private' && scrollStatus.includes('private')) {
            scroll.classList.remove('hide');
        }
        // show only public scrolls
        if(statusSearch.value === 'public' && scrollStatus.includes('private')) {
            scroll.classList.add('hide');
        } else if(statusSearch.value === 'public' && scrollStatus.includes('public')) {
            scroll.classList.remove('hide');
        }
    });
});


// let title = dashScrolls[0].querySelector('.scroll-title').innerHTML;
// let tags = dashScrolls[0].querySelector('.scroll-tags').innerHTML;