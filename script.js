/* prvo stavljamo konstantu s imenom varijable (question) */
/* moramo postaviti pitanja i ispod pitanja stavljamo odgovore oni koji su krivi stavljamo "false" oni sto su tocni stavljamo "true" (boolean) */
const question = [
  {
    question:
      "What year did the Titanic sink into the Atlantic Ocean on April 15, on its maiden voyage from Southampton?",
    answers: [
      { text: "1920", correct: false },
      { text: "1950", correct: false },
      { text: "1912", correct: true },
      { text: "1913", correct: false },
    ],
  },
  {
    question: "Which is the smallest city in the world?",
    answers: [
      { text: "Pisa", correct: false },
      { text: "Sidney", correct: false },
      { text: "Hum", correct: true },
      { text: "Napoli", correct: false },
    ],
  },
  {
    question: "Which is the biggest river in the World?",
    answers: [
      { text: "Dunav", correct: false },
      { text: "Amazona", correct: true },
      { text: "Kongo", correct: false },
      { text: "Niger", correct: false },
    ],
  },
  {
    question: "In what year was The Godfather first published?",
    answers: [
      { text: "1980", correct: false },
      { text: "1972", correct: true },
      { text: "1973", correct: false },
      { text: "1975", correct: false },
    ],
  },
  {
    question:
      "In which Mediterranean country was born the film director Frank Capra, known for the film It's a Wonderful Life?",
    answers: [
      { text: "Italy", correct: true },
      { text: "Germany", correct: false },
      { text: "Turkey", correct: false },
      { text: "Austria", correct: false },
    ],
  },
  {
    question: "Who was the BBC's 'Sports Personality of the Year' in 2001?",
    answers: [
      { text: "Kobe Bryant", correct: false },
      { text: "Tracy McGrady", correct: false },
      { text: "Pele", correct: false },
      { text: "David Beckham", correct: true },
    ],
  },
  {
    question: "How many hearts does an octopus have?",
    answers: [
      { text: "One", correct: false },
      { text: "Two", correct: false },
      { text: "Three", correct: true },
      { text: "Four", correct: false },
    ],
  },
];
/* dodajemo 3 ista reda samo mijenjamo imena po id vrijednosti */
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-button");
const nextButton = document.getElementById("next-btn");
/* kada pokrenemo kivz dodajemo broj pitanja i nas postotak se mijenja s tocnim ili pogrsnim odgovorom   */
let currentQuestionIndex = 0;
let score = 0;
/* kada pokrenemo kviz trebao bi poceti od pocetka */
function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  /* na kraju cemo promijniti tekst na restart kviz ili ponovno pocmi kviz. */
  nextButton.innerHTML = "Next";
  showQuestion();
}
/* pokazuje pitanja i odgovor i poredani su od pocetka  */
function showQuestion() {
  resetState();
  let currentQuestion = question[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + "." + currentQuestion.question;

  /* ovdje sam dodao da se odabere trenutno pitanje i odgovor na trenutno pitanje */
  currentQuestion.answers.forEach((answer) => {
    /* ovdje sam dodao element za kreiranje dokumenta i gumb za naziv dokumenta   */
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}
/* ukloni ce sve prijasnje odgovore */
function resetState() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}
/* kada stisnemo na botun dodat ce selektirani botun element s varijablom selektirani botun i ako je tocan dodat ce klasu s imenon tocno a ako je netocno onda ce dodat klasu s imenom netocno  */
function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }
  /* dodali smo array i on ce provjeriti da li je  tvrdnja tocna ako je ddoat ce klasu tocno a ako nije dodat ce klasu krivo */
  Array.from(answerButtons.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  /* botun za sljedece pitanje */
  nextButton.style.display = "block";
}
/* pokazuje koliki nam je rezultat  */
function showScore() {
  resetState();
  questionElement.innerHTML = `You scored ${score} out of ${question.length}!`;
  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "block";
}
/* mozemo kliknuti na botun koji nas vodi na sljedece pitanje */
function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < question.length) {
    showQuestion();
  } else {
    showScore();
  }
}
/* kada dodemo do kraja kviza mozemo stisnuti botun za pokretanje ponovnog igranja */
nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < question.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

/* pozivamo funkciju za startanje kviza */
startQuiz();
