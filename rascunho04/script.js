document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    mobileMenuBtn.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        this.classList.toggle('active');
    });

    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            navLinks.classList.remove('active');

            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Initialize Map
    mapboxgl.accessToken = 'pk.eyJ1IjoibG92YWJsZSIsImEiOiJjbHJwOWhtYmkwMjF2MnFsYnhjZGNiM3ZtIn0.JpZOQJ3C_xkMxQMsHGqPYg';
    
    const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/dark-v11',
        center: [-43.3228, -22.7866], // Duque de Caxias coordinates
        zoom: 14
    });

    // Add marker
    new mapboxgl.Marker()
        .setLngLat([-43.3228, -22.7866])
        .addTo(map);

    // Contact Form Submission
    const contactForm = document.getElementById('contact-form');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Mensagem enviada com sucesso! Em breve entraremos em contato.');
        this.reset();
    });

    // Formulário de Agendamento
    const schedulingForm = document.getElementById('scheduling-form');
    
    schedulingForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const patientName = document.getElementById('patient-name').value;
        const patientPhone = document.getElementById('patient-phone').value;
        const patientEmail = document.getElementById('patient-email').value;
        const serviceType = document.getElementById('service-type').value;
        const appointmentDate = document.getElementById('appointment-date').value;
        const appointmentTime = document.getElementById('appointment-time').value;

        // Formatar a mensagem para o WhatsApp
        const message = encodeURIComponent(
            `*Novo Agendamento*\n\n` +
            `*Paciente:* ${patientName}\n` +
            `*Telefone:* ${patientPhone}\n` +
            `*Email:* ${patientEmail}\n` +
            `*Serviço:* ${serviceType}\n` +
            `*Data:* ${appointmentDate}\n` +
            `*Horário:* ${appointmentTime}`
        );

        // Número do WhatsApp da clínica (substitua pelo número real)
        const clinicWhatsApp = '5521999999999';

        // Criar link do WhatsApp
        const whatsappLink = `https://api.whatsapp.com/send?phone=${clinicWhatsApp}&text=${message}`;

        // Abrir WhatsApp em nova janela
        window.open(whatsappLink, '_blank');

        // Limpar formulário
        schedulingForm.reset();
        alert('Agendamento realizado com sucesso! Você será redirecionado para o WhatsApp da clínica.');
    });
});
