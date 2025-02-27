const FileService = {
    config: {
        tipos: {
            exames: ['jpg', 'png', 'pdf'],
            laudos: ['pdf', 'doc', 'docx'],
            prescricoes: ['pdf']
        },
        tamanhoMaximo: 10 * 1024 * 1024, // 10MB
        pastaArquivos: 'd:/movimentoepensamento/uploads/medical/'
    },

    async uploadArquivo(arquivo, tipo, pacienteId) {
        try {
            const extensao = this.getFileExtension(arquivo.name);
            
            if (!this.validarArquivo(arquivo, tipo)) {
                throw new Error('Tipo de arquivo não permitido');
            }

            const nomeArquivo = `${pacienteId}_${Date.now()}.${extensao}`;
            const formData = new FormData();
            formData.append('file', arquivo);
            formData.append('nome', nomeArquivo);

            const response = await fetch('/api/files/upload', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${auth.token}`
                },
                body: formData
            });

            await LoggerService.logAction('ARQUIVO_UPLOAD', {
                paciente: pacienteId,
                arquivo: nomeArquivo
            });

            return await response.json();

        } catch (error) {
            console.error('Erro no upload:', error);
            throw error;
        }
    },

    getFileExtension(filename) {
        return filename.split('.').pop().toLowerCase();
    }
};

// Exportar módulo
if (typeof module !== 'undefined' && module.exports) {
    module.exports = FileService;
}