//Quiz jquery functions

let questionNumber = 0;//setting initial value of question number and score to zero;
let score = 0;

/* GENERATING QUESTION NUMBER */
function generateQuestion() {

    //console.log("generating question")
    if (questionNumber < QUIZ.length) {
        return `<h3>${QUIZ[questionNumber].question}</h3>
        <form>
          <fieldset>
          <label class="ans">
          <input type="radio"  value="${QUIZ[questionNumber].options[0]}" name="answer" required>
          ${QUIZ[questionNumber].options[0]}
          </label><br>
          <label class="ans">
          <input type="radio" value="${QUIZ[questionNumber].options[1]}" name="answer" required>
          ${QUIZ[questionNumber].options[1]}
          </label><br>
          <label class="ans">
          <input type="radio" value="${QUIZ[questionNumber].options[2]}" name="answer" required>
          ${QUIZ[questionNumber].options[2]}
          </label><br>
          <label class="ans">
          <input type="radio" value="${QUIZ[questionNumber].options[3]}" name="answer" required>
          ${QUIZ[questionNumber].options[3]}
          </label>
          </fieldset>
          <div class="submit"><button type="submit" class="button2">Submit</button></div>
          </form>`
    }
    else {
        renderFinalResults();
        restartQuiz();
    }
}


/* WHEN USER CLICKS ON START  */
function startQuiz() {
    $(".start").on("click", ".button1", function (event) {
        $(".start").fadeOut(1000);
        questionScoreValue(); //displays question number and score 
        renderQuestion();//get the question
        $('.questionNumber').text(1);
    }
    )
};

function questionScoreValue() {
    $(".question-score").html(`<ul>
          <li>Question: <span class="questionNumber">${questionNumber}</span>/10</li>
          <li>Score: <span class="score">${score}</span></li>
        </ul>`)
}

function renderQuestion() {
    //console.log("it works")
    $(".question-ans").html(generateQuestion());
}

function updateQuestionNumber() {
    questionNumber++;
    if (questionNumber < 10) {
        $(".questionNumber").text(questionNumber + 1)
    };
}

function updateScore() {
    score++;
    $(".score").text(score);
    //console.log(`q ${questionNumber}s ${score}`)
}


/* WHEN USER CLICKS THE SUBMIT BUTTON */
function userSubmit() {
    $(".question-ans").on("submit", function (event) {
        event.preventDefault();
        $(".question-ans").hide();
        let answerSelected = $('input:checked');
        let userAnswer = answerSelected.val();
        let correctAnswer = `${QUIZ[questionNumber].answer}`;
        //console.log(userAnswer);
        if (userAnswer === correctAnswer) {
            rightAnswer();
            updateScore();//updates score
            $('input:checked') = null;
        }
        else
            wrongAnswer(correctAnswer);
    });
}

/* WHEN USER GETS THE ANSWER CORRECT*/
function rightAnswer() {

    $(".rightAnswer").show('fast');
    $(".rightAnswer").html(
        `<div class="feedback-right ">
        <div class="feedback-img"><img src="https://assets.about.me/background/users/d/o/w/downloadmxplayer_1530775599_739.jpg" alt="correct"/>
        </div>
        <p>You got it Right.</p>
      <button type=button class="button3" id="button3">Next</button>
    </div>`
    );
}

/* WHEN USER GETS THE ANSWER WRONG*/
function wrongAnswer(correctans) {
    $(".wrongAnswer").show('fast');
    $(".wrongAnswer").html(
        `<div class="feedback-wrong">
        <div class="feedback-img"><img src="https://images-na.ssl-images-amazon.com/images/I/317pU-9aCXL._SX425_.jpg" alt="incorrect"/>
      </div>
      <p><b>Incorrect.</b><br>the correct answer is <span>"${correctans}"</span></p>
      <button type=button class="button3" >Next</button></div>`
    );
}
/* WHEN USER CLICKS THE NEXT  BUTTON */
function nextQuestion() {
    $(".rightAnswer ,.wrongAnswer").on("click", ".button3", function (event) {
        //console.log("works")
        updateQuestionNumber();
        renderQuestion();
        $(".rightAnswer, .wrongAnswer").hide();
        $(".question-ans").show('slow');
        userSubmit();

    });
}

/* FINAL RESULTS PAGE */
function renderFinalResults() {
    $(".question-score").hide();
    $(".question-ans").remove();
    $(".restart").html(
        `<h3>Final Score : <span class="scoreFinal">${score}</span>/10</h3>
      <div class="finalScore">
        <div class="finalScore-img"><img src="https://proxy.duckduckgo.com/iu/?u=https%3A%2F%2Fs-media-cache-ak0.pinimg.com%2F736x%2F2d%2F9a%2F50%2F2d9a500430e9d47186be8f6b4c7ae6f1.jpg&f=1" alt="final"/>
        </div>
        <p><b>Try again.</b><br></p>
      </div>
        <div class="restartButton"><button type=button class="button4" >Restart</button></div>`

    );
}

/* WHEN USER CLICKS THE RESTART BUTTON */
function restartQuiz() {
    $(".restart").on("click", ".button4", function (event) {
        location.reload();//loads the start page again
    });
    /* WHEN USER CLICKS THE logo */
    $("header").on("click", ".logo", function (event) {
        location.reload();//loads the start page again
    });
}

/*______________________________QUIZ PAGE FUNCTIONS ________________________________.*/
function quizApp() {
    startQuiz();
    userSubmit();
    nextQuestion();
    restartQuiz();
}

$(quizApp);
