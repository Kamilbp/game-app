// https://opentdb.com/api.php?amount=1&difficulty=easy&type=multiple

const _question = document.getElementById('question');
const _answers = document.querySelector('.answers-container');
const _questionNumber = document.getElementById('current-question');
const _checkBtn = document.getElementById('check-answer');
const _correctAnswersCount = document.getElementById('correct-count');
const resultWindow = document.getElementById('result-modal');
const _againBtn = document.getElementById('play-again');
let correct_answer = '';
const letters = ['A', 'B', 'C', 'D'];
let questionNumber = _questionNumber.textContent;
let correctAnswersCount = _correctAnswersCount.textContent;
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function eventListeners(){
  _checkBtn.addEventListener('click', checkAnswer);
  _againBtn.addEventListener('click', restart);
}

document.addEventListener('DOMContentLoaded', () =>{
  loadQuestion();
  eventListeners()
})

async function loadQuestion() {
  _checkBtn.disabled = true;
  
  const question = await fetch('https://opentdb.com/api.php?amount=1&difficulty=easy&type=multiple');
  const data = await question.json();
  showQuestion(data.results[0])
}


function showQuestion(data) {
  _questionNumber.innerHTML = questionNumber;
  console.log(data.question);
  _question.innerHTML = `${data.question}`;

  correctAnswer = data.correct_answer;
  let incorrectAnswer = data.incorrect_answers;
  incorrectAnswer.splice(getRandomInt(4),0,correctAnswer);
  console.log(incorrectAnswer);
  _answers.innerHTML = `
    ${incorrectAnswer.map((answer, index) =>`
      <li> ${letters[index]}. <span>${answer}</span></li>`).join('')}`;

  selectOption();

};

function selectOption(){
  
  _answers.querySelectorAll('li').forEach((option)=>
    option.addEventListener('click', () =>{
      _checkBtn.disabled = false;
      if (_answers.querySelector('.selected')){
        const active = _answers.querySelector('.selected');
        active.classList.remove('selected');
      }
      option.classList.add('selected')
    }
  ))
  console.log(correctAnswer);
}

function checkAnswer(){
  _checkBtn.disabled = true;
  if (_answers.querySelector('.selected')){
    let selectedAnswer = _answers.querySelector('.selected span').textContent;
    _answers.querySelectorAll('li').forEach((option)=> {
      let answerText = option.querySelector('span').textContent;
      if (answerText == correctAnswer){
        option.classList.add('correct');
        option.innerHTML += `<ion-icon name="checkmark-circle-outline"></ion-icon>`
      }
    });
    // const correct = _answers.querySelector('.selected');
    // correct.classList.add('correct');
    if (selectedAnswer != correctAnswer){
      let incorrect = _answers.querySelector('.selected');
      incorrect.classList.add('incorrect')
    }else{
      correctAnswersCount++;
    }
    // console.log(data.correct_answer)
  }else{
    _checkBtn.disabled = false;
  }
  loadNextQuestion();

}

function loadNextQuestion(){
  questionNumber++;
  
  if (questionNumber>5){
    setTimeout(()=>{
      _correctAnswersCount.innerHTML = correctAnswersCount;
      resultWindow.style.visibility = 'visible';
      resultWindow.style.opacity = '1';
      resultWindow.getElementsByClassName('modal')[0].style.marginTop = '0';
      // console.log(resultWindow.getElementsByClassName('modal')[0].style)
    },500)

  }else{
    setTimeout(()=>{
      loadQuestion();
    },500);
  }
}

function restart(){
  resultWindow.getElementsByClassName('modal')[0].style.marginTop = '-200%';
  resultWindow.style.visibility = 'hidden';
  resultWindow.style.opacity = '0';
  questionNumber = 1;
  correctAnswersCount = 0;
  _checkBtn.disabled=false;
  _questionNumber.innerHTML=0;
  loadQuestion();

}