const agendamentoService = {
    async listarAgendamentos() {
        try {
            // Simulação - substituir por API real
            return [
                { 
                    id: 1, 
                    paciente: 'João Silva',
                    data: '2024-03-20',
                    hora: '14:30',
                    status: 'confirmado'
                },
                { 
                    id: 2, 
                    paciente: 'Maria Santos',
                    data: '2024-03-21',
                    hora: '10:00',
                    status: 'pendente'
                }
            ];
        } catch (error) {
            console.error('Erro ao listar agendamentos:', error);
            return [];
        }
    },

    async salvarAgendamento(agendamento) {
        try {
            // Simulação - substituir por API real
            console.log('Agendamento salvo:', agendamento);
            return { success: true, message: 'Agendamento realizado com sucesso!' };
        } catch (error) {
            console.error('Erro ao salvar agendamento:', error);
            return { success: false, message: 'Erro ao realizar agendamento.' };
        }
    }
};

// Funções UI
function showModalAgendamento() {
    carregarPacientes();
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

document.getElementById('formAgendamento')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const agendamento = {
        paciente_id: document.getElementById('paciente').value,
        data: document.getElementById('data').value,
        hora: document.getElementById('hora').value
    };
    const result = await agendamentoService.salvarAgendamento(agendamento);
    if (result.success) {
        closeModal();
        carregarAgendamentos();
    }
    alert(result.message);
});