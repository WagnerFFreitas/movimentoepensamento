const WhatsAppService = {
    config: {
        apiUrl: 'https://api.whatsapp.com/v1',
        apiKey: 'sua_chave_api',
        defaultMessage: {
            agendamento: 'Olá {nome}, sua consulta está marcada para {data} às {hora}.',
            confirmacao: 'Por favor, confirme sua presença respondendo SIM.',
            lembrete: 'Lembrete: Sua consulta é amanhã às {hora}.'
        }
    },

    async enviarMensagem(telefone, tipo, dados) {
        try {
            const mensagem = this.formatarMensagem(tipo, dados);
            const response = await fetch(`${this.config.apiUrl}/messages`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${this.config.apiKey}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    phone: this.formatarTelefone(telefone),
                    message: mensagem
                })
            });
            return await response.json();
        } catch (error) {
            console.error('Erro ao enviar mensagem WhatsApp:', error);
            throw error;
        }
    },

    formatarMensagem(tipo, dados) {
        let template = this.config.defaultMessage[tipo];
        return template.replace(/{(\w+)}/g, (match, key) => dados[key] || match);
    },

    formatarTelefone(telefone) {
        return telefone.replace(/\D/g, '');
    }
};

// Exportar módulo
if (typeof module !== 'undefined' && module.exports) {
    module.exports = WhatsAppService;
}