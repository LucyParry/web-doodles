// GENERAL

// This idea nicked from the great Julia Evans from https://questions.wizardzines.com/
function $(selector) {
    return document.querySelector(selector);
}
function $$(selector) {
    return document.querySelectorAll(selector);
}

// NUMBERS

// Maximum inclusive, minimum inclusive
function getRandomIntIncl(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Maximum exclusive, minimum inclusive
function getRandomIntExcl(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function getNCharString(n, char) {
    let charString = "";
    for (var i = 0; i < n; i++) {
        charString += char;
    }
    return charString;
}



function generateStars(element, starCount) {

    for (var i = 0; i <= starCount; i++) {
        var xposition = Math.random();
        var yposition = Math.random();
        var star_type = Math.floor((Math.random() * 3) + 1);
        var position = {
            "x": element.offsetWidth * xposition,
            "y": element.offsetHeight * yposition,
        };

        var star = document.createElement('div');
        star.classList.add("star");
        star.classList.add(`star-type${star_type}`);
        star.style.top = `${position.y}px`;
        star.style.left = `${position.x}px`;

        element.appendChild(star);
    }
};