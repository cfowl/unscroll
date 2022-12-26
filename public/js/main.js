const userZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
let scrollDates = document.querySelectorAll('.scroll-date');

scrollDates.forEach(sd => {
    // let UTCDate = sd.innerHTML;
    // console.log("UTC date: " + UTCDate);

    // let localDate = new Date(UTCDate).toLocaleString(
    //     'en-us',
    //     { year:"numeric", month:"short", day:"numeric", hour:"2-digit", minute:"2-digit" }
    // );
    // console.log("Local date: " + localDate);

    let UTCDate = sd.innerHTML;
    let localDate = moment.tz(sd.innerHTML, userZone).format('lll').toString();
    sd.innerHTML = localDate;
    // console.log(moment.tz(sd.innerHTML, userZone).format('lll').toString());
});