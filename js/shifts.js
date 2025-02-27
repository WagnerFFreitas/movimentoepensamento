const ShiftService = {
    config: {
        turnos: {
            manha: { inicio: '08:00', fim: '14:00' },
            tarde: { inicio: '14:00', fim: '20:00' },
            noite: { inicio: '20:00', fim: '02:00' }
        },
        escalaTipo: ['fixa', 'rotativa', 'plantão'],
        substituicoes: true,
        horasMinimas: 6,
        horasMaximas: 12
    },

    async gerenciarEscala(dados) {
        try {
            const escala = {
                profissional: dados.profissionalId,
                turno: dados.turno,
                tipo: dados.tipo,
                dataInicio: dados.dataInicio,
                dataFim: dados.dataFim,
                diasSemana: dados.diasSemana,
                observacoes: dados.observacoes,
                status: 'ativa'
            };

            const response = await fetch('/api/shifts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${auth.token}`
                },
                body: JSON.stringify(escala)
            });

            await LoggerService.logAction('ESCALA_CRIADA', escala);
            return await response.json();

        } catch (error) {
            console.error('Erro ao gerenciar escala:', error);
            throw error;
        }
    }
};

// Exportar módulo
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ShiftService;
}