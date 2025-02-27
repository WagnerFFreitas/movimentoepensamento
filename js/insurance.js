const InsuranceService = {
    config: {
        convenios: [
            { id: 1, nome: 'Unimed', codigo: 'UNI' },
            { id: 2, nome: 'Amil', codigo: 'AMI' },
            { id: 3, nome: 'SulAmérica', codigo: 'SUL' }
        ],
        diasAntecedencia: 3, // dias para solicitar autorização
        validadeAutorizacao: 30 // dias
    },

    async solicitarAutorizacao(dados) {
        try {
            const solicitacao = {
                convenio: dados.convenioId,
                paciente: dados.pacienteId,
                procedimento: dados.procedimentoId,
                profissional: dados.profissionalId,
                data: dados.data,
                numeroCarteira: dados.numeroCarteira
            };

            const response = await fetch('/api/insurance/auth', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${auth.token}`
                },
                body: JSON.stringify(solicitacao)
            });

            await LoggerService.logAction('AUTORIZACAO_SOLICITADA', solicitacao);
            return await response.json();

        } catch (error) {
            console.error('Erro na solicitação:', error);
            throw error;
        }
    }
};

// Exportar módulo
if (typeof module !== 'undefined' && module.exports) {
    module.exports = InsuranceService;
}