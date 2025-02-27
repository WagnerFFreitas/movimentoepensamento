const ValidationService = {
    config: {
        regras: {
            email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            cpf: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
            telefone: /^\(\d{2}\)\s\d{4,5}-\d{4}$/,
            cep: /^\d{5}-\d{3}$/
        },
        mensagensErro: {
            required: 'Campo obrigatório',
            email: 'Email inválido',
            cpf: 'CPF inválido',
            telefone: 'Telefone inválido',
            cep: 'CEP inválido'
        }
    },

    validarFormulario(dados, regras) {
        const erros = {};

        for (const campo in regras) {
            const valor = dados[campo];
            const regra = regras[campo];

            if (regra.required && !valor) {
                erros[campo] = this.config.mensagensErro.required;
                continue;
            }

            if (valor && this.config.regras[regra.tipo]) {
                if (!this.config.regras[regra.tipo].test(valor)) {
                    erros[campo] = this.config.mensagensErro[regra.tipo];
                }
            }
        }

        return {
            valido: Object.keys(erros).length === 0,
            erros
        };
    }
};

// Exportar módulo
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ValidationService;
}