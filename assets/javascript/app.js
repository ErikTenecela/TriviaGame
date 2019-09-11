let counter = 30; //The timer set
let currentQuestion = 0; //In the Array the question will start off 0
let score = 0; //How many the user input is correct
let lost = 0; //Every time the user input the wrong answer
let timer; //

// if time is up go to the next question
function nextQuestion() {
    const isQuestionOver = (quizQuestion.length -1) === currentQuestion;
    if(isQuestionOver) {
        console.log('Game OVERRRR!!!')
        displayResult();
    }else {
        currentQuestion++;
    loadQuestion();
    }
    
}



function timeUp() {
    clearInterval(timer);

    lost++;

    nextQuestion();
}


function countDown() {
    counter--;

    $('#time').html('Timer: ' + counter)

    if(counter === 0) {
        timeUp();
    }
}









//display the choices and the question into the browser
function loadQuestion() {
    counter = 30;
    timer = setInterval(countDown, 1000)

    const question = quizQuestion[currentQuestion].question;
    const choices = quizQuestion[currentQuestion].choices;
    

    $('#time').html('Timer:' + counter )
    $('#game').html(`
    <h4>${question}</h4>
    ${loadChoices(choices)}
    `)

}

function loadChoices (choices) {
    let result = '';

    for (let i = 0; i < choices.length; i++) {
        result += `<p class = "choice" data-answer = "${choices[i]}">${choices[i]}</p>`
    }
    return result;
}

$(document).on('click','.choice',function() {
    clearInterval(timer);
    const selectAnswer = $(this).attr('data-answer');
    const correctAnswer = quizQuestion[currentQuestion].correctAnswer;

    if(correctAnswer === selectAnswer) {
        //user win
        score++;
        nextQuestion();
        console.log('win')
    } else {
        lost++;
        nextQuestion();
        console.log('lost')
    }
    
})

function displayResult () {
    const result = `
    <p>You get ${score} questions(s) right </p>
    <p>You missed ${lost} questions(s) </p>
    <p>total questions ${quizQuestion.length} questions(s) right </p>
    <button class = "btn btn-primary" id = "reset">Reset Game</button>
    `;

    $('#game').html(result)
}
$(document).on('click','#reset', function () {
    counter = 5;
    currentQuestion = 0;
    score = 0;
    lost =0;
    timer = null;

    loadQuestion();
})

loadQuestion();