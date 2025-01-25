const MedicineService = {
    config: {
        alertaEstoqueMinimo: 10,
        alertaVencimento: 30, // dias
        categorias: [
            'Analgésicos',
            'Anti-inflamatórios',
            'Antibióticos',
            'Controlados'
        ]
    },

    async adicionarMedicamento(medicamento) {
        try {
            const response = await fetch('/api/medicines', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${auth.token}`
                },
                body: JSON.stringify({
                    nome: medicamento.nome,
                    categoria: medicamento.categoria,
                    quantidade: medicamento.quantidade,
                    validade: medicamento.validade,
                    lote: medicamento.lote
                })
            });

            await LoggerService.logAction('MEDICAMENTO_ADICIONADO', medicamento);
            return await response.json();

        } catch (error) {
            console.error('Erro ao adicionar medicamento:', error);
            throw error;
        }
    },

    verificarEstoque() {
        // Implementar verificação de estoque mínimo
        // Enviar alertas se necessário
    },

    verificarValidade() {
        // Implementar verificação de validade
        // Enviar alertas para medicamentos próximos ao vencimento
    }
};

// Exportar módulo
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MedicineService;
}