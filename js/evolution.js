const EvolutionService = {
    config: {
        tipos: {
            avaliacao: {
                campos: ['força', 'flexibilidade', 'equilíbrio', 'dor']
            },
            sessao: {
                campos: ['exercícios', 'observações', 'intercorrências']
            },
            reavaliacao: {
                campos: ['comparativo', 'objetivos', 'ajustes']
            }
        },
        alertas: {
            reavaliacao: 30, // dias
            objetivos: true
        }
    },

    async registrarEvolucao(dados) {
        try {
            const evolucao = {
                paciente: dados.pacienteId,
                profissional: dados.profissionalId,
                tipo: dados.tipo,
                data: new Date(),
                registros: dados.registros,
                anexos: dados.anexos || []
            };

            const response = await fetch('/api/evolution', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${auth.token}`
                },
                body: JSON.stringify(evolucao)
            });

            await LoggerService.logAction('EVOLUCAO_REGISTRADA', evolucao);
            return await response.json();

        } catch (error) {
            console.error('Erro ao registrar evolução:', error);
            throw error;
        }
    }
};

// Exportar módulo
if (typeof module !== 'undefined' && module.exports) {
    module.exports = EvolutionService;
}