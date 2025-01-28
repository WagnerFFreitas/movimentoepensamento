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
  
  const indicators = document.querySelectorAll('.indicator');
  const slides = document.querySelectorAll('.profissional');
  
  let currentSlide = 0;
  let isAnimating = false; // Variável para controlar o estado da exibição dos slides
  
  indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
      if (isAnimating) return; // Verificar se a exibição dos slides está em andamento
  
      currentSlide = index;
      showSlide(currentSlide);
    });
  });
  
  function showSlide(index) {
    slides.forEach((slide) => slide.style.display = 'none');
    indicators.forEach((indicator) => indicator.classList.remove('active'));
  
    slides[index].style.display = 'block';
    indicators[index].classList.add('active');
  
    isAnimating = true; // Marcar a exibição dos slides como em andamento
  
    setTimeout(() => {
      isAnimating = false; // Marcar a exibição dos slides como concluída
    }, 1000); // Reduzir o tempo de animação para 1 segundo
  }
  
  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }
  
  setInterval(nextSlide, 10000);