const SMSService = {
    config: {
        apiKey: 'sua_chave_api_sms',
        apiUrl: 'https://api.sms.com.br/v1',
        sender: 'CLINICA',
        templates: {
            agendamento: 'Olá {nome}, sua consulta está marcada para {data} às {hora}.',
            lembrete: 'Lembrete: Sua consulta é amanhã às {hora}.',
            cancelamento: 'Sua consulta do dia {data} foi cancelada.'
        }
    },

    async enviarSMS(telefone, tipo, dados) {
        try {
            const mensagem = this.formatarMensagem(tipo, dados);
            
            const response = await fetch(`${this.config.apiUrl}/send`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${this.config.apiKey}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    to: this.formatarTelefone(telefone),
                    message: mensagem,
                    sender: this.config.sender
                })
            });

            const result = await response.json();
            await LoggerService.logAction('SMS_ENVIADO', {
                telefone,
                tipo,
                status: result.status
            });

            return result;

        } catch (error) {
            console.error('Erro ao enviar SMS:', error);
            throw error;
        }
    },

    formatarMensagem(tipo, dados) {
        let template = this.config.templates[tipo];
        return template.replace(/{(\w+)}/g, (match, key) => dados[key] || match);
    },

    formatarTelefone(telefone) {
        return telefone.replace(/\D/g, '');
    }
};

// Exportar módulo
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SMSService;
}