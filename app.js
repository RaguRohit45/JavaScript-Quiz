"use strict";
const questions = [
    {
        question: "What is the correct way to declare a JavaScript variable?",
        options: ["var x = 10;", "variable x = 10;", "let $ = 10;", "const x;"],
        correctAnswer: 0
    },
    {
        question: "Which of the following is a JavaScript data type?",
        options: ["str", "integer", "float", "var"],
        correctAnswer: 3
    },
    {
        question: "How do you define a function in JavaScript?",
        options: ["function myFunc() {}", "def myFunc():", "func myFunc[]", "function:myFunc()"],
        correctAnswer: 0
    },
    {
        question: "Which method is used to parse a JSON string into an object?",
        options: ["JSON.parse()", "JSON.string()", "JSON.convert()", "JSON.toObject()"],
        correctAnswer: 0
    },
    {
        question: "What does the '===' operator do in JavaScript?",
        options: ["Checks equality without type conversion", "Checks equality with type conversion", "Assigns a value", "None of the above"],
        correctAnswer: 0
    },
    {
        question: "Which of the following is used to create a new object in JavaScript?",
        options: ["var obj = {}", "var obj = []", "var obj = new Object()", "All of the above"],
        correctAnswer: 2
    },
    {
        question: "Which statement is used to stop a loop in JavaScript?",
        options: ["exit", "break", "stop", "return"],
        correctAnswer: 1
    },
    {
        question: "Which function is used to remove the last element from an array in JavaScript?",
        options: ["pop()", "shift()", "slice()", "splice()"],
        correctAnswer: 0
    },
    {
        question: "Which of the following is NOT a JavaScript framework?",
        options: ["Angular", "React", "Vue", "Laravel"],
        correctAnswer: 3
    },
    {
        question: "What will the following code log? `console.log(typeof NaN);`",
        options: ["number", "NaN", "undefined", "object"],
        correctAnswer: 0
    }
];
let currentQuestionIndex = 0;
let score = 0;
const loadQuestion = () => {
const questionContainer = document.getElementById('question');
const optionsContainer = document.getElementById('options');
const progressContainer = document.getElementById('progress');
const currentQuestion = questions[currentQuestionIndex];
questionContainer.textContent = currentQuestion.question;
optionsContainer.innerHTML = '';
currentQuestion.options.forEach((option, index) => {
    const optionElement = document.createElement('div');
    optionElement.innerHTML = `
    <input type="radio" name="answer" id="option-${index}" value="${index}"><label for="option-${index}">${option}</label>
    `;
    optionsContainer.appendChild(optionElement);
});
progressContainer.textContent = `Question ${currentQuestionIndex + 1} of ${questions.length}`;
};

const selectAnswer = () => {
const selectedOption = document.querySelector('input[name="answer"]:checked');
if (selectedOption) {
    const selectedAnswerIndex = parseInt(selectedOption.value);
    const currentQuestion = questions[currentQuestionIndex];
    if (selectedAnswerIndex === currentQuestion.correctAnswer) {
    score++;
    }
}
};
const nextQuestion = () => {
selectAnswer();
if (currentQuestionIndex < questions.length - 1) {
    currentQuestionIndex++;
    loadQuestion();
    document.getElementById('prev-btn').disabled = false;
}
if (currentQuestionIndex === questions.length - 1) {
    document.getElementById('next-btn').textContent = "Finish";
}
};

const prevQuestion = () => {
if (currentQuestionIndex > 0) {
    currentQuestionIndex--;
    loadQuestion();
}
if (currentQuestionIndex === 0) {
    document.getElementById('prev-btn').disabled = true;
}
};
const showResults = () => {
const resultContainer = document.getElementById('result');
const scoreElement = document.getElementById('score');
const feedbackElement = document.getElementById('feedback');
scoreElement.innerHTML = `Your Score: ${score+1} out of ${questions.length}`;
if (score / questions.length > 0.8) {
    feedbackElement.innerHTML = "Excellent!";
} else if (score / questions.length > 0.5) {
    feedbackElement.innerHTML = "Good job!";
} else {
    feedbackElement.innerHTML = "Keep practicing!";
}
document.getElementById('quiz-container').style.display = 'none';
resultContainer.classList.remove('hidden');
};
document.getElementById('next-btn').addEventListener('click', () => {
if (currentQuestionIndex === questions.length - 1) {
    showResults();
} else {
    nextQuestion();
}
});

document.getElementById('prev-btn').addEventListener('click', prevQuestion);

document.getElementById('retry-btn').addEventListener('click', () => {
currentQuestionIndex = 0;
score = 0;
document.getElementById('quiz-container').style.display = 'block';
document.getElementById('result').classList.add('hidden');
loadQuestion();
document.getElementById('prev-btn').disabled = true;
document.getElementById('next-btn').textContent = "Next";
});
loadQuestion();
      
  