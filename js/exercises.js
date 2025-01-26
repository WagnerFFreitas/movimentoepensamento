const ExerciseService = {
    config: {
        categorias: [
            'Alongamento',
            'Fortalecimento',
            'Equilíbrio',
            'Coordenação',
            'Respiratórios'
        ],
        niveis: ['Iniciante', 'Intermediário', 'Avançado'],
        duracaoPadrao: 30 // minutos
    },

    async criarProtocolo(dados) {
        try {
            const protocolo = {
                paciente: dados.pacienteId,
                profissional: dados.profissionalId,
                exercicios: dados.exercicios.map(ex => ({
                    ...ex,
                    series: ex.series || 3,
                    repeticoes: ex.repeticoes || 10,
                    duracao: ex.duracao || 30
                })),
                dataCriacao: new Date(),
                observacoes: dados.observacoes
            };

            const response = await fetch('/api/protocols', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${auth.token}`
                },
                body: JSON.stringify(protocolo)
            });

            await LoggerService.logAction('PROTOCOLO_CRIADO', protocolo);
            return await response.json();

        } catch (error) {
            console.error('Erro ao criar protocolo:', error);
            throw error;
        }
    }
};

// Exportar módulo
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ExerciseService;
}