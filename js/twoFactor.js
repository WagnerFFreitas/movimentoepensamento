const TwoFactorService = {
    config: {
        codeLength: 6,
        validityMinutes: 5,
        maxAttempts: 3,
        storageKey: 'clinica_2fa_'
    },

    async generateCode(userId) {
        const code = Math.random().toString().substr(2, this.config.codeLength);
        const expiresAt = new Date();
        expiresAt.setMinutes(expiresAt.getMinutes() + this.config.validityMinutes);

        const codeData = {
            code,
            expiresAt: expiresAt.getTime(),
            attempts: 0
        };

        await this.storeCode(userId, codeData);
        return code;
    },

    async verifyCode(userId, inputCode) {
        const storedData = await this.getStoredCode(userId);
        
        if (!storedData) {
            return { valid: false, message: 'Código não encontrado' };
        }

        if (storedData.attempts >= this.config.maxAttempts) {
            return { valid: false, message: 'Número máximo de tentativas excedido' };
        }

        if (Date.now() > storedData.expiresAt) {
            return { valid: false, message: 'Código expirado' };
        }

        if (inputCode === storedData.code) {
            await this.clearCode(userId);
            return { valid: true, message: 'Código válido' };
        }

        storedData.attempts++;
        await this.storeCode(userId, storedData);
        return { valid: false, message: 'Código inválido' };
    },

    async storeCode(userId, codeData) {
        localStorage.setItem(
            this.config.storageKey + userId,
            JSON.stringify(codeData)
        );
    },

    async getStoredCode(userId) {
        const data = localStorage.getItem(this.config.storageKey + userId);
        return data ? JSON.parse(data) : null;
    },

    async clearCode(userId) {
        localStorage.removeItem(this.config.storageKey + userId);
    }
};

// Exportar módulo
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TwoFactorService;
}