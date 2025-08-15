document.addEventListener('DOMContentLoaded', function() {
    // Seleciona todos os elementos necessários
    const galleryContainer = document.querySelector('.gallery-container');
    const modalOverlay = document.querySelector('.image-modal-overlay');
    const modalImage = document.getElementById('modal-image');
    const body = document.body;

    // Verifica se os elementos da galeria existem na página atual
    if (galleryContainer && modalOverlay && modalImage) {

        // Adiciona um evento de clique ao contêiner da galeria (event delegation)
        galleryContainer.addEventListener('click', function(event) {
            // Verifica se o elemento clicado foi uma imagem (IMG)
            if (event.target.tagName === 'IMG') {
                // Pega o caminho (src) da imagem clicada
                const imageSrc = event.target.src;
                
                // Define o caminho da imagem no modal
                modalImage.src = imageSrc;
                
                // Mostra o modal
                modalOverlay.classList.add('active');
                
                // Impede o scroll da página ao fundo
                body.classList.add('modal-open');
            }
        });

        // Adiciona um evento de clique ao overlay do modal para fechá-lo
        modalOverlay.addEventListener('click', function() {
            // Esconde o modal
            modalOverlay.classList.remove('active');
            
            // Permite o scroll da página novamente
            body.classList.remove('modal-open');
        });
    }
});