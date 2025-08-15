document.addEventListener('DOMContentLoaded', function() {
    const slideshowContainer = document.querySelector('.slideshow-container');
    const imageBaseName = 'jogo_';
    const imageExtension = '.png';
    
    let images = [];
    let currentImageIndex = 0;

    /**
     * Tenta carregar uma imagem.
     * Se conseguir (onload), adiciona ao array e tenta carregar a próxima.
     * Se falhar (onerror), para de carregar e inicia o slideshow.
     * @param {number} index - O número da imagem a ser carregada (ex: 1 para jogo_01.png)
     */
    function loadImage(index) {
        const imageUrl = `img/${imageBaseName}${String(index).padStart(2, '0')}${imageExtension}`;
        const imgElement = document.createElement('img');

        // FUNÇÃO EM CASO DE ERRO (IMAGEM NÃO EXISTE)
        imgElement.onerror = function() {
            console.log(`Busca de imagens finalizada. ${images.length} imagens foram encontradas.`);
            if (images.length > 0) {
                startSlideshow();
            } else {
                console.error("Nenhuma imagem foi encontrada. Verifique se 'jogo_01.png' existe na pasta 'img'.");
            }
        };

        // FUNÇÃO EM CASO DE SUCESSO (IMAGEM CARREGADA)
        imgElement.onload = function() {
            imgElement.classList.add('slide-image');
            slideshowContainer.appendChild(imgElement);
            images.push(imgElement);
            // Tenta carregar a PRÓXIMA imagem
            loadImage(index + 1);
        };

        imgElement.src = imageUrl;
    }

    /**
     * Inicia a animação do slideshow com as imagens que foram carregadas.
     */
    function startSlideshow() {
        if (images.length > 0) {
            // Define um índice inicial aleatório para a primeira imagem a ser exibida
            currentImageIndex = Math.floor(Math.random() * images.length);
            images[currentImageIndex].classList.add('active');
            
            // Inicia o intervalo para trocar de imagem
            setInterval(showNextImage, 5000);
        }
    }

    /**
     * Controla a transição, fazendo a imagem atual sair e a próxima (aleatória) entrar.
     */
    function showNextImage() {
        if (images.length <= 1) return;

        const currentImage = images[currentImageIndex];

        // Faz a imagem atual descer e sair da tela
        currentImage.classList.remove('active');
        currentImage.classList.add('exiting');
        
        // --- ESTA É A LÓGICA ALEATÓRIA ---
        let nextIndex;
        // Gera um novo índice aleatório até que seja DIFERENTE do atual.
        // Isso evita que a mesma imagem seja mostrada duas vezes seguidas.
        do {
            nextIndex = Math.floor(Math.random() * images.length);
        } while (nextIndex === currentImageIndex);

        // Atualiza o índice atual para o novo índice aleatório
        currentImageIndex = nextIndex;
        // --- FIM DA LÓGICA ALEATÓRIA ---

        const nextImage = images[currentImageIndex];

        // Faz a próxima imagem descer e aparecer na tela
        nextImage.classList.add('active');

        // Depois da animação, reseta a imagem que saiu para sua posição inicial
        setTimeout(() => {
            currentImage.classList.remove('exiting');
        }, 1500); // Este tempo deve ser o mesmo da transição no CSS
    }

    // Inicia todo o processo tentando carregar a primeira imagem (jogo_01.png)
    loadImage(1);
});