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
  const slides = document.querySelectorAll('.testimonial-slide');
  const indicators = document.querySelectorAll('.testimonial-indicators .indicator');
  let currentSlide = 0;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
    });
    indicators.forEach((indicator, i) => {
      indicator.classList.toggle('active', i === index);
    });
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }

  // Initialize with the first slide
  showSlide(currentSlide);

  // Automatic rotation every 5 seconds
  setInterval(nextSlide, 5000);

  // Manual navigation with indicators
  indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
      currentSlide = index;
      showSlide(currentSlide);
    });
  });
});