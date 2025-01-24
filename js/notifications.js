const NotificationService = {
    async enviarNotificacao(tipo, dados) {
        try {
            const response = await fetch('/api/notificacoes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${auth.token}`
                },
                body: JSON.stringify({ tipo, dados })
            });
            return await response.json();
        } catch (error) {
            console.error('Erro ao enviar notificação:', error);
        }
    },

    async notificarAgendamento(agendamento) {
        await this.enviarNotificacao('agendamento', {
            pacienteId: agendamento.paciente_id,
            data: agendamento.data,
            hora: agendamento.hora
        });
    },

    async notificarCancelamento(agendamento) {
        await this.enviarNotificacao('cancelamento', {
            pacienteId: agendamento.paciente_id,
            data: agendamento.data
        });
    },

    async registrarLog(acao, dados) {
        try {
            await fetch('/api/logs', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${auth.token}`
                },
                body: JSON.stringify({
                    acao,
                    dados,
                    timestamp: new Date()
                })
            });
        } catch (error) {
            console.error('Erro ao registrar log:', error);
        }
    }
};