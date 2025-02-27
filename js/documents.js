const DocumentService = {
    config: {
        tipos: {
            laudoMedico: {
                template: 'laudo_padrao',
                validade: 90 // dias
            },
            atestado: {
                template: 'atestado_padrao',
                validade: 30 // dias
            },
            prescricao: {
                template: 'prescricao_padrao',
                validade: 30 // dias
            }
        },
        assinaturaDigital: true,
        versionamento: true
    },

    async gerarDocumento(tipo, dados) {
        try {
            const documento = {
                tipo: tipo,
                paciente: dados.pacienteId,
                profissional: dados.profissionalId,
                conteudo: await this.preencherTemplate(tipo, dados),
                dataGeracao: new Date(),
                versao: '1.0'
            };

            const response = await fetch('/api/documents', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${auth.token}`
                },
                body: JSON.stringify(documento)
            });

            await LoggerService.logAction('DOCUMENTO_GERADO', documento);
            return await response.json();

        } catch (error) {
            console.error('Erro ao gerar documento:', error);
            throw error;
        }
    }
};

// Exportar módulo
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DocumentService;
}