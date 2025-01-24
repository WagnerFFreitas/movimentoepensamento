const EmailService = {
    config: {
        smtp: {
            host: 'smtp.clinica.com',
            port: 587,
            secure: false,
            auth: {
                user: 'sistema@clinica.com',
                pass: 'senha_segura'
            }
        },
        templates: {
            agendamento: {
                subject: 'Confirmação de Agendamento',
                body: `
                    <h2>Confirmação de Agendamento</h2>
                    <p>Olá {nome},</p>
                    <p>Sua consulta está agendada para {data} às {hora}.</p>
                    <p>Local: Clínica Movimento e Pensamento</p>
                `
            },
            lembrete: {
                subject: 'Lembrete de Consulta',
                body: `
                    <h2>Lembrete de Consulta</h2>
                    <p>Olá {nome},</p>
                    <p>Sua consulta está marcada para amanhã às {hora}.</p>
                    <p>Por favor, confirme sua presença.</p>
                `
            }
        }
    },

    async enviarEmail(destinatario, tipo, dados) {
        try {
            const template = this.config.templates[tipo];
            const conteudo = this.formatarTemplate(template, dados);
            
            const response = await fetch('/api/email/send', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    to: destinatario,
                    subject: template.subject,
                    html: conteudo
                })
            });
            
            return await response.json();
        } catch (error) {
            console.error('Erro ao enviar email:', error);
            throw error;
        }
    },

    formatarTemplate(template, dados) {
        return template.body.replace(/{(\w+)}/g, (match, key) => dados[key] || match);
    }
};

// Exportar módulo
if (typeof module !== 'undefined' && module.exports) {
    module.exports = EmailService;
}