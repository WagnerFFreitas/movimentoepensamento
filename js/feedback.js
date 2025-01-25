const FeedbackService = {
    config: {
        tiposAvaliacao: {
            atendimento: {
                titulo: 'Avaliação do Atendimento',
                perguntas: [
                    'Como você avalia o atendimento?',
                    'O profissional foi pontual?',
                    'Suas expectativas foram atendidas?'
                ]
            },
            infraestrutura: {
                titulo: 'Avaliação da Infraestrutura',
                perguntas: [
                    'Como você avalia as instalações?',
                    'O ambiente estava limpo?',
                    'Os equipamentos funcionaram bem?'
                ]
            }
        },
        escalaPontuacao: [1, 2, 3, 4, 5],
        lembreteAvaliar: true
    },

    async enviarAvaliacao(dados) {
        try {
            const avaliacao = {
                paciente: dados.pacienteId,
                consulta: dados.consultaId,
                tipo: dados.tipo,
                respostas: dados.respostas,
                comentario: dados.comentario,
                data: new Date()
            };

            const response = await fetch('/api/feedback', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${auth.token}`
                },
                body: JSON.stringify(avaliacao)
            });

            await LoggerService.logAction('AVALIACAO_ENVIADA', avaliacao);
            return await response.json();

        } catch (error) {
            console.error('Erro ao enviar avaliação:', error);
            throw error;
        }
    }
};

// Exportar módulo
if (typeof module !== 'undefined' && module.exports) {
    module.exports = FeedbackService;
}