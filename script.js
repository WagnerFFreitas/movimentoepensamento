// --- Carousel (Section 5) ---
const carouselTrack = document.querySelector('.carousel-track');
const carouselImages = carouselTrack.children;
const carouselNav = document.querySelector('.carousel-dots');
let currentIndex = 0;

// Function to move to a specific slide
function moveToSlide(index) {
    carouselTrack.style.transform = `translateX(-${index * 100}%)`;
    updateNavDots(index);
}

// Function to update navigation dots
function updateNavDots(index) {
    // Remove active class from all dots
    carouselNav.querySelectorAll('span').forEach(dot => dot.classList.remove('active'));
    // Add active class to the current dot
    carouselNav.children[index].classList.add('active');
}


// Initialize carousel dots
for (let i = 0; i < carouselImages.length; i++) {
    const dot = document.createElement('span');
    dot.addEventListener('click', () => {
        currentIndex = i;
        moveToSlide(currentIndex);
    });
    carouselNav.appendChild(dot);
}

// Event listeners for next and previous buttons
document.querySelector('.carousel-prev').addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + carouselImages.length) % carouselImages.length;
    moveToSlide(currentIndex);
});

document.querySelector('.carousel-next').addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % carouselImages.length;
    moveToSlide(currentIndex);
});

// Initial slide setup
moveToSlide(currentIndex);

// --- Patient Registration and Login with Local Storage ---
const registerForm = document.getElementById('register-form');
const loginForm = document.getElementById('login-form');
const patientPortal = document.getElementById('patient-portal');
let loggedInPatient = null;

// Function to save patient data to local storage
function savePatient(patient) {
    let patients = JSON.parse(localStorage.getItem('patients')) || [];
    patients.push(patient);
    localStorage.setItem('patients', JSON.stringify(patients));
}

// Function to check if a patient exists
function findPatientByEmail(email) {
    const patients = JSON.parse(localStorage.getItem('patients')) || [];
    return patients.find(p => p.email === email);
}

// Register event listener
registerForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = document.getElementById('register-name').value;
    const email = document.getElementById('register-email').value;
    const phone = document.getElementById('register-phone').value;
    const password = document.getElementById('register-password').value;
    const role = document.getElementById('register-role').value;


    if (findPatientByEmail(email)) {
        alert('Email already registered.');
        return;
    }

    const newPatient = { id: Date.now(), name, email, phone, password, role };
    savePatient(newPatient);
    alert('Registration successful! Please log in.');
    // Optionally, automatically log the user in
});

// Login event listener
loginForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    const patient = findPatientByEmail(email);

    if (patient && patient.password === password) {
         loggedInPatient = patient;
        alert(`Login successful, ${patient.name}!`);
         document.getElementById('login-register').style.display = 'none';
        patientPortal.style.display = 'block';
        displayPatientInfo();
        renderCalendar();
        displayAppointments();
        handleLoginSuccess(patient);
    } else {
        alert('Invalid credentials.');
    }
});

function handleLoginSuccess(user) {
    if (user.role === 'patient') {
       document.getElementById('admin-dashboard').style.display = 'none'; // Hide admin specific elements if they exist
       patientPortal.style.display = 'block';
    } else if (user.role === 'admin') {
       patientPortal.style.display = 'none';
       document.getElementById('admin-dashboard').style.display = 'block';
    }
}

function displayPatientInfo() {
    document.getElementById('patient-info').textContent = `Welcome, ${loggedInPatient.name}!`;
}


// --- Appointment Scheduling with Calendar (Simplified) ---
const calendarDiv = document.getElementById('calendar');
const saveAppointmentButton = document.getElementById('save-appointment');
const appointmentsTableBody = document.querySelector('#appointments-table tbody');

function renderCalendar() {
    calendarDiv.innerHTML = ''; // Clear previous calendar
    const today = new Date();
    const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();

    for (let day = 1; day <= daysInMonth; day++) {
        const dayElement = document.createElement('div');
        dayElement.textContent = day;
        dayElement.classList.add('calendar-day');
        dayElement.addEventListener('click', () => {
            // Logic to show available times for that day
             showAvailableTimes(today.getFullYear(), today.getMonth(), day);
        });
        calendarDiv.appendChild(dayElement);
    }
}


function showAvailableTimes(year, month, day) {
    // For simplicity, let's just alert the selected date
    const selectedDate = new Date(year, month, day);
    alert(`Selected Date: ${selectedDate.toLocaleDateString()}`);
    // In a real implementation, you would display time slots here
}


function saveAppointment() {
    if (!loggedInPatient) {
        alert('Please log in to schedule an appointment.');
        return;
    }

    // In a real implementation, you would get the selected date and time
    const appointmentDate = prompt("Enter appointment date (YYYY-MM-DD):");
    const appointmentTime = prompt("Enter appointment time (HH:MM):");
    const appointmentType = document.getElementById('appointment-type').value;
    const appointmentMessage = document.getElementById('appointment-message').value;

    const newAppointment = {
        patientId: loggedInPatient.id,
        date: appointmentDate,
        time: appointmentTime,
        type: appointmentType,
        message: appointmentMessage
    };

    let appointments = JSON.parse(localStorage.getItem('appointments')) || [];
    appointments.push(newAppointment);
    localStorage.setItem('appointments', JSON.stringify(appointments));

     displayAppointments();
    simulateWhatsAppNotification(newAppointment);
}

saveAppointmentButton.addEventListener('click', saveAppointment);

function displayAppointments() {
    appointmentsTableBody.innerHTML = '';
    const appointments = JSON.parse(localStorage.getItem('appointments')) || [];
    const patientAppointments = appointments.filter(app => app.patientId === loggedInPatient.id);

    patientAppointments.forEach(appointment => {
        const row = appointmentsTableBody.insertRow();
        row.insertCell().textContent = loggedInPatient.name;
        row.insertCell().textContent = `${appointment.date} ${appointment.time}`;
        row.insertCell().textContent = appointment.type;
        row.insertCell().textContent = appointment.message;
    });
}

// --- Simulating WhatsApp Notifications ---
function simulateWhatsAppNotification(appointment) {
    // In a real scenario, you'd use a backend service for this.
    const message = `New Appointment:\nPatient: ${loggedInPatient.name}\nDate & Time: ${appointment.date} ${appointment.time}\nType: ${appointment.type}\nMessage: ${appointment.message}`;
    console.log('Simulated WhatsApp Notification:', message);
    alert('Appointment saved! (Simulated WhatsApp notification sent)');
}

// --- Testimonial Carousel ---
const testimonials = document.querySelectorAll('.testimonial');
let testimonialIndex = 0;

function showTestimonial(index) {
    testimonials.forEach(testimonial => testimonial.classList.remove('active'));
    testimonials[index].classList.add('active');
}

function nextTestimonial() {
   testimonialIndex = (testimonialIndex + 1) % testimonials.length;
  showTestimonial(testimonialIndex);
}

// Initial setup
showTestimonial(testimonialIndex);

// Automatic carousel
setInterval(nextTestimonial, 5000); // Change testimonial every 5 seconds