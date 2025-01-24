const dashboard = {
    async init() {
        if (!auth.isAuthenticated()) {
            window.location.href = 'login.html';
            return;
        }
        await this.carregarEstatisticas();
        this.bindEvents();
    },

    async carregarEstatisticas() {
        try {
            // Simulação de dados - substituir por API real
            const stats = {
                totalPacientes: 150,
                consultasHoje: 25,
                agendamentosPendentes: 10
            };
            this.atualizarDashboard(stats);
        } catch (error) {
            console.error('Erro ao carregar estatísticas:', error);
        }
    },

    atualizarDashboard(stats) {
        document.getElementById('totalPacientes').textContent = stats.totalPacientes;
        document.getElementById('consultasHoje').textContent = stats.consultasHoje;
        document.getElementById('agendamentosPendentes').textContent = stats.agendamentosPendentes;
    },

    bindEvents() {
        document.getElementById('btnLogout')?.addEventListener('click', () => {
            auth.logout();
        });
    }
};

document.addEventListener('DOMContentLoaded', () => {
    dashboard.init();
});