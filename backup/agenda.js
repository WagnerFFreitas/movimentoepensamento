document.addEventListener('DOMContentLoaded', function () {
    let db = {
      users: {},
      agendamentos: {},
    };
    let nextUserId = 1;
    let nextAgendamentoId = 1;
  
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
        password,
      };
      db.users[newUser.id] = newUser;
       localStorage.setItem('db', JSON.stringify(db));
      return newUser;
    }
    function createAgendamento(userId, message, dataHora) {
      const newAgendamento = {
        id: nextAgendamentoId++,
        userId,
        message,
        dataHora,
        status: 'agendado',
      };
      db.agendamentos[newAgendamento.id] = newAgendamento;
        localStorage.setItem('db', JSON.stringify(db));
      return newAgendamento;
    }
    function fetchAgendamentos() {
      const userId = localStorage.getItem('userId');
      const agendamentosList = document.getElementById('agendamentos-list');
      agendamentosList.innerHTML = '';
  
      const user = localStorage.getItem('userId');
      if (user) {
        Object.values(db.agendamentos).forEach((agendamento) => {
          if (agendamento.userId === parseInt(userId)) {
            const row = agendamentosList.insertRow();
            const cellDataHora = row.insertCell();
            const cellMensagem = row.insertCell();
            const cellStatus = row.insertCell();
            cellDataHora.textContent = agendamento.dataHora;
            cellMensagem.textContent = agendamento.message;
            cellStatus.textContent = agendamento.status;
          }
        });
      } else {
        const mensagem = document.createElement('p');
        mensagem.innerHTML = 'Você precisa fazer login para ver seus agendamentos';
        agendamentosList.appendChild(mensagem);
      }
    }
    const agendamentoForm = document.getElementById('agendamento-form');
  
    agendamentoForm.addEventListener('submit', function (event) {
      event.preventDefault();
      const dataHora = this.querySelector('#data-hora').value;
      const message = this.querySelector('textarea').value;
      const userId = localStorage.getItem('userId');
      createAgendamento(userId, message, dataHora);
      fetchAgendamentos();
      agendamentoForm.reset();
    });
    const logoutButton = document.getElementById('logout-button');
    logoutButton.addEventListener('click', () => {
      localStorage.removeItem('userId');
      window.location.href = 'index.html';
    });
      const user = localStorage.getItem('userId');
      if(user){
         fetchAgendamentos();
      }
  });