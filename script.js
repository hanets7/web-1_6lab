document.addEventListener("DOMContentLoaded", function() {
    const quizContainer = document.getElementById('quiz-container');
    const resultContainer = document.getElementById('result-container');
    const submitButton = document.getElementById('submit-btn');

    const testData = {
        testName: "Тест з ІТ",
        questions: [
            {
                question: "Що таке HTML?",
                answers: [
                    { answer: "Мова програмування", isCorrect: false },
                    { answer: "Мова розмітки", isCorrect: true },
                    { answer: "Мова стилів", isCorrect: false },
                    { answer: "Мова запитів", isCorrect: false }
                ]
            },
            {
                question: "Що таке CSS?",
                answers: [
                    { answer: "Мова програмування", isCorrect: false },
                    { answer: "Мова розмітки", isCorrect: false },
                    { answer: "Мова стилів", isCorrect: true },
                    { answer: "Мова запитів", isCorrect: false }
                ]
            },
             {
                question: "Яка роль JavaScript у веб-дизайні?",
                answers: [
                    { answer: "Керування базами даних", isCorrect: false },
                    { answer: "Створення динамічних ефектів", isCorrect: true },
                    { answer: "Визначення структури веб-сторінок", isCorrect: false },
                    { answer: "Стилізація веб-елементів", isCorrect: false }
                ]
            },
            {
                question: "Що таке адаптивний веб-дизайн?",
                answers: [
                    { answer: "Веб-сайт без стилів", isCorrect: false },
                    { answer: "Веб-сайт з однаковим виглядом на всіх пристроях", isCorrect: false },
                    { answer: "Веб-сайт, який адаптується до різних пристроїв та розмірів екранів", isCorrect: true },
                    { answer: "Веб-сайт, який можна переглядати лише на комп'ютерах", isCorrect: false }
                ]
            },
            {
                question: "Яка функція виконується метатегом viewport у HTML?",
                answers: [
                    { answer: "Визначає мову веб-сторінки", isCorrect: false },
                    { answer: "Визначає загальну тему веб-сайту", isCorrect: false },
                    { answer: "Визначає розмір та масштаб екрана", isCorrect: true },
                    { answer: "Визначає ключові слова для пошукових систем", isCorrect: false }
                ]
            },
            {
                question: "Які є основні типи CSS властивостей?",
                answers: [
                    { answer: "Inline, Internal, External", isCorrect: false },
                    { answer: "Class, ID, Tag", isCorrect: false },
                    { answer: "Text, Background, Border", isCorrect: false },
                    { answer: "Margin, Padding, Border", isCorrect: true }
                ]
            },
            {
                question: "Яка функція виконується властивістю 'display: none' у CSS?",
                answers: [
                    { answer: "Змінює колір тексту", isCorrect: false },
                    { answer: "Приховує елемент", isCorrect: true },
                    { answer: "Змінює розмір елементу", isCorrect: false },
                    { answer: "Відображає елемент", isCorrect: false }
                ]
            },
            {
                question: "Що таке підвал веб-сторінки?",
                answers: [
                    { answer: "Частина зверху сторінки", isCorrect: false },
                    { answer: "Частина знизу сторінки", isCorrect: true },
                    { answer: "Сторінка з попередніми новинами", isCorrect: false },
                    { answer: "Текстова частина сторінки", isCorrect: false }
                ]
            },
            {
                question: "Яка функція виконується властивістю 'position: absolute' у CSS?",
                answers: [
                    { answer: "Розташовує елемент відносно інших елементів на сторінці", isCorrect: true },
                    { answer: "Центрує елемент на сторінці", isCorrect: false },
                    { answer: "Робить елемент прозорим", isCorrect: false },
                    { answer: "Змінює розмір елементу", isCorrect: false }
                ]
            },
            {
                question: "Що таке медіазапит у CSS?",
                answers: [
                    { answer: "Короткий шлях до зображень", isCorrect: false },
                    { answer: "Код, який змінює розмір шрифту", isCorrect: false },
                    { answer: "Код, який дозволяє встановлювати стилі для різних розмірів екранів", isCorrect: true },
                    { answer: "Код, який додає анімаційні ефекти", isCorrect: false }
                ]
            }
        ]
    };

    function displayQuestions(questions) {
        questions.forEach((question, index) => {
            const questionElem = document.createElement('div');
            questionElem.classList.add('question');
            questionElem.innerHTML = `
                <p>${index + 1}. ${question.question}</p>
                ${question.answers.map((answer, answerIndex) => `
                    <input type="radio" id="question-${index}-answer-${answerIndex}" name="question-${index}" value="${answerIndex}">
                    <label for="question-${index}-answer-${answerIndex}">${answer.answer}</label><br>
                `).join('')}
            `;
            quizContainer.appendChild(questionElem);
        });
    }

    submitButton.addEventListener('click', function() {
        const answers = document.querySelectorAll('input[type="radio"]:checked');
        let score = 0;
        let correctAnswers = [];

        answers.forEach((radio) => {
            const [questionIndex, answerIndex] = radio.id.split('-').slice(1).map(num => parseInt(num));
            const correctAnswer = testData.questions[questionIndex].answers[answerIndex].isCorrect;
            if (correctAnswer) {
                score++;
                correctAnswers.push(radio);
            }
        });

        const resultText = `Ваш результат: ${score} з ${testData.questions.length}`;
        resultContainer.innerHTML = `<p>${resultText}</p>`;
        resultContainer.style.display = 'block';

        correctAnswers.forEach(answer => {
            answer.nextElementSibling.style.color = 'green';
        });

        const result = {
            score: score,
            totalQuestions: testData.questions.length
        };
        localStorage.setItem('quizResult', JSON.stringify(result));

        alert('Результати тесту збережено');
    });

    displayQuestions(testData.questions);

    window.addEventListener('load', function() {
        const quizResult = JSON.parse(localStorage.getItem('quizResult'));
        if (quizResult) {
            const resultText = `Ваш результат: ${quizResult.score} з ${quizResult.totalQuestions}`;
            resultContainer.innerHTML = `<p>${resultText}</p>`;
            resultContainer.style.display = 'block';
        }
    });
});
