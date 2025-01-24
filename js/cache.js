const CacheService = {
    config: {
        ttl: 3600, // Time to live em segundos (1 hora)
        storage: localStorage, // Pode ser alterado para sessionStorage
        prefix: 'clinica_cache_'
    },

    async get(key) {
        try {
            const item = this.config.storage.getItem(this.getKey(key));
            if (!item) return null;

            const data = JSON.parse(item);
            if (this.isExpired(data.timestamp)) {
                this.remove(key);
                return null;
            }

            return data.value;
        } catch (error) {
            console.error('Erro ao ler cache:', error);
            return null;
        }
    },

    set(key, value) {
        try {
            const data = {
                value,
                timestamp: Date.now()
            };
            this.config.storage.setItem(this.getKey(key), JSON.stringify(data));
        } catch (error) {
            console.error('Erro ao gravar cache:', error);
        }
    },

    remove(key) {
        this.config.storage.removeItem(this.getKey(key));
    },

    clear() {
        Object.keys(this.config.storage)
            .filter(key => key.startsWith(this.config.prefix))
            .forEach(key => this.config.storage.removeItem(key));
    },

    getKey(key) {
        return this.config.prefix + key;
    },

    isExpired(timestamp) {
        return Date.now() - timestamp > this.config.ttl * 1000;
    }
};

// Exportar módulo
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CacheService;
}