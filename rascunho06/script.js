// Controles do Modal
const loginBtn = document.getElementById('loginBtn');
const loginModal = document.getElementById('loginModal');
const registerModal = document.getElementById('registerModal');
const closeButtons = document.querySelectorAll('.close');
const showRegisterLink = document.getElementById('showRegister');

loginBtn.onclick = () => loginModal.style.display = "block";

showRegisterLink.onclick = (e) => {
    e.preventDefault();
    loginModal.style.display = "none";
    registerModal.style.display = "block";
}

closeButtons.forEach(button => {
    button.onclick = () => {
        loginModal.style.display = "none";
        registerModal.style.display = "none";
    }
});

window.onclick = (e) => {
    if (e.target == loginModal || e.target == registerModal) {
        loginModal.style.display = "none";
        registerModal.style.display = "none";
    }
}

// Manipulação dos formulários
document.getElementById('loginForm').onsubmit = (e) => {
    e.preventDefault();
    // Adicionar lógica de login aqui
}

document.getElementById('registerForm').onsubmit = (e) => {
    e.preventDefault();
    // Adicionar lógica de registro aqui
}