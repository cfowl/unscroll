const userZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
let scrollDates = document.querySelectorAll('.scroll-date');

scrollDates.forEach(sd => {
    let UTCDate = sd.innerHTML;
    let localDateTime = new Date(UTCDate).toLocaleString(
        'en-us',
        { year:"numeric", month:"short", day:"numeric", hour:"2-digit", minute:"2-digit" }
    );
    sd.innerHTML = localDateTime;
});