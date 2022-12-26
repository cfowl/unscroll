import { formatDates } from "./modules/dates.js";

// format the dates dynamically outside the Heroku server
let scrollDates = document.querySelectorAll('.scroll-date');
formatDates(scrollDates);