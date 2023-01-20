export function enableDashSearch() {
    // ++++++++++++ //
    // dynamic dashboard search and display
    // ------------ //
    
    // get dashboard table scroll rows
    let dashScrolls = Array.from(document.getElementsByClassName('dash-scroll'));

    // >>>> title search functionality <<<<
    // get title search button
    let dashTitleSearchBtn = document.querySelector('#dashTitleSearchBtn');
    // get title search input
    let dashTitleSearch = document.querySelector('#dashTitleSearch');

    // if we're not on the dashboard, exit function
    if(dashTitleSearchBtn === null) {
        return;
    }

    // listen for click on title search button
    dashTitleSearchBtn.addEventListener('click', () => {
        // loop through scrolls
        dashScrolls.forEach(scroll => {
            let title = scroll.querySelector('.scroll-title').innerHTML.toLowerCase();
            let titleValue = dashTitleSearch.value.toLowerCase();
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
    let dashTagSearchBtn = document.querySelector('#dashTagSearchBtn');
    // get tag search input
    let dashTagSearch = document.querySelector('#dashTagSearch');
    // listen for click on tag search button
    dashTagSearchBtn.addEventListener('click', () => {
        // loop through scrolls
        dashScrolls.forEach(scroll => {
            // convert tags and searched value to lowercase for comparison
            let tag = scroll.querySelector('.scroll-tags').innerHTML.toLowerCase();
            let tagValue = dashTagSearch.value.toLowerCase();
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
    let dashStatusSearch = document.querySelector('#dashStatusSearch');
    // listen for changes to status select dropdown value
    dashStatusSearch.addEventListener('change', () => {
        // loop through scrolls
        dashScrolls.forEach(scroll => {
            let scrollStatus = scroll.querySelector('.scroll-status').innerHTML;
            // show all scrolls
            if(dashStatusSearch.value === 'all') {
                scroll.classList.remove('status-hide');
            }
            // show only private scrolls
            if(dashStatusSearch.value === 'private' && scrollStatus.includes('public')) {
                scroll.classList.add('status-hide');
            } else if(dashStatusSearch.value === 'private' && scrollStatus.includes('private')) {
                scroll.classList.remove('status-hide');
            }
            // show only public scrolls
            if(dashStatusSearch.value === 'public' && scrollStatus.includes('private')) {
                scroll.classList.add('status-hide');
            } else if(dashStatusSearch.value === 'public' && scrollStatus.includes('public')) {
                scroll.classList.remove('status-hide');
            }
        });
    });
}