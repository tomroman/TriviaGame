let intervalID;
let queryURL = "https://opentdb.com/api.php?amount=8&category=9&difficulty=easy&type=multiple";
let correctAnswers = [];
let correct = 0;
let incorrect = 0;
let unanswered = 8;




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

    let timerDiv = $("<div id='timer-box'>");
    timerDiv.attr("class", "row");
    timerDiv.html(`<div class="col">
                        <h2 id="timer">Time Remaining: 120 Seconds</h2>
                    </div>`);

    $(".container").append(timerDiv);



    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        for (let i = 0; i < response.results.length; i++) {

            let answersArr = response.results[i].incorrect_answers;
            answersArr.push(response.results[i].correct_answer);
            correctAnswers.push(response.results[i].correct_answer);

            answersArr = shuffle(answersArr);


            let questionDiv = $("<div>");
            questionDiv.attr("class", "row question");
            questionDiv.html(`<div class="col">
            <h2>${response.results[i].question}</h2>
            <div class="form-check-inline">
                <input class="form-check-input" type="radio" name="question${i + 1}" id="q${i + 1}a1" value="${answersArr[0]}">
                <label class="form-check-label" for="q${i + 1}a1">
                    ${answersArr[0]}
                </label>
            </div>
            <div class="form-check-inline">
                <input class="form-check-input" type="radio" name="question${i + 1}" id="q${i + 1}a2" value="${answersArr[1]}">
                <label class="form-check-label" for="q${i + 1}a2">
                    ${answersArr[1]}
                </label>
            </div>
            <div class="form-check-inline">
                <input class="form-check-input" type="radio" name="question${i + 1}" id="q${i + 1}a3" value="${answersArr[2]}">
                <label class="form-check-label" for="q${i + 1}a3">
                    ${answersArr[2]}
                </label>
            </div>
            <div class="form-check-inline">
                <input class="form-check-input" type="radio" name="question${i + 1}" id="q${i + 1}a4" value="${answersArr[3]}">
                <label class="form-check-label" for="q${i + 1}a4">
                    ${answersArr[3]}
                </label>
            </div>
        </div>`)

            $(".container").append(questionDiv);
        }

        let doneButton = $(`<div class="row" id="done-button-row">
        <div class="col">
            <button type="button" id="done-button">Done</button>
        </div>
    </div>`);
    $(".container").append(doneButton);
    })
        

    timer.start();
});

if (timer.seconds === 0) {
    endGame();

}

function endGame() {
    timer.end();

    for (let i = 0; i < 8; i++) {
        let selValue = $(`input[name=question${i + 1}]:checked`).val();
        if (selValue === correctAnswers[i]) {
            correct++;
            unanswered--;
        }
        else if (selValue !== undefined) {
            incorrect++;
            unanswered--;
        }
    }
    $(".question").remove();
    $("#done-button-row").remove();
    $("#timer-box").remove();

    $(".container").append(`<h2 style='margin-bottom: 1em;'>All Done!</h2>`);
    $(".container").append(`<p>Correct Answers: ${correct}</p>`);
    $(".container").append(`<p>Incorrect Answers: ${incorrect}</p>`);
    $(".container").append(`<p>Unanswered: ${unanswered}</p>`);
}