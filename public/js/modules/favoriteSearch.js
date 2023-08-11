export function enableFavoriteSearch() {
    // ++++++++++++ //
    // toggle favorite scrolls
    // ------------ //

    // get favorites button
    let favoritesButton = document.querySelector('#favoritesButton');
    // if we're not on the dashboard, exit function
    
    if(favoritesButton === null) {
        return;
    }

    // get the scroll rows from the dashboard table
    let dashScrolls = Array.from(document.getElementsByClassName('dash-scroll'));
    // get array of user favorites
    let favorites = document.querySelector('#user-favorites').innerHTML;

    // listen for clicks on the favorites button
    favoritesButton.addEventListener('click', () => {
        // loop through scrolls
        dashScrolls.forEach(scroll => {
            let scrollId = scroll.querySelector('.scroll-id').innerHTML.toString();
            // if favorites button is active, reset
            if(favoritesButton.classList.contains('active')) {
                scroll.classList.remove('favorites-hide');
            }
            // else, filter favorites
            else {
                if(favorites.includes(scrollId)) {
                    scroll.classList.remove('favorites-hide');
                } else {
                    scroll.classList.add('favorites-hide');
                }
            }
        });
        favoritesButton.classList.toggle('active');
    });
}