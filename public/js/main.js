let scrollDates = document.querySelectorAll('.scroll-date');

scrollDates.forEach(sd => {
    sd.innerHTML = Intl.DateTimeFormat().resolvedOptions().timeZone;
});