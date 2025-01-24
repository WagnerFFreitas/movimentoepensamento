const PDFReportService = {
    config: {
        pageSize: 'A4',
        margin: {
            top: 40,
            bottom: 40,
            left: 40,
            right: 40
        },
        header: {
            height: 60,
            logo: 'd:/movimentoepensamento/assets/logo.png'
        }
    },

    async gerarRelatorioPaciente(pacienteId) {
        try {
            const paciente = await fetch(`/api/pacientes/${pacienteId}`).then(r => r.json());
            const consultas = await fetch(`/api/consultas/paciente/${pacienteId}`).then(r => r.json());
            
            const docDefinition = {
                pageSize: this.config.pageSize,
                header: this.gerarCabecalho(),
                content: [
                    { text: 'Relatório do Paciente', style: 'header' },
                    { text: `Nome: ${paciente.nome}` },
                    { text: `CPF: ${paciente.cpf}` },
                    { text: 'Histórico de Consultas', style: 'subheader' },
                    this.gerarTabelaConsultas(consultas)
                ],
                styles: this.definirEstilos()
            };

            return await this.gerarPDF(docDefinition);
        } catch (error) {
            console.error('Erro ao gerar relatório:', error);
            throw error;
        }
    },

    gerarCabecalho() {
        return {
            image: this.config.header.logo,
            width: 150,
            alignment: 'center',
            margin: [0, 10]
        };
    },

    definirEstilos() {
        return {
            header: {
                fontSize: 18,
                bold: true,
                margin: [0, 10, 0, 10]
            },
            subheader: {
                fontSize: 14,
                bold: true,
                margin: [0, 10, 0, 5]
            }
        };
    }
};

// Exportar módulo
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PDFReportService;
}