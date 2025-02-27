const IntegrationService = {
    config: {
        apis: {
            laboratorio: {
                url: 'https://api.lab.com/v1',
                token: 'seu_token_lab'
            },
            farmacia: {
                url: 'https://api.farmacia.com/v1',
                token: 'seu_token_farmacia'
            }
        },
        timeout: 30000, // 30 segundos
        retry: {
            attempts: 3,
            delay: 1000 // 1 segundo
        }
    },

    async enviarDados(servico, dados) {
        try {
            const api = this.config.apis[servico];
            let tentativas = 0;

            while (tentativas < this.config.retry.attempts) {
                try {
                    const response = await fetch(`${api.url}/send`, {
                        method: 'POST',
                        headers: {
                            'Authorization': `Bearer ${api.token}`,
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(dados)
                    });

                    return await response.json();
                } catch (error) {
                    tentativas++;
                    if (tentativas === this.config.retry.attempts) throw error;
                    await this.delay(this.config.retry.delay);
                }
            }
        } catch (error) {
            console.error('Erro na integração:', error);
            throw error;
        }
    }
};

// Exportar módulo
if (typeof module !== 'undefined' && module.exports) {
    module.exports = IntegrationService;
}