let intervalID;
let CorrectAnswers = [];
let correct = 0;
let incorrect = 0;
let unanswered = 0;




let timer = {
    seconds: 120,

    start: function () {
        clearInterval(intervalID); //prevent stacking
        intervalID = setInterval(timer.count, 1000);
    },

    count: function () {
        timer.seconds--;
        $("#timer").text("Time Remaining: " + timer.seconds + " Seconds");

        if (timer.seconds === 0) {
            endGame();
        }
    },

    end: function () {
        clearInterval(intervalID);
    }

}

$(document).on("click", "#done-button", endGame);

if (timer.seconds === 0) {
    endGame();
}

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    
    while (0 !== currentIndex) {

       
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}