export function enablePublicSearch() {
    // ++++++++++++ //
    // dynamic public search and display
    // ------------ //

    // get public scroll cards
    let publicScrolls = Array.from(document.getElementsByClassName('public-scroll'));

    // >>>> title search functionality <<<<
    // get title search button
    let publicTitleSearchBtn = document.querySelector('#publicTitleSearchBtn');
    // get title search input
    let publicTitleSearch = document.querySelector('#publicTitleSearch');

    // if we're not on the publicboard, exit function
    if(publicTitleSearchBtn === null) {
        console.log('exiting public searches');
        return;
    }

    // listen for click on title search button
    publicTitleSearchBtn.addEventListener('click', () => {
        // loop through scrolls
        publicScrolls.forEach(scroll => {
            let title = scroll.querySelector('.scroll-title').innerHTML.toLowerCase();
            let titleValue = publicTitleSearch.value.toLowerCase();
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
    let publicTagSearchBtn = document.querySelector('#publicTagSearchBtn');
    // get tag search input
    let publicTagSearch = document.querySelector('#publicTagSearch');
    // listen for click on tag search button
    publicTagSearchBtn.addEventListener('click', () => {
        // loop through scrolls
        publicScrolls.forEach(scroll => {
            // convert tags and searched value to lowercase for comparison
            let tag = scroll.querySelector('.scroll-tags').innerHTML.toLowerCase();
            let tagValue = publicTagSearch.value.toLowerCase();
            // show only scrolls that match the searched tag
            if(tag.includes(tagValue)) {
                scroll.classList.remove('tag-hide');
            } else {
                scroll.classList.add('tag-hide');
            }
        });
    });

    // >>>> user search functionality <<<<
    // get user select dropdown
    let publicUserSearch = document.querySelector('#publicUserSearch');
    // listen for changes to user select dropdown value
    publicUserSearch.addEventListener('change', () => {
        // loop through scrolls
        publicScrolls.forEach(scroll => {
            let scrollUser = scroll.querySelector('.scroll-user').innerHTML;
            // show all scrolls
            if(publicUserSearch.value === '') {
                scroll.classList.remove('user-hide');
            }
            // show only scrolls by the selected user
            if(scrollUser.includes(publicUserSearch.value)) {
                scroll.classList.remove('user-hide');
            } else {
                scroll.classList.add('user-hide');
            }
        });
    });
}