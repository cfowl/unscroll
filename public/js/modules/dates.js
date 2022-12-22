// gets user's timezone to display dates correctly
module.exports = Intl.DateTimeFormat().resolvedOptions().timeZone;