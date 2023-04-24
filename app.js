
const quiz = [
  {
    q:' Which month comes right before june ?',
    option:['May','September','July','August'],
    answers:0
  },
  
  {
      q:' Which color is banana ?',
      option:['red','yellow','white','blue'],
      answers:1
    },
  
    {
      q:'2 + 4 = 7 ?',
      option:['true','false'],
      answers:1
    },
  
    {
      q:' What time of the day do we have breakfast ?',
      option:['in the afternoon','in the evening','in the morning'],
      answers:2
    },
  
    {
      q:' What is 22 + 6 ?',
      option:['99','56','16','28'],
      answers:3
    },
  
    {
      q:' What tool is this ?',
      option:['fishing','farming','stitching','booking'],
      answers:2,
      img: '/scissors.png'
    },
  
    {
      q:' The sign represent what ?',
      option:['correct','wrong','false','none'],
      answers:0,
      img: '/correct.png'
    },
  
    {
      q:' What is this ?',
      option:['Heart','kidney','twitter','facebook'],
      answers:0,
      img: '/Heart_icon.png'
    },
  
    {
      q:' What is todays date ?',
      option:['in the afternoon','in the evening','in the morning'],
      answers:2
    },
  
    {
      q:' Another name for Breakfast ?',
      option:['heartbreak','visual','None'],
      answers:0
    },
  ]


const questionNumber = document.querySelector(".question-number");
const questionText = document.querySelector(".question-text");
const optionContainer = document.querySelector(".option-container");
const answersIndicatorContainer = document.querySelector(".answer-indicator");
const homeBox = document.querySelector(".Home-box");
const quizBox = document.querySelector(".quiz-box");
const resultBox = document.querySelector(".result-box");
const eventEl = document.querySelector(".event");

const questionLimit = 5;
//change quiz.length to questionLimit
let questionCounter = 0;
let currentQuestion;
let availableQuestions = [];
let availableOption = [];
let correctAnswers = 0;
let attempt = 0;


function setAvailableQuestions(){
  const totalQuestion = quiz.length;
  for (let i = 0; i < totalQuestion; i++) {
    availableQuestions.push(quiz[i])
    }
}

function getNewQuestion(){
  questionNumber.innerHTML = "Question " + (questionCounter + 1) + " of " + questionLimit;

   const questionIndex = availableQuestions[Math.floor(Math.random()
     * availableQuestions.length)]
  currentQuestion = questionIndex;
  questionText.innerHTML = currentQuestion.q;

  const index1 = availableQuestions.indexOf(questionIndex);
  availableQuestions.splice(index1,1)

  if(currentQuestion.hasOwnProperty("img")){
    const img = document.createElement("img");
    img.src = currentQuestion.img;
    questionText.appendChild(img);
  }

  
const optionLen = currentQuestion.option.length;

optionContainer.innerHTML = '';

let animationDelay = 0.15;

 for (let i=0; i<optionLen; i++) {
  availableOption.push(i);
  }

  for (let i=0; i<optionLen; i++) {
    const optonIndex = availableOption[Math.floor(Math.random() * 
      availableOption.length)]

    const index2 = availableOption.indexOf(optonIndex);
    availableOption.splice(index2,1);

    const option = document.createElement("div");
    option.innerHTML = currentQuestion.option[optonIndex];
    option.id = optonIndex;
    option.style.animationDelay = animationDelay + 's';
    animationDelay = animationDelay + 0.15;
    option.className = "option";
    optionContainer.appendChild(option);
    option.setAttribute("onclick","getResult(this)")
    
  }

  questionCounter++
}

function getResult(element){
  const id = parseInt(element.id);
 
  if(id === currentQuestion.answers){

   element.classList.add("correct");

   updateAnswerIndicator("correct");
   correctAnswers++;
  }
  else {
    element.classList.add("wrong");

    updateAnswerIndicator("wrong");

    const optionLen = optionContainer.children.length;
    for(let i=0; i<optionLen; i++){
      if(parseInt(optionContainer.children[i].id) === currentQuestion.answers){
        optionContainer.children[i].classList.add("correct");
      }
    }
  }
  attempt++;
  unclickableOptions();
}

function unclickableOptions(){
  const optionLen = optionContainer.children.length;
  for(let i=0 ; i<optionLen; i++){
    optionContainer.children[i].classList.add("already-answered");
  }
}

function answersIndicator(){
  answersIndicatorContainer.innerHTML = '';
  const totalQuestion = questionLimit;
  for(let i=0; i<totalQuestion; i++){
      const indicator = document.createElement("div");
      answersIndicatorContainer.appendChild(indicator);
  }
}

function updateAnswerIndicator(markType){
  answersIndicatorContainer.children[questionCounter-1].classList.add(markType)
}

function prev(){
 questionLimit - getNewQuestion();
}

function next(){
    if(questionCounter === questionLimit){
/*console.log("quiz over");*/
quizOver();
}
  else{
    getNewQuestion();
  }
}
 function quizOver(){
   quizBox.classList.add("hide");
   resultBox.classList.remove("hide");
   quizResult();
 }

function quizResult(){
  resultBox.querySelector(".total-question").innerHTML = questionLimit;
  resultBox.querySelector(".total-attempt").innerHTML = attempt;
resultBox.querySelector(".total-correct").innerHTML = correctAnswers;
  resultBox.querySelector(".total-wrong").innerHTML = attempt - correctAnswers;
  const percentage = (correctAnswers/questionLimit)*100;
  resultBox.querySelector(".percentage").innerHTML = percentage.toFixed(2) + "%";
  resultBox.querySelector(".total-score").innerHTML = correctAnswers + " / " + questionLimit;
}

function resetQuiz(){
  questionCounter = 0;
  correctAnswers = 0;
  attempt = 0;
  availableQuestions = [];
}

function tryAgainQuiz(){
  resultBox.classList.add("hide");
  quizBox.classList.remove("hide");

  resetQuiz();
  startQuiz();
}

function goToHome(){
  resultBox.classList.add("hide");
  homeBox.classList.remove("hide");
  resetQuiz();
}


function startQuiz(){
    homeBox.classList.add("hide");
    quizBox.classList.remove("hide");
    setAvailableQuestions();
    getNewQuestion();
    answersIndicator();
}


window.onload = function (){
  homeBox.querySelector(".total-questions").innerHTML = questionLimit;
  }
