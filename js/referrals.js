const ReferralService = {
    config: {
        tipos: {
            encaminhamento: {
                template: 'modelo_encaminhamento',
                campos: ['especialidade', 'motivo', 'urgencia']
            },
            contraReferencia: {
                template: 'modelo_contraref',
                campos: ['avaliacao', 'conduta', 'retorno']
            }
        },
        especialidades: [
            'Neurologia',
            'Ortopedia',
            'Cardiologia',
            'Reumatologia'
        ],
        nivelUrgencia: [
            'Normal',
            'Prioritário',
            'Urgente'
        ]
    },

    async criarEncaminhamento(dados) {
        try {
            const encaminhamento = {
                paciente: dados.pacienteId,
                profissionalOrigem: dados.profissionalId,
                especialidade: dados.especialidade,
                motivo: dados.motivo,
                urgencia: dados.urgencia || 'Normal',
                data: new Date(),
                status: 'pendente'
            };

            const response = await fetch('/api/referrals', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${auth.token}`
                },
                body: JSON.stringify(encaminhamento)
            });

            await LoggerService.logAction('ENCAMINHAMENTO_CRIADO', encaminhamento);
            return await response.json();

        } catch (error) {
            console.error('Erro ao criar encaminhamento:', error);
            throw error;
        }
    }
};

// Exportar módulo
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ReferralService;
}