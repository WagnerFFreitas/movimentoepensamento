const QueueService = {
    config: {
        maxSize: 50,
        prioridades: {
            normal: 0,
            preferencial: 1,
            emergencia: 2
        },
        tempoMedioAtendimento: 15 // minutos
    },

    fila: [],

    async adicionarPaciente(paciente) {
        try {
            const senha = this.gerarSenha(paciente.prioridade);
            const item = {
                senha,
                paciente: paciente.id,
                prioridade: paciente.prioridade,
                horaEntrada: new Date(),
                status: 'aguardando'
            };

            this.fila.push(item);
            this.ordenarFila();
            
            await NotificationService.enviarNotificacao('NOVA_SENHA', {
                senha,
                paciente: paciente.nome
            });

            return senha;

        } catch (error) {
            console.error('Erro ao adicionar à fila:', error);
            throw error;
        }
    },

    gerarSenha(prioridade) {
        const prefixo = prioridade.toUpperCase().charAt(0);
        const numero = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
        return `${prefixo}${numero}`;
    },

    ordenarFila() {
        this.fila.sort((a, b) => {
            if (b.prioridade !== a.prioridade) {
                return this.config.prioridades[b.prioridade] - 
                       this.config.prioridades[a.prioridade];
            }
            return a.horaEntrada - b.horaEntrada;
        });
    }
};

// Exportar módulo
if (typeof module !== 'undefined' && module.exports) {
    module.exports = QueueService;
}