// Testimonials
const testimonials = [
  {
    text: "Movimento e Pensamento is outstanding! Their team provided exceptional physiotherapy that greatly improved my mobility. The staff is compassionate and highly skilled. I am truly thankful for their support and recommend them to anyone seeking quality care in Duque de Caxias. Thank you so much!",
    author: "Ana"
  }
  // Add more testimonials as needed
];

let currentTestimonial = 0;

function updateTestimonial() {
  const testimonialText = document.querySelector('.testimonial-text');
  const testimonialAuthor = document.querySelector('.testimonial-author');
  
  testimonialText.textContent = testimonials[currentTestimonial].text;
  testimonialAuthor.textContent = `- ${testimonials[currentTestimonial].author}`;
}

function nextTestimonial() {
  currentTestimonial = (currentTestimonial + 1) % testimonials.length;
  updateTestimonial();
}

function prevTestimonial() {
  currentTestimonial = currentTestimonial > 0 ? currentTestimonial - 1 : testimonials.length - 1;
  updateTestimonial();
}

// Services
const services = [
  {
    title: "Basic Physiotherapy Session",
    price: "120",
    period: "per session",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80",
    buttonText: "Book Basic Session"
  },
  {
    title: "Specialized Physiotherapy Session",
    price: "220",
    period: "per session",
    image: "https://images.unsplash.com/photo-1599497992816-c7e8f0d1c0f5?auto=format&fit=crop&q=80",
    buttonText: "Book Specialized Session",
    popular: true
  },
  {
    title: "Comprehensive Physiotherapy Plan",
    price: "1800",
    period: "per month",
    image: "https://images.unsplash.com/photo-1571388208497-71bedc66e932?auto=format&fit=crop&q=80",
    buttonText: "Start Complete Plan"
  }
];

function createServiceCards() {
  const servicesGrid = document.querySelector('.services-grid');
  
  services.forEach(service => {
    const serviceCard = document.createElement('div');
    serviceCard.className = 'service-card';
    
    serviceCard.innerHTML = `
      <img src="${service.image}" alt="${service.title}" class="service-image">
      <div class="service-content">
        ${service.popular ? '<span class="popular-tag">Popular</span>' : ''}
        <h3 class="service-title">${service.title}</h3>
        <div class="service-price">
          <span class="price-amount">$${service.price}</span>
          <span class="price-period">${service.period}</span>
        </div>
        <button class="book-service-btn" data-service="${service.title}">${service.buttonText}</button>
      </div>
    `;
    
    servicesGrid.appendChild(serviceCard);
  });
}

// Modal Handling
function openModal(modalId) {
  document.getElementById(modalId).style.display = 'block';
}

function closeModal(modalId) {
  document.getElementById(modalId).style.display = 'none';
}

function handleModalClicks() {
  // Close modals when clicking outside
  window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
      event.target.style.display = 'none';
    }
  };

  // Close buttons
  document.querySelectorAll('.close').forEach(closeBtn => {
    closeBtn.onclick = function() {
      this.closest('.modal').style.display = 'none';
    };
  });

  // Switch between login and register
  document.getElementById('showRegister').onclick = function(e) {
    e.preventDefault();
    closeModal('loginModal');
    openModal('registerModal');
  };

  document.getElementById('showLogin').onclick = function(e) {
    e.preventDefault();
    closeModal('registerModal');
    openModal('loginModal');
  };
}

// Form Handling
function handleForms() {
  // Login Form
  document.getElementById('loginForm').onsubmit = function(e) {
    e.preventDefault();
    // Add login logic here
    console.log('Login submitted');
    closeModal('loginModal');
  };

  // Register Form
  document.getElementById('registerForm').onsubmit = function(e) {
    e.preventDefault();
    // Add registration logic here
    console.log('Registration submitted');
    closeModal('registerModal');
  };

  // Appointment Form
  document.getElementById('appointmentForm').onsubmit = function(e) {
    e.preventDefault();
    // Add appointment scheduling logic here
    console.log('Appointment scheduled');
    closeModal('appointmentModal');
  };
}

// Add Section Buttons
function handleAddSection() {
  // This would typically open a modal or menu with section options
  console.log('Add section clicked');
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  updateTestimonial();
  createServiceCards();
  handleModalClicks();
  handleForms();
  
  // Event Listeners
  document.querySelector('.prev-testimonial').addEventListener('click', prevTestimonial);
  document.querySelector('.next-testimonial').addEventListener('click', nextTestimonial);
  
  // Login button
  document.getElementById('loginButton').addEventListener('click', () => openModal('loginModal'));
  
  // Book service buttons
  document.addEventListener('click', function(e) {
    if (e.target.classList.contains('book-service-btn')) {
      openModal('appointmentModal');
    }
  });
  
  // Add section buttons
  const addSectionButtons = document.querySelectorAll('.add-section-button, .nav-button');
  addSectionButtons.forEach(button => {
    button.addEventListener('click', handleAddSection);
  });
});