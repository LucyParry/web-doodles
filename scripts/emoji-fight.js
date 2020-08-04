let emojiList;
let livesElement = $('#lives');
let optionOne = $("#option-one");
let optionTwo = $("#option-two");
let optionOneInfo = $("#option-one-info");
let optionTwoInfo = $("#option-two-info");

let game = {
    score: 0,
    hiScore: 0,
    lives: 0,
    gameOver: false
};

let round = {
    option1Score: 0,
    option2Score: 0,
    resultMessage: ""
};

function getEmojiData(url) {
    return new Promise(function (resolve, reject) {
        fetch(url)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP response was ${response.status}`);
                }
                return response.json();
            })
            .then((jsonResponse) => {
                var emoji = [];
                for (i in jsonResponse) {
                    emoji[i] = {
                        id: jsonResponse[i].id,
                        char: jsonResponse[i].char,
                        score: jsonResponse[i].score,
                        name: jsonResponse[i].name
                    };
                }
                resolve(emoji);
            })
            .catch((error) => {
                reject(Error(`Something went wrong with the fetch operation :( - ${error}`));
            });
    });
}

function initialise() {
    game.score = 0;
    game.lives = 3;
    game.gameOver = false;
    round.resultMessage = "";

    $("#new-game-footer").style.display = "none";

    game.hiScore = getHiScoreCookie();
    let scoreElement = $('#hi-score-number');
    scoreElement.innerHTML = game.hiScore;
}

function newGame() {
    initialise();
    updateResultMessageDisplay("VS.", false);
    getEmojiData('https://api.emojitracker.com/v1/rankings')
        .then(function (response) {
            emojiList = response;
            $("#main-game").style.display = "block";
            updateScoresDisplay();
            setNextEmoji();
            $("#intro").style.display = "none";
        }, function (Error) {
            alert(Error); // todo
        });
}

function toggleRoundScores(on) {
    optionOneInfo.innerHTML = on ? round.option1Score : "";
    optionTwoInfo.innerHTML = on ? round.option2Score : "";
}

function updateScoresDisplay() {
    let scoreElement = $('#round-score-number');
    scoreElement.innerHTML = game.score;
    livesElement.innerHTML = getNCharString(game.lives, "❤");
}

function updateResultMessageDisplay(strMessage, blnIsAnimated) {
    let midMessage = $("#mid-message");
    midMessage.innerHTML = strMessage;
    if (blnIsAnimated) {
        midMessage.classList.add("mid-message-animate");
    } else {
        midMessage.classList.remove("mid-message-animate");
    }
}

function setNextEmoji() {
    var emoji1 = getRandomEmoji();
    var emoji2 = getRandomEmoji();
    while (emoji1.score === emoji2.score) {
        emoji2 = getRandomEmoji(); // make sure the scores are always different
    }
    setElementEmoji(optionOne, emoji1);
    setElementEmoji(optionTwo, emoji2);
}

function getRandomEmoji() {
    return emojiList[getRandomIntExcl(0, emojiList.length)];
}

function setElementEmoji(element, emoji) {
    element.setAttribute("data-id", emoji.id);
    element.setAttribute("data-score", emoji.score);
    element.setAttribute("data-name", emoji.name);
    element.innerHTML = emoji.char;
}

async function nextRound(event) {
    if (!game.gameOver) {
        checkAnswer(event);
        updateScoresDisplay();

        if (game.lives > 0) {
            updateResultMessageDisplay(round.resultMessage, true);
            toggleRoundScores(true);
            await sleep(2000);
            updateResultMessageDisplay("VS.", false);
            toggleRoundScores(false);
            setNextEmoji();
        }
        else {
            doGameOver();
        }
    }
}

function checkAnswer(event) {
    round.option1Score = parseInt(optionOne.getAttribute("data-score"));
    round.option2Score = parseInt(optionTwo.getAttribute("data-score"));

    if (round.option1Score > round.option2Score) {
        winnerId = optionOne.id;
    } else if (round.option1Score < round.option2Score) {
        winnerId = optionTwo.id;
    }
    if (event.target.id === winnerId) {
        game.score++;
        round.resultMessage = "CORRECT!";
    } else {
        game.lives--;
        round.resultMessage = "OH NO!";
    }
}

function doGameOver() {
    game.gameOver = true;
    setHiScoreCookie();
    updateResultMessageDisplay("GAME OVER", true);
    $("#new-game-footer").style.display = "block";
}

function setHiScoreCookie() {
    let storedHiScore = getHiScoreCookie();
    if (storedHiScore === 0 || storedHiScore < game.score) {
        localStorage.setItem('emojiFightHiScore', game.score);
    }
}

function getHiScoreCookie() {
    let storedHiScore = localStorage.getItem('emojiFightHiScore');
    return storedHiScore === null ? 0 : storedHiScore;
}

let pageOnLoad = function () {
    $('#btn-start-game').onclick = newGame;
    $('#btn-new-game').onclick = newGame;
    $("#option-one").onclick = nextRound;
    $("#option-two").onclick = nextRound;
};