const prontuarioService = {
    async listarProntuarios(pacienteId) {
        try {
            const response = await fetch(`/api/prontuarios/${pacienteId}`, {
                headers: {
                    'Authorization': `Bearer ${auth.token}`
                }
            });
            return await response.json();
        } catch (error) {
            console.error('Erro ao listar prontuários:', error);
            return [];
        }
    },

    async salvarProntuario(prontuario) {
        try {
            const response = await fetch('/api/prontuarios', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${auth.token}`
                },
                body: JSON.stringify(prontuario)
            });
            return await response.json();
        } catch (error) {
            console.error('Erro ao salvar prontuário:', error);
            return { success: false, message: 'Erro ao salvar prontuário.' };
        }
    }
};

// Funções UI
function showModalProntuario() {
    document.getElementById('modalProntuario').style.display = 'block';
}

function closeModal() {
    document.getElementById('modalProntuario').style.display = 'none';
}

async function carregarProntuarios(pacienteId) {
    const prontuarios = await prontuarioService.listarProntuarios(pacienteId);
    const container = document.getElementById('prontuariosList');
    container.innerHTML = prontuarios.map(p => `
        <div class="prontuario-card">
            <h3>Data: ${formatarData(p.data_consulta)}</h3>
            <p><strong>Diagnóstico:</strong> ${p.diagnostico}</p>
            <p><strong>Prescrição:</strong> ${p.prescricao}</p>
        </div>
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
    
    const urlParams = new URLSearchParams(window.location.search);
    const pacienteId = urlParams.get('paciente');
    if (pacienteId) {
        carregarProntuarios(pacienteId);
    }
}); 
