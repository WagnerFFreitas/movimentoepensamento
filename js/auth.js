const auth = {
    token: localStorage.getItem('token'),

    async login(email, senha) {
        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, senha })
            });
            
            if (response.ok) {
                const data = await response.json();
                this.setToken(data.token);
                window.location.href = '../pages/dashboard.html';
            } else {
                alert('Email ou senha inválidos');
            }
        } catch (error) {
            console.error('Erro no login:', error);
            alert('Erro ao fazer login');
        }
    },

    setToken(token) {
        this.token = token;
        localStorage.setItem('token', token);
    },

    logout() {
        this.token = null;
        localStorage.removeItem('token');
        window.location.href = '../index.html';
    },

    isAuthenticated() {
        return !!this.token;
    }
};

// Event Listeners
document.getElementById('formLogin')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    await auth.login(email, senha);
});