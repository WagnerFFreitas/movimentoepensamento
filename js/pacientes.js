const pacienteService = {
    async listarPacientes() {
        try {
            const response = await fetch('/api/pacientes', {
                headers: {
                    'Authorization': `Bearer ${auth.token}`
                }
            });
            return await response.json();
        } catch (error) {
            console.error('Erro ao listar pacientes:', error);
            return [];
        }
    },

    async salvarPaciente(paciente) {
        try {
            const response = await fetch('/api/pacientes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${auth.token}`
                },
                body: JSON.stringify(paciente)
            });
            return await response.json();
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