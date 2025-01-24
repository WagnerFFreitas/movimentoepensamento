const CONFIG = {
    // Configurações da API
    API_URL: 'http://localhost:3000/api',
    
    // Configurações do sistema
    SYSTEM: {
        NAME: 'Clínica Médica',
        VERSION: '1.0.0',
        COMPANY: 'Movimento e Pensamento'
    },
    
    // Configurações de horários
    HORARIOS: {
        INICIO_ATENDIMENTO: '08:00',
        FIM_ATENDIMENTO: '18:00',
        INTERVALO_CONSULTA: 30 // minutos
    },
    
    // Configurações de autenticação
    AUTH: {
        TOKEN_KEY: 'clinica_token',
        SESSION_TIMEOUT: 3600 // 1 hora
    },
    
    // Configurações de notificações
    NOTIFICATIONS: {
        EMAIL_FROM: 'contato@clinica.com',
        SMS_ENABLE: true,
        WHATSAPP_ENABLE: true
    }
};

// Exportar configurações
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
}