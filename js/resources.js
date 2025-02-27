const ResourceService = {
    config: {
        categorias: {
            equipamentos: ['Fisioterapia', 'Diagnóstico', 'Exercícios'],
            salas: ['Consultório', 'Ginásio', 'Piscina'],
            materiais: ['Consumíveis', 'Permanentes', 'EPIs']
        },
        alertas: {
            estoqueBaixo: true,
            manutencaoPreventiva: true,
            vencimento: true
        },
        estoqueMinimo: {
            consumiveis: 10,
            epis: 20
        }
    },

    async gerenciarRecurso(dados) {
        try {
            const recurso = {
                nome: dados.nome,
                categoria: dados.categoria,
                tipo: dados.tipo,
                quantidade: dados.quantidade || 1,
                status: dados.status || 'disponível',
                localizacao: dados.localizacao,
                ultimaManutencao: dados.ultimaManutencao,
                proximaManutencao: dados.proximaManutencao
            };

            const response = await fetch('/api/resources', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${auth.token}`
                },
                body: JSON.stringify(recurso)
            });

            await LoggerService.logAction('RECURSO_REGISTRADO', recurso);
            return await response.json();

        } catch (error) {
            console.error('Erro ao gerenciar recurso:', error);
            throw error;
        }
    }
};

// Exportar módulo
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ResourceService;
}