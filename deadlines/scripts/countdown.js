var MILLISECS_IN_SEC = 1000;
var SECS_IN_MIN = 60;
var MINS_IN_HOUR = 60;
var HOURS_IN_DAY = 24;

var MILLISECS_IN_MIN = (MILLISECS_IN_SEC * SECS_IN_MIN);
var MILLISECS_IN_HOUR = (MILLISECS_IN_SEC * SECS_IN_MIN * MINS_IN_HOUR);
var MILLISECS_IN_DAY = (MILLISECS_IN_SEC * SECS_IN_MIN * MINS_IN_HOUR * HOURS_IN_DAY);

var deadlines = [
    { name: 'TMA01 deadline', date: new Date("Mar 5, 2019 12:00:00") },
    { name: 'TMA02 deadline', date: new Date("Apr 16, 2019 12:00:00") },
    { name: 'TMA03 deadline', date: new Date("Jul 9, 2019 12:00:00") },
    { name: 'EMA deadline', date: new Date("Sep 16, 2019 12:00:00") }
];

function getTimeGreeting(datetime) {
    if (datetime.getHours() < 12) { return "morning"; }
    else if (datetime.getHours() < 19) { return "afternoon"; }
    else { return "evening"; }
}

function getTimeString(datetime) {
    return padZero(datetime.getHours()) + ":"
        + padZero(datetime.getMinutes()) + ":"
        + padZero(datetime.getSeconds());
}

function getDateString(datetime) {
    return padZero(datetime.getUTCDate()) + "/"
        + padZero(datetime.getUTCMonth() + 1) + "/"
        + datetime.getFullYear();
}

function getTimeElements(timeMillisecs) {
    var timeElements = {
        days: Math.floor(timeMillisecs / MILLISECS_IN_DAY),
        hours: Math.floor((timeMillisecs % MILLISECS_IN_DAY) / MILLISECS_IN_HOUR),
        mins: Math.floor((timeMillisecs % MILLISECS_IN_HOUR) / MILLISECS_IN_MIN),
        secs: Math.floor((timeMillisecs % MILLISECS_IN_MIN) / MILLISECS_IN_SEC)
    };
    return timeElements;
}

function padZero(num) {
    if (num < 10) {
        num = "0" + num;
    }
    return num;
}

function removeChildren(element) {
    while (element.hasChildNodes()) {
        element.removeChild(element.lastChild);
    }
}
