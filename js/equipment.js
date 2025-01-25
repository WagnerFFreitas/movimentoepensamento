const EquipmentService = {
    config: {
        categorias: [
            'Fisioterapia',
            'Diagnóstico',
            'Reabilitação',
            'Exercícios'
        ],
        alertaManutencao: 30, // dias antes
        registroUso: true
    },

    async cadastrarEquipamento(equipamento) {
        try {
            const response = await fetch('/api/equipment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${auth.token}`
                },
                body: JSON.stringify({
                    nome: equipamento.nome,
                    categoria: equipamento.categoria,
                    modelo: equipamento.modelo,
                    numeroSerie: equipamento.numeroSerie,
                    dataAquisicao: equipamento.dataAquisicao,
                    proximaManutencao: equipamento.proximaManutencao
                })
            });

            await LoggerService.logAction('EQUIPAMENTO_CADASTRADO', equipamento);
            return await response.json();

        } catch (error) {
            console.error('Erro ao cadastrar equipamento:', error);
            throw error;
        }
    },

    async agendarManutencao(equipamentoId, data) {
        // Implementar agendamento de manutenção
    },

    async registrarUso(equipamentoId, dados) {
        // Implementar registro de utilização
    }
};

// Exportar módulo
if (typeof module !== 'undefined' && module.exports) {
    module.exports = EquipmentService;
}