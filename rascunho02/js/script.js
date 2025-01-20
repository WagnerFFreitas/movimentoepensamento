const testimonialContainer = document.querySelector('.testimonial-container');
const testimonialSlides = document.querySelectorAll('.testimonial-slide');
const prevButton = document.querySelector('.prev-button');
const nextButton = document.querySelector('.next-button');
const dotsContainer = document.querySelector('.carousel-dots');
const dots = document.querySelectorAll('.dot');

let currentSlide = 0;



function updateCarousel() {
    testimonialSlides.forEach((slide, index) => {
        slide.style.transform = `translateX(${100 * (index - currentSlide)}%)`;
    });
}

function updateDots() {
    dots.forEach((dot, index) => {
        dot.classList.toggle('active-dot', index === currentSlide);
    });
}


function nextSlide() {
    currentSlide = (currentSlide + 1) % testimonialSlides.length;
    updateCarousel();
    updateDots();
}


function prevSlide() {
    currentSlide = (currentSlide - 1 + testimonialSlides.length) % testimonialSlides.length;
    updateCarousel();
    updateDots();
}

function goToSlide(index){
    currentSlide = index;
    updateCarousel();
    updateDots();
}


nextButton.addEventListener('click', nextSlide);
prevButton.addEventListener('click', prevSlide);


dots.forEach((dot, index) => {
    dot.addEventListener('click', () => goToSlide(index));
})


// Initialization
updateCarousel();
updateDots();

setInterval(nextSlide, 5000)