const auth = {
    async login(email, senha) {
        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, senha })
            });
            
            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('token', data.token);
                window.location.href = 'dashboard.html';
            }
        } catch (error) {
            console.error('Erro no login:', error);
        }
    },

    verificarAuth() {
        return !!localStorage.getItem('token');
    },

    logout() {
        localStorage.removeItem('token');
        window.location.href = 'login.html';
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.testimonial-container > div.profissional');
    const indicators = document.querySelectorAll('.testimonial-indicators .indicator');
    let currentSlide = 0;

    // Função para exibir o slide atual
    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index); // Atualiza o slide ativo
        });

        indicators.forEach((indicator, i) => {
            indicator.classList.toggle('active', i === index); // Atualiza o indicador ativo
        });
    }

    // Função para avançar para o próximo slide
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length; // Avança para o próximo slide ou reinicia
        showSlide(currentSlide);
    }

    // Navegação manual pelos indicadores
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            currentSlide = index;
            showSlide(currentSlide);
        });
    });

    // Inicializa o primeiro slide e configura a rotação automática
    showSlide(currentSlide);
    setInterval(nextSlide, 5000); // Altera automaticamente a cada 5 segundos
});