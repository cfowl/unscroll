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

// >>>> title search functionality <<<<
// get title search button
let titleSearchBtn = document.querySelector('#titleSearchBtn');
// get title search input
let titleSearch = document.querySelector('#titleSearch');
// listen for click on title search button
titleSearchBtn.addEventListener('click', () => {
    // loop through scrolls
    dashScrolls.forEach(scroll => {
        let title = scroll.querySelector('.scroll-title').innerHTML.toLowerCase();
        let titleValue = titleSearch.value.toLowerCase();
        // only show scrolls that match the searched title
        if(title.includes(titleValue)) {
            scroll.classList.remove('title-hide');
        } else {
            scroll.classList.add('title-hide');
        }
    });
});

// >>>> tag search functionality <<<<
// get tag search button
let tagSearchBtn = document.querySelector('#tagSearchBtn');
// get tag search input
let tagSearch = document.querySelector('#tagSearch');
// listen for click on tag search button
tagSearchBtn.addEventListener('click', () => {
    // loop through scrolls
    dashScrolls.forEach(scroll => {
        // convert tags and searched value to lowercase for comparison
        let tag = scroll.querySelector('.scroll-tags').innerHTML.toLowerCase();
        let tagValue = tagSearch.value.toLowerCase();
        // show only scrolls that match the searched tag
        if(tag.includes(tagValue)) {
            scroll.classList.remove('tag-hide');
        } else {
            scroll.classList.add('tag-hide');
        }
    });
});

// >>>> status search functionality <<<<
// get status select dropdown
let statusSearch = document.querySelector('#statusSearch');
// listen for changes to status select dropdown value
statusSearch.addEventListener('change', () => {
    // loop through scrolls
    dashScrolls.forEach(scroll => {
        let scrollStatus = scroll.querySelector('.scroll-status').innerHTML;
        // show all scrolls
        if(statusSearch.value === 'all') {
            scroll.classList.remove('status-hide');
        }
        // show only private scrolls
        if(statusSearch.value === 'private' && scrollStatus.includes('public')) {
            scroll.classList.add('status-hide');
        } else if(statusSearch.value === 'private' && scrollStatus.includes('private')) {
            scroll.classList.remove('status-hide');
        }
        // show only public scrolls
        if(statusSearch.value === 'public' && scrollStatus.includes('private')) {
            scroll.classList.add('status-hide');
        } else if(statusSearch.value === 'public' && scrollStatus.includes('public')) {
            scroll.classList.remove('status-hide');
        }
    });
});