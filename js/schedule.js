const ScheduleService = {
    config: {
        diasSemana: ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta'],
        horaInicio: '08:00',
        horaFim: '18:00',
        intervaloAlmoco: {
            inicio: '12:00',
            fim: '13:00'
        },
        intervaloPadrao: 30, // minutos entre consultas
        feriados: []
    },

    async configurarHorario(profissionalId, dados) {
        try {
            const horario = {
                profissional: profissionalId,
                diasTrabalho: dados.dias || this.config.diasSemana,
                horarios: dados.horarios || {
                    inicio: this.config.horaInicio,
                    fim: this.config.horaFim
                },
                intervaloAlmoco: dados.intervaloAlmoco || this.config.intervaloAlmoco,
                intervaloConsulta: dados.intervaloConsulta || this.config.intervaloPadrao,
                excecoes: dados.excecoes || []
            };

            const response = await fetch('/api/schedules', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${auth.token}`
                },
                body: JSON.stringify(horario)
            });

            await LoggerService.logAction('HORARIO_CONFIGURADO', horario);
            return await response.json();

        } catch (error) {
            console.error('Erro ao configurar horário:', error);
            throw error;
        }
    }
};

// Exportar módulo
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ScheduleService;
}