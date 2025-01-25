const SupportService = {
    config: {
        prioridades: {
            baixa: 1,
            media: 2,
            alta: 3,
            urgente: 4
        },
        categorias: [
            'Dúvidas',
            'Problemas Técnicos',
            'Reclamações',
            'Sugestões'
        ],
        tempoResposta: {
            baixa: 48, // horas
            media: 24,
            alta: 12,
            urgente: 4
        }
    },

    async criarTicket(dados) {
        try {
            const ticket = {
                id: Date.now(),
                cliente: dados.cliente,
                assunto: dados.assunto,
                categoria: dados.categoria,
                prioridade: dados.prioridade || 'media',
                status: 'aberto',
                criado: new Date(),
                atualizado: new Date()
            };

            const response = await fetch('/api/support/tickets', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${auth.token}`
                },
                body: JSON.stringify(ticket)
            });

            await LoggerService.logAction('TICKET_CRIADO', ticket);
            return await response.json();

        } catch (error) {
            console.error('Erro ao criar ticket:', error);
            throw error;
        }
    },

    async atualizarStatus(ticketId, novoStatus) {
        try {
            const response = await fetch(`/api/support/tickets/${ticketId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${auth.token}`
                },
                body: JSON.stringify({ status: novoStatus })
            });

            await LoggerService.logAction('TICKET_ATUALIZADO', {
                ticketId,
                novoStatus
            });

            return await response.json();
        } catch (error) {
            console.error('Erro ao atualizar ticket:', error);
            throw error;
        }
    }
};

// Exportar módulo
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SupportService;
}