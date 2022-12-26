import { formatDates } from "../js/modules/dates";

// format the dates dynamically outside the Heroku server
let scrollDates = document.querySelectorAll('.scroll-date');
formatDates(scrollDates);