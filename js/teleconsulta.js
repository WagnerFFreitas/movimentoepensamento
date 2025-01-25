const TeleconsultaService = {
    config: {
        provedor: 'zoom', // ou 'meet', 'teams'
        apiKey: 'sua_chave_api',
        duracao: 30, // minutos
        lembreteAntecedencia: 10, // minutos
        gravacaoPermitida: false
    },

    async criarSala(consulta) {
        try {
            const sala = {
                id: `consulta-${consulta.id}`,
                medico: consulta.medico,
                paciente: consulta.paciente,
                data: consulta.data,
                hora: consulta.hora,
                duracao: this.config.duracao
            };

            const response = await fetch('/api/teleconsulta/sala', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${auth.token}`
                },
                body: JSON.stringify(sala)
            });

            const resultado = await response.json();
            await this.enviarConvites(resultado);
            return resultado;

        } catch (error) {
            console.error('Erro ao criar sala:', error);
            throw error;
        }
    },

    async enviarConvites(sala) {
        // Enviar e-mail para médico e paciente
        await EmailService.enviarEmail(sala.medico.email, 'teleconsulta', {
            link: sala.link,
            data: sala.data,
            hora: sala.hora
        });

        await EmailService.enviarEmail(sala.paciente.email, 'teleconsulta', {
            link: sala.link,
            data: sala.data,
            hora: sala.hora
        });
    }
};

// Exportar módulo
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TeleconsultaService;
}