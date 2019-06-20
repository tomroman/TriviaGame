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

$("#start-button").on("click", function () {
    $("#start-button-row").remove();

    var timerDiv = $("<div id='timer-box'>");
    timerDiv.attr("class", "row");
    timerDiv.html(`<div class="col">
                        <h2 id="timer">Time Remaining: 120 Seconds</h2>
                    </div>`);

    $(".container").append(timerDiv);

    timer.start();
});


function endGame() {
    timer.end();

    for (var i = 0; i < 8; i++) {
        var selValue = $(`input[name=question${i + 1}]:checked`).val();
        if (selValue === correctAnswers[i]) {
            correct++;
            unanswered--;
        }
        else if (selValue !== undefined) {
            incorrect++;
            unanswered--;
        }
    }
}