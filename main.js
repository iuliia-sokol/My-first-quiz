// All answer options
const option1 = document.querySelector("option1"),
    option2 = document.querySelector("option2"),
    option3 = document.querySelector("option3"),
    option4 = document.querySelector("option4");
// All our options
const optionElements = document.querySelectorAll(".option");
const question = document.getElementById("question"),
  numberOfQuestion = document.getElementById("number-of-question"),
  numberofAllQuestions = document.getElementById("number-of-all-questions");

let indexOfQuestion, //index of current question
  indexOfPage = 0; // index of page

const answerTracker = document.getElementById("answers-tracker"),
  btnNext = document.getElementById("btn-next");

let score = 0; // quiz result

const correctAnswer = document.getElementById("correct-answer"),
  numberofAllQuestions2 = document.getElementById("number-of-all-questions-2"),
  btnTryAgain = document.getElementById("btn-try-again");

const questions = [
  {
    question: "Как вирахувати відсоток від числа в JS",
    options: ["Так не можна робити",
      "Оператор: %",
      "Помножити на кількість відсотків та поділити на 100",  
    "Викликати метод findPercent"],
    rightAnswer: 2,
  }
];

numberofAllQuestions.innerHTML = questions.length; // display number of all questions

const load = () => {
  question.innerHTML = questions[indexOfQuestion].question; // question itself
  option1.innerHTML = questions[indexOfQuestion].options[0];
  option2.innerHTML = questions[indexOfQuestion].options[1];
  option3.innerHTML = questions[indexOfQuestion].options[2];
  option4.innerHTML = questions[indexOfQuestion].options[3];
  numberofAllQuestions.innerHTML = indexOfPage + 1; //
  indexOfPage++;
};

let completedAnswers = [];

const randomQuestion = () => {
  let randomNumber = Math.floor(Math.random() * questions.length);
  let hitDublicate = false;
  if (indexOfPage == questions.length) {
    quizOver();
  } else {
    if (completedAnswers.length > 0) {
      completedAnswers.forEach(item => {
        if (item == randomNumber) {
          hitDublicate = true;
        }
      });
      if (hitDublicate) {
        randomQuestion();
      } else {
        indexOfQuestion = randomNumber;
        load();
      }
    };
    if (completedAnswers = 0) {
      indexOfQuestion = randomNumber;
      load();
    }
  };
  completedAnswers.push(indexOfQuestion);
};

const checkAnswer = el => {
  if (el.target.dataset.id == questions[indexOfQuestion].rightAnswer) {
    el.target.classList.add('correct');
    score++;
  } else {
    el.target.classList.add('wrong');
  }
  disabledOptions();
}
const disabledOptions = () => {
  optionElements.forEach(item => {
    item.classList.add('disabled');
    if (item.dataset.id == questions[indexOfQuestion].rightAnswer) {
      item.classList.add('correct');
    }
   })
 }

const enabledOptions = () => {
  optionElements.forEach(item => {
    item.classList.remove('disabled', 'correct', 'wrong');
  })
};

const answerTracker = () => {
  questions.forEach(() => {
    const div = document.createElement('div');
    answerTracker.appendChild('div');
  })
};

const updateAnswerTracker = status => {
  answerTracker.children[indexOfPage - 1].classList.add(`$status`);
};

const validate = () => {
  if (optionElements[].classList.contains('disabled')) {
    alert("Select answer");
  } else {
    randomQuestion();
    enabledOptions();
  }
};

btnNext.addEventListener('click', validate);


for (option of optionElements) {
  option.addEventListener('click', e => checkAnswer(e));
}


const quizOver = () => {
  document.querySelector('quiz-over-modal').classList.add('active');
  correctAnswer.innerHTML = score;
  numberofAllQuestions2.innerHTML = questions.length;
};

const tryAgain = () => {
  window.location.reload();
};

btnTryAgain.addEventListener('click', tryAgain);



window.addEventListener('load', () => {
  randomQuestion();
  answerTracker();
});