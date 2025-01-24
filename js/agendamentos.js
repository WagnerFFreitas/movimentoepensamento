const agendamentoService = {
    async listarAgendamentos() {
        try {
            const response = await fetch('/api/agendamentos', {
                headers: {
                    'Authorization': `Bearer ${auth.token}`
                }
            });
            return await response.json();
        } catch (error) {
            console.error('Erro ao listar agendamentos:', error);
            return [];
        }
    },

    async salvarAgendamento(agendamento) {
        try {
            const response = await fetch('/api/agendamentos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${auth.token}`
                },
                body: JSON.stringify(agendamento)
            });
            return await response.json();
        } catch (error) {
            console.error('Erro ao salvar agendamento:', error);
            return { success: false, message: 'Erro ao realizar agendamento.' };
        }
    }
};

// Funções UI
function showModalAgendamento() {
    document.getElementById('modalAgendamento').style.display = 'block';
}

function closeModal() {
    document.getElementById('modalAgendamento').style.display = 'none';
}

async function carregarAgendamentos() {
    const agendamentos = await agendamentoService.listarAgendamentos();
    const tbody = document.querySelector('#tabelaAgendamentos tbody');
    tbody.innerHTML = agendamentos.map(a => `
        <tr>
            <td>${a.paciente}</td>
            <td>${formatarData(a.data)}</td>
            <td>${a.hora}</td>
            <td>${a.status}</td>
            <td>
                <button onclick="editarAgendamento(${a.id})">Editar</button>
                <button onclick="cancelarAgendamento(${a.id})">Cancelar</button>
            </td>
        </tr>
    `).join('');
}

function formatarData(data) {
    return new Date(data).toLocaleDateString('pt-BR');
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    if (!auth.isAuthenticated()) {
        window.location.href = 'login.html';
        return;
    }
    carregarAgendamentos();
});