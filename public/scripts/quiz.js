const quizData = [];

const card = document.getElementById("card");
const answerEls = document.querySelectorAll(".answer");
const questionEl = document.getElementById("question");
const a_text = document.getElementById("a_text");
const b_text = document.getElementById("b_text");
const c_text = document.getElementById("c_text");
const d_text = document.getElementById("d_text");
const cardBtn = document.getElementById("btn_card");
const totalQuestionsEl = document.querySelector(".total_questions");
const backgroundContainer = document.querySelector(".container");

let currentQuiz = 0;
let score = 0;
let category;

initQuiz();

async function getQuizData() {
  const params = new URLSearchParams(document.location.search.substring(1));
  const queryCategory = (params.get("category") || "").toLowerCase();
  const queryTestId = (params.get("test") || "").toLowerCase();
  if (
    queryCategory === "biology" ||
    queryCategory === "computerscience" ||
    queryCategory === "math" ||
    queryCategory === "socialstudies"
  ) {
    category = queryCategory;
  } else {
    // default
    category = "computerscience";
  }

  const res = await fetch(
    `/api/getquestions?category=${category}&test=${queryTestId}`
  );
  const data = await res.json();
  return data;
}

async function initQuiz() {
  let questions = await getQuizData();
  quizData.length = 0;
  quizData.push(...questions);

  loadQuiz();
}

function loadQuiz() {
  deselectAnswers();
  backgroundContainer.classList.remove(
    "main",
    "math",
    "biology",
    "computerscience",
    "socialstudies"
  );
  backgroundContainer.classList.add(category);
  cardBtn.classList.remove("hide");
  const curTest = quizData[currentQuiz];

  questionEl.innerText = curTest.question;
  a_text.innerText = curTest.a;
  b_text.innerText = curTest.b;
  c_text.innerText = curTest.c;
  d_text.innerText = curTest.d;
  totalQuestionsEl.innerText = quizData.length;
}
function deselectAnswers() {
  answerEls.forEach((answerEl) => {
    answerEl.checked = false;
  });
}

function getSelected() {
  let answer;
  answerEls.forEach((answerEl) => {
    if (answerEl.checked) {
      answer = answerEl.id;
    }
  });
  return answer;
}

cardBtn.addEventListener("click", () => {
  const answer = getSelected();
  if (answer) {
    if (answer === quizData[currentQuiz].correct) {
      score++;
    }
    currentQuiz++;
    if (currentQuiz < quizData.length) {
      loadQuiz();
    } else {
      cardBtn.classList.add("hide");
      card.style.textAlign = "center";
      card.style.padding = "60px";
      card.innerHTML = `
        <h2>You answered ${score}/${quizData.length} questions correctly</h2>
        <button onClick="location.reload()">Reload</button>`;
    }
  }
});
