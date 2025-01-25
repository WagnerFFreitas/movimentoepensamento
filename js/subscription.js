const SubscriptionService = {
    config: {
        planos: {
            basico: {
                id: 'plano_basico',
                nome: 'Básico',
                valor: 99.90,
                consultas: 2,
                beneficios: ['Consultas Presenciais', 'Prontuário Digital']
            },
            plus: {
                id: 'plano_plus',
                nome: 'Plus',
                valor: 199.90,
                consultas: 4,
                beneficios: ['Consultas Presenciais', 'Teleconsultas', 'Prontuário Digital']
            },
            premium: {
                id: 'plano_premium',
                nome: 'Premium',
                valor: 299.90,
                consultas: 6,
                beneficios: ['Consultas Presenciais', 'Teleconsultas', 'Prontuário Digital', 'Prioridade']
            }
        },
        cicloCobranca: 'mensal', // mensal, trimestral, anual
        diasVencimento: [5, 10, 15, 20]
    },

    async assinarPlano(usuario, plano, formaPagamento) {
        try {
            const assinatura = {
                usuario: usuario.id,
                plano: plano.id,
                dataInicio: new Date(),
                status: 'ativa',
                formaPagamento,
                proximaCobranca: this.calcularProximaCobranca()
            };

            const response = await fetch('/api/assinaturas', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${auth.token}`
                },
                body: JSON.stringify(assinatura)
            });

            await LoggerService.logAction('NOVA_ASSINATURA', assinatura);
            return await response.json();

        } catch (error) {
            console.error('Erro ao criar assinatura:', error);
            throw error;
        }
    },

    calcularProximaCobranca() {
        const hoje = new Date();
        const proximaData = new Date(hoje.getFullYear(), hoje.getMonth() + 1, 10);
        return proximaData;
    }
};

// Exportar módulo
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SubscriptionService;
}