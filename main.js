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
    question: "Чому дорівнює швидкість світла?",
    options: ["400000 км/с", "300000 км/с", "500000 км/с", "Виміряти швидкість світла неможливо"],
    rightAnswer: 1,
  },
  {
    question: "Яка найбільша планета сонячної системи?",
    options: ["Юпітер", "Марс", "Сатурн", "Земля"],
    rightAnswer: 0,
  },
  {
    question: "Скільки супутників у Марса?",
    options: ["Жодного", "1", "4", "2"],
    rightAnswer: 3,
  },
  {
    question: "Яка тривалість доби на Місяці?",
    options: ["29,5 земних діб", "19,5 земних діб", "9,5 земних діб", "Збігається з земною добою"],
    rightAnswer: 0,
  },
  {
    question: "Оберіть правильне твердження про Плутон:",
    options: [
      "Плутон - восьма планета Сонячної системи",
      "Плутон було позбавлено статусу планети",
      "Плутон раніше був супутником Нептуна",
      "Температура поверхні Плутона більша за земну",
    ],
    rightAnswer: 1,
  },
  {
    question: "Яка планета Сонячної системи найбільш схожа на Землю?",
    options: ["Венера", "Марс", "Меркурій", "Нептун"],
    rightAnswer: 1,
  },
  {
    question: "Сонце за своїм типом є...",
    options: ["Нейтронною зорею", "Пульсаром", "Жовтим карликом", "Червоним гігантом"],
    rightAnswer: 2,
  },
  {
    question: "Галактики по відношенню одна до одної...",
    options: ["Наближаються", "Віддаляються", "Не рухаються", "Наука цього не знає"],
    rightAnswer: 1,
  },
  {
    question: "Юпітер на 90% cкладається з...",
    options: ["Води", "Гелію", "Водню", "Сірководню"],
    rightAnswer: 2,
  },
  {
    question: "Марс має червоний колір, тому що...",
    options: [
      "На Марсі значна вулканічна активність",
      "Сонячне світло підсвічує Марс червоним кольором",
      "Поверхня Марса вкрита червоною глиною",
      "Поверхня Марса містить велику кількість оксиду заліза",
    ],
    rightAnswer: 3,
  },
  {
    question: "В якому році було створено перший телескоп?",
    options: ["1608", "1812", "1732", "1500"],
    rightAnswer: 0,
  },
  {
    question: "На якій з планет Сонячної систем найдовша доба (243 земних доби)?",
    options: ["На Юпітері", "На Нептуні", "На Венері", "На Меркурії"],
    rightAnswer: 2,
  },
  {
    question: "Яка з цих зорей є найгарячішою?",
    options: ["Червона", "Жовта", "Білі", "Сині"],
    rightAnswer: 3,
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
    alert("Ой, так не можна! Щоб піти далі, потрібно відповісти на питання.");
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
