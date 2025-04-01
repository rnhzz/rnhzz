document.addEventListener('DOMContentLoaded', function() {
    // Elementos
    const quizModal = document.getElementById('quizModal');
    const quizContent = document.getElementById('quizContent');
    const quizResult = document.getElementById('quizResult');
    const openQuizBtn = document.getElementById('openQuizBtn');
    const mainContent = document.querySelector('.main-content');

    // Perguntas do Quiz (personalize como quiser)
    const questions = [
        {
            question: "Quando nos conhecemos?",
            options: ["2023", "2024", "Naquele dia d quadra"],
            answer: 2,
            funFact: "Essa aq tem q ser expert, eu considero mt esse dia."
        },
        {
            question: "Qual é a minha cor favorita?",
            options: ["vermelho", "Roxo", "Preto"],
            answer: 1,
            funFact: "sim, é roxo!"
        },
        {
            question: "Qual desses NÃO é um Ghostbuster original?",
            options: ["Peter Venkman", "Ray Stantz", "Dana Barrett"],
            answer: 2,
            funFact: "Dana Barrett era a cliente interpretada por Sigourney Weaver!"
        },
        {
            question: "Qual desses NÃO é um Ghostbuster original?",
            options: ["Peter Venkman", "Ray Stantz", "Dana Barrett"],
            answer: 2,
            funFact: "Dana Barrett era a cliente interpretada por Sigourney Weaver!"
        },
        {
            question: "Qual desses NÃO é um Ghostbuster original?",
            options: ["Peter Venkman", "Ray Stantz", "Dana Barrett"],
            answer: 2,
            funFact: "Dana Barrett era a cliente interpretada por Sigourney Weaver!"
        }
    ];

    let currentQuestion = 0;
    let score = 0;

    // Abrir Quiz
    openQuizBtn.addEventListener('click', function() {
        quizModal.style.display = 'flex';
        mainContent.style.display = 'none'; // Esconde o conteúdo principal
        document.body.style.overflow = 'hidden';
        startQuiz();
    });

    // Fechar Quiz
    function closeQuiz() {
        quizModal.style.display = 'none';
        mainContent.style.display = 'block'; // Mostra o conteúdo novamente
        document.body.style.overflow = 'auto';
    }

    document.querySelector('.close-quiz').addEventListener('click', closeQuiz);
    quizModal.addEventListener('click', function(e) {
        if (e.target === quizModal) closeQuiz();
    });

    // Iniciar Quiz
    function startQuiz() {
        currentQuestion = 0;
        score = 0;
        showQuestion();
    }

    // Mostrar Pergunta
    function showQuestion() {
        if (currentQuestion < questions.length) {
            const q = questions[currentQuestion];
            
            quizContent.innerHTML = `
                <div class="quiz-question">${q.question}</div>
                <div class="quiz-options">
                    ${q.options.map((option, i) => `
                        <div class="quiz-option" data-index="${i}">${option}</div>
                    `).join('')}
                </div>
            `;
            
            // Adiciona eventos às opções
            document.querySelectorAll('.quiz-option').forEach(option => {
                option.addEventListener('click', checkAnswer);
            });
            
            quizResult.textContent = '';
        } else {
            // Fim do Quiz
            const percentage = Math.round((score / questions.length) * 100);
            quizContent.innerHTML = `
                <h3 style="color: white; margin-bottom: 20px;">Quiz Concluído! 🎉</h3>
                <p style="color: white; font-size: 1.2rem;">
                    Você acertou ${score} de ${questions.length} perguntas<br>
                    <span style="font-size: 1.5rem; color: ${percentage > 70 ? '#2ecc71' : percentage > 40 ? '#f39c12' : '#e74c3c'}">
                        ${percentage}% de acerto!
                    </span>
                </p>
                <button 
                    id="restartQuiz" 
                    class="glassmorphism-btn" 
                    style="margin-top: 30px; padding: 12px 30px;"
                >
                    🔄 Fazer Novamente
                </button>
            `;
            
            document.getElementById('restartQuiz').addEventListener('click', startQuiz);
        }
    }

    // Verificar Resposta
    function checkAnswer(e) {
        const selectedOption = e.target;
        const selectedIndex = parseInt(selectedOption.getAttribute('data-index'));
        const correctIndex = questions[currentQuestion].answer;
        
        // Desativa todas as opções
        document.querySelectorAll('.quiz-option').forEach(opt => {
            opt.style.pointerEvents = 'none';
        });
        
        if (selectedIndex === correctIndex) {
            selectedOption.classList.add('correct');
            score++;
            quizResult.innerHTML = `
                <span style="color: #2ecc71">✅ Correto!</span><br>
                <small>${questions[currentQuestion].funFact}</small>
            `;
        } else {
            selectedOption.classList.add('incorrect');
            document.querySelector(`.quiz-option[data-index="${correctIndex}"]`).classList.add('correct');
            quizResult.innerHTML = `
                <span style="color: #e74c3c">❌ Errado!</span><br>
                <small>${questions[currentQuestion].funFact}</small>
            `;
        }
        
        // Próxima pergunta após 2 segundos
        setTimeout(() => {
            currentQuestion++;
            showQuestion();
        }, 2000);
    }
});