const TreatmentService = {
    config: {
        tipos: [
            'Fisioterapia Convencional',
            'RPG',
            'Pilates',
            'Hidroterapia',
            'Terapia Manual'
        ],
        duracao: {
            padrao: 12, // sessões
            minimo: 6,
            maximo: 24
        },
        frequencia: [
            { id: 1, nome: '1x por semana' },
            { id: 2, nome: '2x por semana' },
            { id: 3, nome: '3x por semana' }
        ]
    },

    async criarTratamento(dados) {
        try {
            const tratamento = {
                paciente: dados.pacienteId,
                profissional: dados.profissionalId,
                tipo: dados.tipo,
                objetivo: dados.objetivo,
                duracao: dados.duracao || this.config.duracao.padrao,
                frequencia: dados.frequencia,
                dataInicio: dados.dataInicio || new Date(),
                status: 'ativo'
            };

            const response = await fetch('/api/treatments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${auth.token}`
                },
                body: JSON.stringify(tratamento)
            });

            await LoggerService.logAction('TRATAMENTO_CRIADO', tratamento);
            return await response.json();

        } catch (error) {
            console.error('Erro ao criar tratamento:', error);
            throw error;
        }
    }
};

// Exportar módulo
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TreatmentService;
}