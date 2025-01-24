const SessionService = {
    config: {
        timeout: 30 * 60 * 1000, // 30 minutos
        renewThreshold: 5 * 60 * 1000, // 5 minutos
        storageKey: 'clinica_session_'
    },

    async startSession(userData) {
        const session = {
            userId: userData.id,
            token: auth.token,
            startTime: Date.now(),
            lastActivity: Date.now(),
            expiresAt: Date.now() + this.config.timeout
        };

        this.saveSession(session);
        this.startActivityMonitor();
    },

    checkSession() {
        const session = this.getSession();
        if (!session) return false;

        if (Date.now() > session.expiresAt) {
            this.endSession();
            return false;
        }

        if (this.shouldRenew(session)) {
            this.renewSession();
        }

        return true;
    },

    shouldRenew(session) {
        const timeLeft = session.expiresAt - Date.now();
        return timeLeft < this.config.renewThreshold;
    },

    renewSession() {
        const session = this.getSession();
        if (session) {
            session.lastActivity = Date.now();
            session.expiresAt = Date.now() + this.config.timeout;
            this.saveSession(session);
        }
    },

    endSession() {
        localStorage.removeItem(this.config.storageKey);
        auth.logout();
    },

    saveSession(session) {
        localStorage.setItem(this.config.storageKey, JSON.stringify(session));
    },

    getSession() {
        const data = localStorage.getItem(this.config.storageKey);
        return data ? JSON.parse(data) : null;
    }
};

// Exportar módulo
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SessionService;
}