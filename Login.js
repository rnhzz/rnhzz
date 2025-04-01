document.addEventListener('DOMContentLoaded', function() {
    // Verifica se todos elementos existam antes de continuar
    const elements = {
        contaLink: document.querySelector('nav a[href*="conta"]'),
        loginModal: document.getElementById('loginModal'),
        closeModal: document.querySelector('.close-modal'),
        loginForm: document.getElementById('loginForm'),
        loginMessage: document.getElementById('loginMessage')
    };

    // Verificação de segurança
    for (const [key, element] of Object.entries(elements)) {
        if (!element) {
            console.error(`Elemento não encontrado: ${key}`);
            return;
        }
    }

    // Credenciais válidas
    const VALID_CREDENTIALS = {
        username: 'Duda',
        password: 'Tchonga'
    };

    // Abrir modal
    elements.contaLink.addEventListener('click', function(e) {
        e.preventDefault();
        elements.loginModal.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // Trava scroll da página
    });

    // Fechar modal
    elements.closeModal.addEventListener('click', closeLoginModal);
    elements.loginModal.addEventListener('click', function(e) {
        if (e.target === elements.loginModal) {
            closeLoginModal();
        }
    });

    // Processar login
    elements.loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value.trim();
        
        if (username === VALID_CREDENTIALS.username && 
            password === VALID_CREDENTIALS.password) {  
            localStorage.setItem('loggedUser', VALID_CREDENTIALS.username);
            
            showMessage('Login bem-sucedido!', 'success');
            
            // Redireciona após 1 segundo
            setTimeout(() => {
                window.location.href = 'conta.html';
            }, 1000);
        } else {
            showMessage('Credenciais inválidas!', 'error');
        }
    });

    // Funções auxiliares
    function closeLoginModal() {
        elements.loginModal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Libera scroll
        elements.loginForm.reset();
        elements.loginMessage.textContent = '';
    }

    function showMessage(text, type) {
        elements.loginMessage.textContent = text;
        elements.loginMessage.style.color = type === 'success' ? '#2ecc71' : '#e74c3c';
    }

    // Fecha modal com ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && elements.loginModal.style.display === 'flex') {
            closeLoginModal();
        }
    });
});