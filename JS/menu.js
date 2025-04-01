document.addEventListener('DOMContentLoaded', function() {
    // Remove a classe 'active' de todos os itens primeiro
    document.querySelectorAll('.menu a').forEach(link => {
        link.classList.remove('active');
    });
    
    // Adiciona apenas no link correspondente à página atual
    const currentPage = window.location.pathname.split('/').pop() || 'inicio.html';
    const currentLink = document.querySelector(`.menu a[href="${currentPage}"]`);
    
    if (currentLink) {
        currentLink.classList.add('active');
        
        // Se estiver em um submenu, marca o dropdown pai também
        const dropdownParent = currentLink.closest('.submenu');
        if (dropdownParent) {
            const mainMenuLink = dropdownParent.previousElementSibling;
            mainMenuLink.classList.add('active');
        }
    }
});