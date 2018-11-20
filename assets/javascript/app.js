
// function to start the timer would be here. 




function check() { 

var question1 = document.quiz.question1.value; 
var question2 = document.quiz.question2.value; 
var question3 = document.quiz.question3.value;
var correct = 0; 


    if(question1 == "MichaelJackson") {

        correct++; 
}   
    if (question2 == "Eminem") { 

        correct++;
}
    if(question3 == "Ac/Dc") {

        correct++;

    }

   
    var score; 


    if (correct == 0) {

        score = 2;
    }

    if (correct > 0 && correct < 3) { 

        score = 1;

    } 

    if (correct == 3) {

        score = 0;
    }

    document.getElementById("submit").style.visibility = "visible";
  
    document.getElementById("number-correct").innerHTML = "You got " + correct + " correct.";



}