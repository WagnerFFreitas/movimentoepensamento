const testimonialContainer = document.querySelector('.testimonial-container');
const testimonialSlides = document.querySelectorAll('.testimonial-slide');
const prevButton = document.querySelector('.prev-button');
const nextButton = document.querySelector('.next-button');
const dotsContainer = document.querySelector('.carousel-dots');
const dots = document.querySelectorAll('.dot');

let currentSlide = 0;


// Elementos do calendário
const calendarDays = document.getElementById("calendar-days");
const prevMonthBtn = document.getElementById("prevMonthBtn");
const nextMonthBtn = document.getElementById("nextMonthBtn");
const currentMonthTitle = document.getElementById("currentMonth");


//Elementos do formulário de registro de paciente
const patientForm = document.getElementById('patientForm');
const patientNameInput = document.getElementById('patientName');
const patientEmailInput = document.getElementById('patientEmail');
const patientPhoneInput = document.getElementById('patientPhone');
const registrationMessage = document.getElementById('registrationMessage')


//Elementos do agendamento
const appointmentForm = document.getElementById('appointmentForm');
const sessionTypeSelect = document.getElementById('sessionType');
const additionalNotesInput = document.getElementById('additionalNotes');
const appointmentMessage = document.getElementById('appointmentMessage');
const appointmentsList = document.getElementById('appointments')
const timeSelector = document.getElementById('timeSelector');


//Informações da data
let currentDate = new Date();
let selectedDate = null;
let appointments = JSON.parse(localStorage.getItem('appointments')) || [];

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



// Funcionalidade do calendário
function generateCalendar(date){
    calendarDays.innerHTML = ''; //Limpar o calendário antes de gerar
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    const lastDay = new Date(date.getFullYear(), date.getMonth()+ 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const currentMonthName = monthNames[date.getMonth()];
    currentMonthTitle.textContent = `${currentMonthName} ${date.getFullYear()}`;



    //Gerar dias vazios no começo do mês
    for (let i=0; i<startingDay; i++){
        const emptyDiv = document.createElement('div');
        calendarDays.appendChild(emptyDiv);
    }

      // Gerar os dias do mês
    for (let i = 1; i <= daysInMonth; i++) {
        const dayDiv = document.createElement('div');
        dayDiv.textContent = i;

         if(selectedDate && selectedDate.getDate() === i && selectedDate.getMonth() === date.getMonth() && selectedDate.getFullYear() === date.getFullYear()){
             dayDiv.classList.add('selected');
         }



        dayDiv.addEventListener('click', () =>{
            const previousSelected = calendarDays.querySelector('.selected');
              if(previousSelected){
                previousSelected.classList.remove('selected')
            }

              dayDiv.classList.add('selected')
             selectedDate = new Date(date.getFullYear(), date.getMonth(), i)

        })

         calendarDays.appendChild(dayDiv)
    }
}




function handleNextMonth(){
    currentDate.setMonth(currentDate.getMonth()+1)
    generateCalendar(currentDate)
}

function handlePrevMonth(){
    currentDate.setMonth(currentDate.getMonth()-1);
    generateCalendar(currentDate);
}

prevMonthBtn.addEventListener('click', handlePrevMonth)
nextMonthBtn.addEventListener('click', handleNextMonth)



// Functionality to register patient
patientForm.addEventListener('submit', function(event){
     event.preventDefault();
    const patientName = patientNameInput.value.trim()
    const patientEmail = patientEmailInput.value.trim()
    const patientPhone = patientPhoneInput.value.trim()


      // Simple validation
    if(!patientName || !patientEmail || !patientPhone){
        registrationMessage.textContent = 'Please fill in all the fields';
         return;
    }


    // Save Patient
   const patientInfo = {
        name: patientName,
       email: patientEmail,
      phone: patientPhone,
   }

    localStorage.setItem('patientInfo', JSON.stringify(patientInfo));
   registrationMessage.textContent = 'Patient registered sucessfully';
    patientForm.reset();
});



//Funcionalidade para agendar consulta
appointmentForm.addEventListener('submit', function (event) {
    event.preventDefault();


    if(!selectedDate){
        appointmentMessage.textContent = 'Please select a date'
         return;
    }

    const selectedTime = timeSelector.value
      if(!selectedTime){
        appointmentMessage.textContent = 'Please select a time'
        return;
    }

    const sessionType = sessionTypeSelect.value;
    const additionalNotes = additionalNotesInput.value.trim();
     const patientInfo = JSON.parse(localStorage.getItem('patientInfo'));


    const appointment = {
       date: selectedDate.toISOString(),
        time: selectedTime,
       sessionType: sessionType,
       additionalNotes: additionalNotes,
       patientInfo: patientInfo ? patientInfo: null,

    };


    appointments.push(appointment)
     localStorage.setItem('appointments', JSON.stringify(appointments));

    displayAppointments()
     appointmentMessage.textContent = 'Appointment scheduled successfully!';

       // Send WhatsApp Message
    const clinicNumber = '5521900000000'; // Replace with clinic's WhatsApp number
     const formattedDate = selectedDate.toLocaleDateString('pt-BR', {
            day: '2-digit',
             month: '2-digit',
             year: 'numeric'
       });
      const formattedTime = selectedTime
   const message = encodeURIComponent(
        `New Appointment Scheduled:\nDate: ${formattedDate}\nTime: ${formattedTime}\nSession Type: ${sessionType}\nAdditional Notes: ${additionalNotes}\nPatient: ${patientInfo ? patientInfo.name : 'Unregistered'}`
    );

    window.open(`https://wa.me/${clinicNumber}?text=${message}`, '_blank');
      appointmentForm.reset()
      selectedDate = null;
      const previousSelected = calendarDays.querySelector('.selected');
      if(previousSelected){
         previousSelected.classList.remove('selected')
        }
});




// Function to display appointments
function displayAppointments() {
    appointmentsList.innerHTML = '';
    appointments.forEach((appointment, index) => {
      const appointmentDate = new Date(appointment.date)
      const formattedDate = appointmentDate.toLocaleDateString('pt-BR', {
            day: '2-digit',
             month: '2-digit',
             year: 'numeric'
       });

        const li = document.createElement('li');
        li.innerHTML =
          `<div> <strong>Date:</strong> ${formattedDate}<br>
            <strong>Time:</strong> ${appointment.time}<br>
            <strong>Session Type:</strong> ${appointment.sessionType}<br>
            <strong>Additional Notes:</strong> ${appointment.additionalNotes}
           </div>
            `
        appointmentsList.appendChild(li);
    });
}

// Initialization
updateCarousel();
updateDots();
generateCalendar(currentDate);
displayAppointments();

setInterval(nextSlide, 5000)