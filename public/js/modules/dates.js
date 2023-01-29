export function formatDates(elements) {
    const userZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    elements.forEach(e => {
        let UTCDate = e.innerHTML;
        let localDate = moment.tz(UTCDate, userZone).format('lll').toString();
        e.innerHTML = localDate;
    });
}