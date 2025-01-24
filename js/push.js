const PushNotificationService = {
    config: {
        publicKey: 'sua_chave_publica_vapid',
        privateKey: 'sua_chave_privada_vapid',
        subject: 'mailto:contato@clinica.com',
        scope: '/notifications/'
    },

    async subscribe(user) {
        try {
            const registration = await navigator.serviceWorker.register('/sw.js', {
                scope: this.config.scope
            });

            const subscription = await registration.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: this.urlBase64ToUint8Array(this.config.publicKey)
            });

            await this.saveSubscription(user.id, subscription);
            return subscription;

        } catch (error) {
            console.error('Erro ao registrar push notification:', error);
            throw error;
        }
    },

    async sendNotification(userId, data) {
        const subscription = await this.getSubscription(userId);
        if (!subscription) return;

        try {
            await fetch('/api/notifications/send', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    subscription,
                    data
                })
            });
        } catch (error) {
            console.error('Erro ao enviar notificação:', error);
        }
    },

    urlBase64ToUint8Array(base64String) {
        const padding = '='.repeat((4 - base64String.length % 4) % 4);
        const base64 = (base64String + padding)
            .replace(/\-/g, '+')
            .replace(/_/g, '/');

        const rawData = window.atob(base64);
        const outputArray = new Uint8Array(rawData.length);

        for (let i = 0; i < rawData.length; ++i) {
            outputArray[i] = rawData.charCodeAt(i);
        }
        return outputArray;
    }
};

// Exportar módulo
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PushNotificationService;
}