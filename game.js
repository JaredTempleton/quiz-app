const question = document.querySelector('#question')
const choices = Array.from(document.querySelectorAll('.choice-text'))
const progressText = document.querySelector('#progressText')
const scoreText = document.querySelector('#score')
const progressBarFull = document.querySelector('#progressBarFull')

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: 'Inside which HTML element do we put the JavaScript?',
        choice1: '<scripting>',
        choice2: '<script>',
        choice3: '<js>',
        choice4: '<javascript>',
        answer: 2,
    },
    {
        question: 'Where is the correct place to insert a JavaScript?',
        choice1: 'The <body> section',
        choice2: 'The <head> section',
        choice3: 'Both the <head> and <body> section',
        choice4: 'You do not have to place JS',
        answer: 3,
    },
    {
        question: 'How do you write "Hello World" in an alert box?',
        choice1: 'msgBox("Hello World")',
        choice2: 'alert("Hello World")',
        choice3: 'alertBox("Hello World")',
        choice4: 'msg("Hello World")',
        answer: 2,
    },
    {
        question: 'How do you create a function in JavaScript?',
        choice1: 'function: testFunction()',
        choice2: 'function = testFunction()',
        choice3: 'function testFunction()',
        choice4: 'function "testFunction"()',
        answer: 3,
    }
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 4

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('/end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

    const questionsIndex = Math.floor(Math.random()  * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset [ 'number']
        choice.innerText = currentQuestion['choice' + number]

    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct'  :
        'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()
        
        }, 1000)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()
