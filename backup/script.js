document.addEventListener('DOMContentLoaded', function () {
  // Carrossel de imagens
  const carousel = document.querySelector('.carousel');
  const carouselImages = document.querySelector('.carousel-images');
  const carouselDotsContainer = document.querySelector('.carousel-dots');
  let imageWidth = carousel.offsetWidth;
  let currentIndex = 0;
  let dots = [];

  function setupCarousel() {
      imageWidth = carousel.offsetWidth;
      const imageCount = carouselImages.children.length;

      carouselImages.style.width = `${imageWidth * imageCount}px`;
      
      // Gerar os dots do carousel
      for (let i = 0; i < imageCount; i++) {
          const dot = document.createElement('span');
          dot.addEventListener('click', () => {
            goToImage(i);
          });
          carouselDotsContainer.appendChild(dot);
          dots.push(dot);
      }
        updateDots();
  }

  function goToImage(index) {
      currentIndex = index;
      carouselImages.style.transform = `translateX(-${imageWidth * currentIndex}px)`;
      updateDots();
  }
   function updateDots(){
    dots.forEach((dot, i)=>{
         if (i === currentIndex) {
           dot.classList.add('active');
          } else {
             dot.classList.remove('active');
          }
    });
   }
   
   // Testemunhos
   const testimonialCarousel = document.querySelector('.testimonial-carousel');
    const testimonialDotsContainer = document.querySelector('.testimonial-dots');
    let testimonialIndex = 0;
    let testimonialDots = [];
      
    function setupTestimonial(){
         const textCount = testimonialCarousel.children.length;
        
         for (let i = 0; i < textCount; i++) {
          const dot = document.createElement('span');
          dot.addEventListener('click', () => {
            goToTestimonial(i);
          });
          testimonialDotsContainer.appendChild(dot);
           testimonialDots.push(dot);
      }
      updateTestimonialDots();
     }
     
  function goToTestimonial(index){
        testimonialIndex = index;
        updateTestimonialDots();
       }

   function updateTestimonialDots(){
    testimonialDots.forEach((dot, i)=>{
         if (i === testimonialIndex) {
           dot.classList.add('active');
          } else {
             dot.classList.remove('active');
          }
    });
   }
     
      setupCarousel();
      setupTestimonial();
    
  window.addEventListener('resize', setupCarousel);

  // Formulario de contato
  document.getElementById('contact-form').addEventListener('submit', function (event) {
      event.preventDefault();
      
      const name = this.querySelector('input[type="text"]').value;
      const email = this.querySelector('input[type="email"]').value;
      const message = this.querySelector('textarea').value;

      // Simulando o agendamento
      alert('Agendamento simulado para: ' + name + '\nEmail: ' + email + '\nMensagem: ' + message);
      
      this.reset();
    
      // Enviar a mensagem via WhatsApp
        const phoneNumber = '+5521999999999'; 
        const whatsappMessage = encodeURIComponent(`Novo agendamento!\nNome: ${name}\nEmail: ${email}\nMensagem: ${message}`);
        window.open(`https://wa.me/${phoneNumber}?text=${whatsappMessage}`);
  });
  // Banco de dados simulado
      let db = {
          users: {}, 
          agendamentos: {}, 
      };
      let nextUserId = 1;
      let nextAgendamentoId = 1;

       // Carregar dados do localStorage se existirem
      const storedDB = localStorage.getItem('db');
      if (storedDB) {
          db = JSON.parse(storedDB);
          if(Object.keys(db.users).length > 0){
              nextUserId = Math.max(...Object.keys(db.users).map(Number)) + 1;
            }
           if(Object.keys(db.agendamentos).length > 0){
              nextAgendamentoId = Math.max(...Object.keys(db.agendamentos).map(Number)) + 1;
            }
      }
  
      function createUser(name, email, phone, password) {
          const newUser = {
              id: nextUserId++,
              name,
              email,
              phone,
              password
          };
         db.users[newUser.id] = newUser;
          localStorage.setItem('db', JSON.stringify(db));
          return newUser;
      }
  
      function createAgendamento(userId, message){
          const newAgendamento = {
              id: nextAgendamentoId++,
              userId,
              message,
              status: 'agendado'
          };
        db.agendamentos[newAgendamento.id] = newAgendamento;
        localStorage.setItem('db', JSON.stringify(db));
          return newAgendamento;
      }

 // Login
  const loginButton = document.getElementById('login-button');
  const loginModal = document.getElementById('login-modal');
  const closeButton = document.querySelector('.close-button');

loginButton.addEventListener('click', () => {
    loginModal.style.display = 'block';
  });

  closeButton.addEventListener('click', () => {
     loginModal.style.display = 'none';
  });

  window.addEventListener('click', (event) => {
    if (event.target === loginModal) {
       loginModal.style.display = 'none';
    }
  });

 const loginForm = document.getElementById('login-form');
 const registerForm = document.getElementById('register-form');
  loginForm.addEventListener('submit', function (event) {
     event.preventDefault();

     const email = this.querySelector('input[type="email"]').value;
     const password = this.querySelector('input[type="password"]').value;

  // Simulação de login - verifica se o usuário existe.
    const user = Object.values(db.users).find(u => u.email === email && u.password === password);
      if(user){
          //alert('Login realizado com sucesso!');
          loginModal.style.display = 'none';
           localStorage.setItem('userId', user.id);
          window.location.href = 'agenda.html';
      } else {
         alert('Credenciais incorretas.');
      }
    loginForm.reset();
  });
    registerForm.addEventListener('submit', function(event){
     event.preventDefault();

        const name = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const phone = this.querySelector('input[type="tel"]').value;
         const password = this.querySelector('input[type="password"]').value;

         const newUser = createUser(name, email, phone, password);
         localStorage.setItem('userId', newUser.id);
         //alert("Cadastro realizado com sucesso!")
         loginModal.style.display = 'none';
          window.location.href = 'agenda.html';
         registerForm.reset();
    });
});