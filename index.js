
'use strict';

//-------------Question and Answer Data--------------

let questionNumber = 0; 
let points = 0;
//questionNumber is manipulated by nextQuestionNumber to be equal to the current question number

const questionAnswerData = 
   [{quote: "I'm not supersticious, but I am a little sticious.", 
      answerOptions: [{answer: "Kevin Malone", correct: false}, 
        {answer: "Michael Scott", correct: true}, 
        {answer: "Erin Hannon", correct: false}, 
        {answer: "Andy Bernard", correct: false}]},
                                             
    {quote: "I talk a lot, so I’ve learned to just tune myself out.", 
      answerOptions: [{answer: "Pam Halpert", correct: false},
        {answer: "Michael Scott", correct: false},
        {answer: "Erin Hannon", correct: false},
        {answer: "Kelly Kapoor", correct: true}]},
                                             
    {quote: "You’re paying way to much for your worms man. Who is your worm guy?",
      answerOptions: [{answer: "Jim Halpert", correct: false},
        {answer: "Dwight Schrute", correct: false},
        {answer: "Andy Bernard", correct: false},
        {answer: "Creed Bratton", correct: true}]},
                                             
    {quote: "I’m a night owl and an early bird so I’m wise, and I have worms.", 
      answerOptions: [{answer: "Michael Scott", correct: true},
        {answer: "Dwight Schrute", correct: false},
        {answer: "Kevin Malone", correct: false},
        {answer: "Creed Bratton", correct: false}]},
                                             
    {quote: "Oh, it is on like a prawn who yawns at dawn.", 
      answerOptions: [{answer: "Pam Halpert", correct: false},
        {answer: "Todd Packer", correct: false},
        {answer: "Angela Martin", correct: false},
        {answer: "Andy Bernard", correct: true}]},   
                                             
    {quote: "I wonder how many phone calls you're missing while you're teaching us to answer calls.", 
      answerOptions: [{answer: "Kelly Kapoor", correct: false},
        {answer: "Angela Martin", correct: false},
        {answer: "Oscar Martinez", correct: true},
        {answer: "Pam Halpert", correct: false}]},
                                             
    {quote: "Look, I hate to be that person, but I just don't like the general spirit of music.",
      answerOptions: [{answer: "Dwight Schrute", correct: false},
        {answer: "Angela Martin", correct: true},
        {answer: "Andy Bernard", correct: false},
        {answer: "Creed Bratton", correct: false}]},
                                             
    {quote: "I taught Mike some, uh, phrases to help with his interracial conversations. You know, stuff like, \“Fleece it out.\” \“Going mach five.\” \“Dinkin’ flicka.\”",
      answerOptions: [{answer: "Darryl Philbin", correct: true},
        {answer: "Dwight Schrute", correct: false},
        {answer: "Michael Scott", correct: false},
        {answer: "Creed Bratton", correct: false}]},
                                             
    {quote: "There is a thing such as good grief. Just ask Charlie Brown.", 
      answerOptions: [{answer: "Erin Hannon", correct: false},
        {answer: "Pam Halpert", correct: false},
        {answer: "Kevin Malone", correct: false},
        {answer: "Michael Scott", correct: true}]},   
                                             
    {quote: "I DECLARE BANKRUPTCY!", 
      answerOptions: [{answer: "Michael Scott", correct: true},
        {answer: "Dwight Schrute", correct: false},
        {answer: "Darryl Philbin", correct: false},
        {answer: "Creed Bratton", correct: false}]}];

//-------------Question Page--------------

//only see intro question-page at first

$( document ).ready(function() {
    $( '.question-page' ).hide();
    $( '.feedback' ).hide();
    $( '.final-page' ).hide();
});



function startQuiz() {
  $('.begin-btn').click(function(event) {
//Begin button leads to the question page
    event.preventDefault();
    renderQuestionPage();
    renderQuoteAndAnswers();
    styleSelectedOption();
    $('.first-page').remove();
  });
}


function styleSelectedOption() {
//add class "selected-option" to answer-div
    $('input:radio').change(function(){
        var selected = $(this);
        selected.closest('.answer-options').find('div.selected-option').removeClass('selected-option');
        selected.closest('.answer-div').addClass('selected-option');
    });
}


function renderQuestionPage() {
    renderQuoteAndAnswers();
    $( '.question-page' ).show();
    $('.feedback').hide()
}


function renderQuoteAndAnswers() {
//changes the text of quotes, answer options, the question count and the point count
  $( '.question-page' ).ready(function() {
    $('input[name="answer-option"]').prop('checked', false);
    $('span[class="quote"]').text(questionAnswerData[questionNumber].quote);
    $('span[class="answer1"]').text(questionAnswerData[questionNumber].answerOptions[0].answer);
    $('span[class="answer2"]').text(questionAnswerData[questionNumber].answerOptions[1].answer);
    $('span[class="answer3"]').text(questionAnswerData[questionNumber].answerOptions[2].answer);
    $('span[class="answer4"]').text(questionAnswerData[questionNumber].answerOptions[3].answer);
    $('span[class="answer4"]').text(questionAnswerData[questionNumber].answerOptions[3].answer);
    $('span[class="question-number"]').text(questionNumber+1);
    $('span[class="user-points"]').text(points);
  });
  }
  
function submitAnswer() {
//when an answer is submitted, determines if the answer is correct.
    $('form').on('submit', function(event) {
     event.preventDefault();
     let correctAnswer= questionAnswerData[questionNumber].answerOptions.map((el) => el.correct).indexOf(true);
     let userAnswer= $('input[name=answer-option]:checked').val();
     
     $('.answer-options').find('div.selected-option').removeClass('selected-option');
     if (correctAnswer == userAnswer) {
       handleCorrectAnswer();
     } else {
       handleIncorrectAnswer();
       $('span[class="correct-answer"]').text(questionAnswerData[questionNumber].answerOptions[correctAnswer].answer)
     }
    });
}

function handleCorrectAnswer() {
     //if correct, add a point and show the correct feedback div
     addAPoint();
     $( '.feedback-page-correct' ).show();
     $('.question-page').hide();
}

function handleIncorrectAnswer() {
     $( '.feedback-page-incorrect' ).show();
     $('.question-page').hide();
}



//-------------Next Question---------------------

function nextQuestionNumber() {
//increments the question number
  questionNumber ++;
}

function addAPoint() {
//increments points
  points ++;
}

function goToNextQuestion() {
//the next button will take the user to the next question or the final page 
  $('.feedback').on('click', '.next-question-btn', function(event) {
    event.preventDefault();
  if (questionNumber+1 < questionAnswerData.length) {
      nextQuestionNumber();
      renderQuestionPage();
  } 
  else {
      renderFinalPage();
  }
  });
}


//-------------Final Page--------------//


function restartQuiz() {
//restart the quiz (reload)
  $('main').on('click', '.restart-btn', function (event) {
    location.reload();
  });
}

function renderFinalPage() {
//shows the final page
  $( '.final-page' ).ready(function() {
  $('span[class="final-score"]').text(points);
  $('.final-page').show()
  $( '.feedback' ).hide();
  $('.question-page').hide();
  });
}

function handleQuiz() {
//handles all of the actions required to take the quiz
  startQuiz();
  submitAnswer();
  goToNextQuestion();
  restartQuiz();
}

$(handleQuiz);

