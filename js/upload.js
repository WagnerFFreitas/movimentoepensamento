const UploadService = {
    config: {
        maxFileSize: 5 * 1024 * 1024, // 5MB
        allowedTypes: ['image/jpeg', 'image/png', 'application/pdf'],
        uploadPath: 'd:/movimentoepensamento/uploads/',
        thumbnailSize: {
            width: 150,
            height: 150
        }
    },

    async uploadFile(file, tipo) {
        try {
            if (!this.validarArquivo(file)) {
                throw new Error('Arquivo inválido');
            }

            const formData = new FormData();
            formData.append('file', file);
            formData.append('tipo', tipo);

            const response = await fetch('/api/upload', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${auth.token}`
                },
                body: formData
            });

            return await response.json();
        } catch (error) {
            console.error('Erro no upload:', error);
            throw error;
        }
    },

    validarArquivo(file) {
        if (file.size > this.config.maxFileSize) {
            console.error('Arquivo muito grande');
            return false;
        }

        if (!this.config.allowedTypes.includes(file.type)) {
            console.error('Tipo de arquivo não permitido');
            return false;
        }

        return true;
    },

    async gerarThumbnail(imageFile) {
        // Implementar geração de thumbnail
        console.log('Gerando thumbnail para:', imageFile.name);
    }
};

// Exportar módulo
if (typeof module !== 'undefined' && module.exports) {
    module.exports = UploadService;
}