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

document.addEventListener('DOMContentLoaded', function() {
  const slides = document.querySelectorAll('.testimonial-container > div');
  const indicators = document.querySelectorAll('.testimonial-indicators .indicator');
  let currentSlide = 0;


  function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    indicators.forEach(indicator => indicator.classList.remove('active'));

    slides[index].classList.add('active');
    indicators[index].classList.add('active');
  }

  function nextSlide() {
      currentSlide = (currentSlide + 1) % slides.length;
      showSlide(currentSlide);
  }

   setInterval(nextSlide, 5000);


  indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
      currentSlide = index;
      showSlide(currentSlide);
    });
  });


    showSlide(currentSlide);
});




document.addEventListener('DOMContentLoaded', function() {
  const slides = document.querySelectorAll('.testimonial-container > div');
  const indicators = document.querySelectorAll('.testimonial-indicators .indicator');
  let currentSlide = 0;


  function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    indicators.forEach(indicator => indicator.classList.remove('active'));

    slides[index].classList.add('active');
    indicators[index].classList.add('active');
  }

  function nextSlide() {
      currentSlide = (currentSlide + 1) % slides.length;
      showSlide(currentSlide);
  }

   setInterval(nextSlide, 5000);


  indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
      currentSlide = index;
      showSlide(currentSlide);
    });
  });


    showSlide(currentSlide);
});