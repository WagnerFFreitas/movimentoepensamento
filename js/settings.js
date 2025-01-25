const SystemSettings = {
    app: {
        name: 'Clínica Movimento e Pensamento',
        version: '1.0.0',
        environment: 'development', // ou 'production'
        debug: true
    },

    paths: {
        root: 'd:/movimentoepensamento/',
        uploads: 'd:/movimentoepensamento/uploads/',
        temp: 'd:/movimentoepensamento/temp/',
        logs: 'd:/movimentoepensamento/logs/',
        backups: 'd:/movimentoepensamento/backups/'
    },

    database: {
        host: 'localhost',
        port: 3306,
        name: 'clinica_db',
        user: 'root',
        backup: {
            automatic: true,
            frequency: 'daily', // daily, weekly, monthly
            time: '23:00'
        }
    },

    security: {
        sessionTimeout: 30, // minutos
        maxLoginAttempts: 3,
        passwordPolicy: {
            minLength: 8,
            requireNumbers: true,
            requireSpecialChars: true
        }
    },

    email: {
        smtp: {
            host: 'smtp.clinica.com.br',
            port: 587,
            secure: true
        },
        sender: 'sistema@clinica.com.br'
    }
};

// Exportar configurações
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SystemSettings;
}