const auth = {
    async login(email, senha) {
        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, senha })
            });
            
            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('token', data.token);
                window.location.href = 'dashboard.html';
            }
        } catch (error) {
            console.error('Erro no login:', error);
        }
    },

    verificarAuth() {
        return !!localStorage.getItem('token');
    },

    logout() {
        localStorage.removeItem('token');
        window.location.href = 'login.html';
    }
};