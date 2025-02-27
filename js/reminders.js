const ReminderService = {
    config: {
        tipos: {
            consulta: {
                antecedencia: 24, // horas
                canais: ['email', 'sms', 'whatsapp']
            },
            exame: {
                antecedencia: 48, // horas
                canais: ['email', 'sms']
            },
            medicacao: {
                frequencia: 'diária',
                canais: ['push', 'sms']
            }
        },
        prioridades: ['baixa', 'média', 'alta'],
        tentativasMaximas: 3
    },

    async criarLembrete(dados) {
        try {
            const lembrete = {
                tipo: dados.tipo,
                paciente: dados.pacienteId,
                titulo: dados.titulo,
                mensagem: dados.mensagem,
                dataHora: dados.dataHora,
                canais: dados.canais || this.config.tipos[dados.tipo].canais,
                prioridade: dados.prioridade || 'média',
                status: 'pendente'
            };

            const response = await fetch('/api/reminders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${auth.token}`
                },
                body: JSON.stringify(lembrete)
            });

            await LoggerService.logAction('LEMBRETE_CRIADO', lembrete);
            return await response.json();

        } catch (error) {
            console.error('Erro ao criar lembrete:', error);
            throw error;
        }
    }
};

// Exportar módulo
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ReminderService;
}