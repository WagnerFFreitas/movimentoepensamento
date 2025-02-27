const BillingService = {
    config: {
        moeda: 'BRL',
        impostos: {
            iss: 0.05,  // 5%
            irrf: 0.15  // 15%
        },
        formasPagamento: [
            'Dinheiro',
            'Cartão Débito',
            'Cartão Crédito',
            'PIX',
            'Convênio'
        ],
        parcelamento: {
            maxParcelas: 12,
            valorMinimoParcela: 50.00
        }
    },

    async gerarFatura(dados) {
        try {
            const fatura = {
                paciente: dados.pacienteId,
                servicos: dados.servicos,
                subtotal: this.calcularSubtotal(dados.servicos),
                impostos: this.calcularImpostos(dados.servicos),
                total: 0,
                formaPagamento: dados.formaPagamento,
                status: 'pendente',
                dataEmissao: new Date()
            };

            fatura.total = fatura.subtotal + fatura.impostos;

            const response = await fetch('/api/billing', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${auth.token}`
                },
                body: JSON.stringify(fatura)
            });

            await LoggerService.logAction('FATURA_GERADA', fatura);
            return await response.json();

        } catch (error) {
            console.error('Erro ao gerar fatura:', error);
            throw error;
        }
    }
};

// Exportar módulo
if (typeof module !== 'undefined' && module.exports) {
    module.exports = BillingService;
}