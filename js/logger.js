const LoggerService = {
    config: {
        enabled: true,
        logLevel: 'info', // debug, info, warn, error
        saveToFile: true,
        filePath: 'd:/movimentoepensamento/logs/'
    },

    async logAction(type, data) {
        if (!this.config.enabled) return;

        const logEntry = {
            timestamp: new Date().toISOString(),
            type,
            data,
            user: auth.getCurrentUser()
        };

        try {
            await fetch('/api/logs', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${auth.token}`
                },
                body: JSON.stringify(logEntry)
            });

            if (this.config.saveToFile) {
                this.saveToFile(logEntry);
            }

            console.log(`[${type}]`, data);
        } catch (error) {
            console.error('Erro ao registrar log:', error);
        }
    },

    saveToFile(logEntry) {
        const fileName = `${new Date().toISOString().split('T')[0]}.log`;
        const fullPath = this.config.filePath + fileName;
        
        // Implementar salvamento em arquivo
        console.log('Salvando log em:', fullPath);
    }
};

// Exportar módulo
if (typeof module !== 'undefined' && module.exports) {
    module.exports = LoggerService;
}