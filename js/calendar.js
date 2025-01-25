const CalendarService = {
    config: {
        horaInicio: '08:00',
        horaFim: '18:00',
        intervaloConsulta: 30, // minutos
        diasSemana: [1, 2, 3, 4, 5], // seg a sex
        feriados: []
    },

    async getHorariosDisponiveis(data) {
        try {
            const agendamentos = await this.getAgendamentosDia(data);
            const horarios = this.gerarHorarios();
            
            return horarios.filter(horario => 
                !agendamentos.some(agenda => 
                    agenda.hora === horario
                )
            );
        } catch (error) {
            console.error('Erro ao buscar horários:', error);
            throw error;
        }
    },

    gerarHorarios() {
        const horarios = [];
        let hora = new Date(`2000-01-01 ${this.config.horaInicio}`);
        const fim = new Date(`2000-01-01 ${this.config.horaFim}`);

        while (hora < fim) {
            horarios.push(
                hora.toLocaleTimeString('pt-BR', {
                    hour: '2-digit',
                    minute: '2-digit'
                })
            );
            hora.setMinutes(hora.getMinutes() + this.config.intervaloConsulta);
        }

        return horarios;
    },

    async getAgendamentosDia(data) {
        // Implementar busca de agendamentos
        return [];
    }
};

// Exportar módulo
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CalendarService;
}