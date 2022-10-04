var MILLISECS_IN_SEC = 1000;
var SECS_IN_MIN = 60;
var MINS_IN_HOUR = 60;
var HOURS_IN_DAY = 24;

var MILLISECS_IN_MIN = (MILLISECS_IN_SEC * SECS_IN_MIN);
var MILLISECS_IN_HOUR = (MILLISECS_IN_SEC * SECS_IN_MIN * MINS_IN_HOUR);
var MILLISECS_IN_DAY = (MILLISECS_IN_SEC * SECS_IN_MIN * MINS_IN_HOUR * HOURS_IN_DAY);

function getTimeGreeting(datetime) {
    if (datetime.getHours() > 5 && datetime.getHours() <= 13) { return "morning"; }
    else if (datetime.getHours() < 19 && datetime.getHours() > 13) { return "afternoon"; }
    else { return "evening"; }
}

function getTimeClass(datetime) {
    if (datetime.getHours() > 5 && datetime.getHours() <= 13) { return "morning"; }
    else if (datetime.getHours() < 19 && datetime.getHours() > 13) { return "afternoon"; }
    else { return "night"; }
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

function getTimeParts(timeMillisecs) {
    var multiplier = timeMillisecs > 0 ? 1 : -1;
    return timeParts = {
        days: Math.floor((timeMillisecs / MILLISECS_IN_DAY) * multiplier),
        hours: Math.floor(((timeMillisecs % MILLISECS_IN_DAY) / MILLISECS_IN_HOUR) * multiplier),
        mins: Math.floor(((timeMillisecs % MILLISECS_IN_HOUR) / MILLISECS_IN_MIN) * multiplier),
        secs: Math.floor(((timeMillisecs % MILLISECS_IN_MIN) / MILLISECS_IN_SEC) * multiplier)
    };
}

function padZero(num) {
    return (num < 10 ? "0" + num : num);
}