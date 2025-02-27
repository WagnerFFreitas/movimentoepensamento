const TimeSlotService = {
    config: {
        duracao: {
            padrao: 30,
            minima: 15,
            maxima: 120
        },
        horarios: {
            inicio: '08:00',
            fim: '18:00',
            almoco: ['12:00', '13:00']
        },
        intervalos: {
            entreConsultas: 5,
            almoco: 60
        }
    },

    async gerarHorarios(data, profissionalId) {
        try {
            const slots = [];
            let horaAtual = new Date(`${data}T${this.config.horarios.inicio}`);
            const horaFim = new Date(`${data}T${this.config.horarios.fim}`);

            while (horaAtual < horaFim) {
                // Verificar se não é horário de almoço
                if (!this.isHorarioAlmoco(horaAtual)) {
                    slots.push({
                        inicio: horaAtual.toISOString(),
                        fim: new Date(horaAtual.getTime() + this.config.duracao.padrao * 60000).toISOString(),
                        disponivel: true,
                        profissional: profissionalId
                    });
                }
                horaAtual = new Date(horaAtual.getTime() + this.config.duracao.padrao * 60000);
            }

            return slots;
        } catch (error) {
            console.error('Erro ao gerar horários:', error);
            throw error;
        }
    }
};

// Exportar módulo
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TimeSlotService;
}