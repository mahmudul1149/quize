
    const quize = [
  {
    title: "What is the past form of 'eat'?",
    options: ['eat', 'ate', 'eaten', 'have ate'],
    answer: 'ate',
  },
  {
    title: 'Which sentence is present continuous tense?',
    options: ['I eat rice', 'I am eating rice', 'I have eaten rice', 'I have been eating rice for 1 year'],
    answer: 'I am eating rice',
  },
  {
    title: 'Which sentence is present perfect tense?',
    options: ['I eat rice', 'I am eating rice', 'I have eaten rice', 'I have been eating rice for 1 year'],
    answer: 'I have eaten rice',
  },
  {
    title: 'Which sentence is present perfect continuous tense?',
    options: ['I eat rice', 'I am eating rice', 'I have eaten rice', 'I have been eating rice for 1 year'],
    answer: 'I have been eating rice for 1 year',
  },
  {
    title: 'Which sentence is past continuous tense?',
    options: ['I eat rice', 'I was eating rice', 'I have eaten rice', 'I have been eating rice for 1 year'],
    answer: 'I was eating rice',
  },
  {
    title: 'Which sentence is past perfect tense?',
    options: ['I eat rice', 'I was eating rice', 'I have eaten rice', 'I have been eating rice for 1 year'],
    answer: 'I have eaten rice',
  },
  {
    title: 'Which sentence is past perfect continuous tense?',
    options: ['I eat rice', 'I was eating rice', 'I have eaten rice', 'I have been eating rice for 1 year'],
    answer: 'I have been eating rice for 1 year',
  },
  {
    title: 'Which sentence is future continuous tense?',
    options: ['I eat rice', 'I will be eating rice', 'I have eaten rice', 'I have been eating rice for 1 year'],
    answer: 'I will be eating rice',
  },
  {
    title: 'Which sentence is future perfect tense?',
    options: ['I eat rice', 'I will be eating rice', 'I will have eaten rice', 'I have been eating rice for 1 year'],
    answer: 'I will have eaten rice',
  },
  {
    title: 'Which sentence is future perfect continuous tense?',
    options: [
      'I eat rice',
      'I will be eating rice',
      'I will have eaten rice',
      'I will have been eating rice for 1 year',
    ],
    answer: 'I will have been eating rice for 1 year',
  },
];


const givenAnswer = [];


const questionContainer = document.querySelector('.question-container');
let output = '';

quize.forEach((question, index) => {
  let singleQuestion = `<div class="question-group">
    <h4 class="question-heading">
      <span id="qid">${index + 1}.</span>
      <span id="question">${question.title}</span>
    </h4>

    <div class="option-block-container" id="questionNo${index + 1}">`;

  question.options.forEach((option, optionIndex) => {
    singleQuestion += `<div class="option-block">
      <label c><input type="radio"  name="option${index + 1}" id="ques${index + 1}_opt${
      optionIndex + 1
    }" value="${option}" /><span class="radio">${option}</span></label>
    </div>`;
  });

  singleQuestion += `</div></div>`;
  output += singleQuestion;
});

document.getElementById('mcq-container').innerHTML = output;

// Implement Event Listener for options
const allQuestionOptionsBlock = document.querySelectorAll('.option-block-container');

allQuestionOptionsBlock.forEach((element) => {
  let quesOptions = document.querySelectorAll(`#${element.attributes.id.value} input[type=radio]`);
  quesOptions.forEach((quesOption) =>
    quesOption.addEventListener('change', () => {
      let givenQuestionAnswer = quesOption.value;

      let displayQuestionId = quesOption.id.split('_')[0].replace('ques', '');
      let score = quize[displayQuestionId - 1].answer === givenQuestionAnswer ? 1 : 0;

     
      const findDuplicateQuesIndex = givenAnswer.findIndex((ans) => ans.ques === displayQuestionId);
      if (findDuplicateQuesIndex !== -1) {
        givenAnswer[findDuplicateQuesIndex].score = score;
      } else {
        givenAnswer.push({ ques: displayQuestionId, score: score });
      }

     
      const selectedOptionQuesElementId = quesOption.closest('.option-block-container').id;
      const selectedQuestionOptions = document.querySelectorAll(`#${selectedOptionQuesElementId} input[type=radio]`);

 
      selectedQuestionOptions.forEach((selectQuesOption) => {
        if (selectQuesOption.checked) {
          selectQuesOption.disabled = false;
        } else {
          selectQuesOption.disabled = true;
        }
      });
    })
  );
});

// Countdown Functionality Implement
const countDown = document.querySelector('#clockDiv');

let countDownInterval;
let secondsLeftms;
let endTime;

function settingTimer() {
  let countDownTime = 10; //10 minute countdown timer
  countDownTime = countDownTime * 60000;

  // Get current time in milliseconds
  const now = Date.now();
  // Calculate end time
  endTime = now + countDownTime;

  // Activate countdown
  setCountDown(endTime);

  countDownInterval = setInterval(() => {
    setCountDown(endTime);
  }, 1000);
}

// setCountDown function
const setCountDown = (endTime) => {
  // calculate how many milliseconds is left to reach endTime from now
  secondsLeftms = endTime - Date.now();
  // convert it to seconds
  const secondsLeft = Math.round(secondsLeftms / 1000);

  // calculate the minutes and seconds
  let minutes = Math.floor(secondsLeft / 60);
  let seconds = secondsLeft % 60;

  // adding an extra zero if digits is < 10
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (seconds < 10) {
    seconds = `0${seconds}`;
  }

  // stopping the timer if the time is up
  if (secondsLeft < 0) {
    clearInterval(countDownInterval);
    countDown.innerHTML = '00 : 00 : 00';
    return;
  }

  countDown.innerHTML = ` 00:${minutes}:${seconds}`;
};

// Setting the countdown timer
settingTimer();

// Setting the Timeout Functionality (Timeout after 10 minute (10*60*1000))
setTimeout(() => {
  clearInterval(countDownInterval);
  window.location.href = 'timeout.html';
}, 600000);

// When User forcefully finish the exam
document.getElementById('exam_finish').addEventListener('click', () => {
  clearInterval(countDownInterval);

  let finalScore = givenAnswer.reduce((accumulator, curValue) => {
    return accumulator + curValue.score;
  }, 0);

  localStorage.setItem('finalScore', finalScore);
  window.location.href = 'result.html';
});
