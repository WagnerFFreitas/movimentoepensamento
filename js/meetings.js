const MeetingService = {
    config: {
        tiposReuniao: [
            'Discussão de Caso',
            'Reunião Administrativa',
            'Treinamento',
            'Planejamento'
        ],
        duracaoPadrao: 60, // minutos
        salasPossiveis: [
            'Sala de Reunião 1',
            'Sala de Reunião 2',
            'Auditório'
        ],
        lembretes: {
            antecedencia: 30, // minutos
            canais: ['email', 'sms']
        }
    },

    async agendarReuniao(dados) {
        try {
            const reuniao = {
                tipo: dados.tipo,
                titulo: dados.titulo,
                descricao: dados.descricao,
                data: dados.data,
                horario: dados.horario,
                duracao: dados.duracao || this.config.duracaoPadrao,
                sala: dados.sala,
                participantes: dados.participantes,
                organizador: dados.organizadorId,
                status: 'agendada'
            };

            const response = await fetch('/api/meetings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${auth.token}`
                },
                body: JSON.stringify(reuniao)
            });

            await LoggerService.logAction('REUNIAO_AGENDADA', reuniao);
            return await response.json();

        } catch (error) {
            console.error('Erro ao agendar reunião:', error);
            throw error;
        }
    }
};

// Exportar módulo
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MeetingService;
}