const QRCodeService = {
    config: {
        tamanho: 256,
        margem: 4,
        corFundo: '#FFFFFF',
        corQR: '#000000',
        formato: 'PNG',
        nivelCorrecao: 'H' // L: 7%, M: 15%, Q: 25%, H: 30%
    },

    async gerarQRCode(dados) {
        try {
            const qrcode = await this.criarQR(dados);
            return {
                imagem: qrcode,
                dados: dados,
                timestamp: new Date()
            };
        } catch (error) {
            console.error('Erro ao gerar QR Code:', error);
            throw error;
        }
    },

    async criarQR(dados) {
        try {
            const response = await fetch('/api/qrcode/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    data: dados,
                    options: this.config
                })
            });
            return await response.blob();
        } catch (error) {
            console.error('Erro na criação do QR:', error);
            throw error;
        }
    },

    async lerQRCode(imagem) {
        try {
            const formData = new FormData();
            formData.append('image', imagem);

            const response = await fetch('/api/qrcode/read', {
                method: 'POST',
                body: formData
            });

            return await response.json();
        } catch (error) {
            console.error('Erro na leitura do QR:', error);
            throw error;
        }
    }
};

// Exportar módulo
if (typeof module !== 'undefined' && module.exports) {
    module.exports = QRCodeService;
}