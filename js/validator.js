const FormValidator = {
    // Regras de validação
    rules: {
        email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        cpf: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
        telefone: /^\(\d{2}\)\s\d{4,5}-\d{4}$/
    },

    // Validar campo específico
    validateField(field, value) {
        if (!value) return 'Campo obrigatório';

        switch (field) {
            case 'email':
                return this.rules.email.test(value) ? null : 'Email inválido';
            case 'cpf':
                return this.rules.cpf.test(value) ? null : 'CPF inválido';
            case 'telefone':
                return this.rules.telefone.test(value) ? null : 'Telefone inválido';
            default:
                return null;
        }
    },

    // Validar formulário completo
    validateForm(formData) {
        const errors = {};
        for (const [field, value] of Object.entries(formData)) {
            const error = this.validateField(field, value);
            if (error) errors[field] = error;
        }
        return {
            isValid: Object.keys(errors).length === 0,
            errors
        };
    },

    // Formatar campos
    formatField(field, value) {
        switch (field) {
            case 'cpf':
                return value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
            case 'telefone':
                return value.replace(/(\d{2})(\d{4,5})(\d{4})/, '($1) $2-$3');
            default:
                return value;
        }
    }
};

// Exportar módulo
if (typeof module !== 'undefined' && module.exports) {
    module.exports = FormValidator;
}