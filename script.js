const questions = [
    {
        question: "Welcher Planet ist der fünfte in unserem Sonnensystem?",
        answers: [
            { text: "Mars", correct: false },
            { text: "Jupiter", correct: true },
            { text: "Saturn", correct: false },
            { text: "Venus", correct: false },
        ]
    },
    {
        question: "Welche dieser Sprachen wird am meisten weltweit gesprochen?",
        answers: [
            { text: "Arabisch", correct: false },
            { text: "Spanisch", correct: false },
            { text: "Mandarin", correct: true },
            { text: "Deutsch", correct: false },
        ]
    },
    {
        question: "Wer schrieb das Buch 1984?",
        answers: [
            { text: "George Orwell", correct: true },
            { text: "Aldous Huxley", correct: false },
            { text: "Ray Bradbury", correct: false },
            { text: "Franz Kafka", correct: false },
        ]
    },
    {
        question: "Welches Element hat die chemische Bezeichnung 'Fe'?",
        answers: [
            { text: "Eisen", correct: true },
            { text: "Silber", correct: false },
            { text: "Gold", correct: false },
            { text: "Blei", correct: false },
        ]
    },
    {
        question: "Welches ist das zweitgrößte Land der Welt nach der Landfläche?",
        answers: [
            { text: "Russland", correct: false },
            { text: "China", correct: false },
            { text: "USA", correct: false },
            { text: "Kanada", correct: true },
        ]
    },
    {
        question: "Welches ist das größte Säugetier der Welt",
        answers: [
            { text: "Elefant", correct: false },
            { text: "Blauwal", correct: true },
            { text: "Giraffe", correct: false },
            { text: "Nashorn", correct: false },
        ]
    },
    {
        question: "Was ist die Hauptstadt von Australien?",
        answers: [
            { text: "Sydney", correct: false },
            { text: "Melbourne", correct: false },
            { text: "Canberra", correct: true },
            { text: "Brisbane", correct: false },
        ]
    },
    {
        question: "Wer malte die 'Mona Lisa'?",
        answers: [
            { text: "Vincent van Gogh", correct: false },
            { text: "Leonardo da Vinci", correct: true },
            { text: "Pablo Picasso", correct: false },
            { text: "Michelangelo", correct: false },
        ]
    },
    {
        question: "Welches ist das längste Fluss-System der Welt?",
        answers: [
            { text: "Nil", correct: false },
            { text: "Jangtse", correct: false },
            { text: "Mississippi-Missouri", correct: false },
            { text: "Amazonas", correct: true },
        ]
    },
    {
        question: "Welche ist die größte Halbinsel der Welt?",
        answers: [
            { text: "Antarktische Halbinsel", correct: false },
            { text: "Skandinavische Halbinsel", correct: true },
            { text: "Indische Halbinsel", correct: false },
            { text: "Arabische Halbinsel", correct: false },
        ]
    },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You score ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display ="block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
};

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});

startQuiz();