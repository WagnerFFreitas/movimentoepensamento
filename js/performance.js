const PerformanceService = {
    config: {
        metricas: {
            tempoResposta: true,
            usoMemoria: true,
            erros: true,
            requisicoesPorMinuto: true
        },
        intervaloColeta: 60000, // 1 minuto
        limites: {
            tempoRespostaMax: 2000, // 2 segundos
            memoriaMax: 512 // MB
        }
    },

    async monitorar() {
        try {
            const metricas = {
                timestamp: new Date(),
                tempoResposta: this.medirTempoResposta(),
                memoria: this.medirUsoMemoria(),
                erros: await this.coletarErros(),
                requisicoes: await this.contarRequisicoes()
            };

            await this.salvarMetricas(metricas);
            await this.verificarAlertas(metricas);

            return metricas;

        } catch (error) {
            console.error('Erro no monitoramento:', error);
            throw error;
        }
    }
};

// Exportar módulo
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PerformanceService;
}