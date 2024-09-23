<template>
  <div class="flex flex-col justify-center p-32 rounded-2xl shadow-xl bg-white">
    <h2 class="text-center text-xl mb-10">Se connecter avec un lien magique 🪄</h2>
    <input class="rounded-2xl border p-2 text-center mb-10 min-w-64" v-model="email" type="email" id="auth-email" placeholder="Entrez votre email" />
    <button class="bg-blue-500 text-white p-2 rounded-lg min-w-64" @click="loginWithMagic">Se connecter</button>
  </div>
</template>

<script>
export default {
  name: 'Login',
  emits: ['authenticated'],
  data() {
    return {
      email: '',
    };
  },
  methods: {
    async loginWithMagic() {
      try {
        const response = await $fetch('/api/auth/login', {
          method: 'POST',
          body: { email: this.email },
        });

        console.log('Réponse de l\'API', response);
        if (response.status === 200) {
          localStorage.setItem('token', response.token);
          alert('Vérifiez votre email pour le lien magique.');
          this.$emit('authenticated', this.email);
          this.email = '';
        } else {
          console.error('Erreur:', response.message);
        }
      } catch (error) {
        console.error('Échec de la connexion:', error);
      }
    },
  },
};
</script>
