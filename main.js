// All answer options
const option1 = document.getElementById("option1"),
  option2 = document.getElementById("option2"),
  option3 = document.getElementById("option3"),
  option4 = document.getElementById("option4");
// All our options
const optionElements = document.querySelectorAll(".option");
const question = document.getElementById("question"), //question itself
  numberOfQuestion = document.getElementById("number-of-question"), //question number
  numberOfAllQuestions = document.getElementById("number-of-all-questions"); // amount of all questions

let indexOfQuestion, //index of current question
  indexOfPage = 0; // index of page

const answersTracker = document.getElementById("answers-tracker"), //tracker wrapper
  btnNext = document.getElementById("btn-next"); //next button

let score = 0; // quiz result

const correctAnswer = document.getElementById("correct-answer"), //amount of correct answers
  numberOfAllQuestions2 = document.getElementById("number-of-all-questions-2"), //amount of all questions in modal window
  btnTryAgain = document.getElementById("btn-try-again"); //start quiz again button

const questions = [
  {
    question: "Как вирахувати відсоток від числа в JS?",
    options: ["Так не можна зробити", "Оператор : %", "Помножити на кількість відсотків та поділити на 100", "Викликати метод findPercent()"],
    rightAnswer: 2,
  },
  {
    question: "Скільки буде 13 + 7?",
    options: ["20", "137", "error", "undefined"],
    rightAnswer: 0,
  },
  {
    question: "На JS не можна писати?",
    options: ["Ігри", "Скріпти для сайтів", "Десктопні застосунки", "Немає правильної відповіді"],
    rightAnswer: 3,
  },
  {
    question: "За скільки днів було створено JS?",
    options: ["10", "Невідомо", "250", "15"],
    rightAnswer: 0,
  },
];

numberOfAllQuestions.innerHTML = questions.length; // display number of all questions

const load = () => {
  question.innerHTML = questions[indexOfQuestion].question; // question itself
  option1.innerHTML = questions[indexOfQuestion].options[0];
  option2.innerHTML = questions[indexOfQuestion].options[1];
  option3.innerHTML = questions[indexOfQuestion].options[2];
  option4.innerHTML = questions[indexOfQuestion].options[3];
  numberOfQuestion.innerHTML = indexOfPage + 1; // number of current page
  indexOfPage++;
};

let completedAnswers = []; //completed answers array

const randomQuestion = () => {
  let randomNumber = Math.floor(Math.random() * questions.length);
  let hitDublicate = false; // checking same questions
  if (indexOfPage == questions.length) {
    quizOver();
  } else {
    if (completedAnswers.length > 0) {
      completedAnswers.forEach((item) => {
        if (item == randomNumber) {
          hitDublicate = true;
        }
      });
      if (hitDublicate == true) {
        randomQuestion();
      } else {
        indexOfQuestion = randomNumber;
        load();
      }
    }
    if (completedAnswers.length == 0) {
      indexOfQuestion = randomNumber;
      load();
    }
  }
  completedAnswers.push(indexOfQuestion);
};

const checkAnswer = (el) => {
  if (el.target.dataset.id == questions[indexOfQuestion].rightAnswer) {
    el.target.classList.add("correct");
    updateAnswerTracker("correct");
    score++;
  } else {
    el.target.classList.add("wrong");
    updateAnswerTracker("wrong");
  }
  disabledOptions();
};
const disabledOptions = () => {
  optionElements.forEach((item) => {
    item.classList.add("disabled");
    if (item.dataset.id == questions[indexOfQuestion].rightAnswer) {
      item.classList.add("correct");
    }
  });
};

const enabledOptions = () => {
  optionElements.forEach((item) => {
    item.classList.remove("disabled", "correct", "wrong");
  });
};

const answerTracker = () => {
  questions.forEach(() => {
    const div = document.createElement("div");
    answersTracker.appendChild(div);
  });
};

const updateAnswerTracker = (status) => {
  answersTracker.children[indexOfPage - 1].classList.add(`${status}`);
};

const validate = () => {
  if (!optionElements[0].classList.contains("disabled")) {
    alert("Select answer");
  } else {
    randomQuestion();
    enabledOptions();
  }
};

btnNext.addEventListener("click", () => {
  validate();
});

for (option of optionElements) {
  option.addEventListener("click", (e) => checkAnswer(e));
}

const quizOver = () => {
  document.querySelector(".quiz-over-modal").classList.add("active");
  correctAnswer.innerHTML = score;
  numberOfAllQuestions2.innerHTML = questions.length;
};

const tryAgain = () => {
  window.location.reload();
};

btnTryAgain.addEventListener("click", tryAgain);

window.addEventListener("load", () => {
  randomQuestion();
  answerTracker();
});
