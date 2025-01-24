const pacienteService = {
    async listarPacientes() {
        try {
            // Simulação de dados - substituir por API real
            return [
                { id: 1, nome: 'João Silva', cpf: '123.456.789-00', email: 'joao@email.com', telefone: '(11) 99999-9999' },
                { id: 2, nome: 'Maria Santos', cpf: '987.654.321-00', email: 'maria@email.com', telefone: '(11) 88888-8888' }
            ];
        } catch (error) {
            console.error('Erro ao listar pacientes:', error);
            return [];
        }
    },

    async salvarPaciente(paciente) {
        try {
            // Simulação - substituir por API real
            console.log('Paciente salvo:', paciente);
            return { success: true, message: 'Paciente salvo com sucesso!' };
        } catch (error) {
            console.error('Erro ao salvar paciente:', error);
            return { success: false, message: 'Erro ao salvar paciente.' };
        }
    }
};

// Funções UI
function showModalPaciente() {
    document.getElementById('modalPaciente').style.display = 'block';
}

function closeModal() {
    document.getElementById('modalPaciente').style.display = 'none';
}

async function carregarPacientes() {
    const pacientes = await pacienteService.listarPacientes();
    const tbody = document.querySelector('#tabelaPacientes tbody');
    tbody.innerHTML = pacientes.map(p => `
        <tr>
            <td>${p.nome}</td>
            <td>${p.cpf}</td>
            <td>${p.email}</td>
            <td>${p.telefone}</td>
            <td>
                <button onclick="editarPaciente(${p.id})">Editar</button>
                <button onclick="excluirPaciente(${p.id})">Excluir</button>
            </td>
        </tr>
    `).join('');
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    if (!auth.isAuthenticated()) {
        window.location.href = 'login.html';
        return;
    }
    carregarPacientes();
});

document.getElementById('formPaciente')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const paciente = {
        nome: document.getElementById('nome').value,
        cpf: document.getElementById('cpf').value,
        email: document.getElementById('email').value,
        telefone: document.getElementById('telefone').value
    };
    const result = await pacienteService.salvarPaciente(paciente);
    if (result.success) {
        closeModal();
        carregarPacientes();
    }
    alert(result.message);
});