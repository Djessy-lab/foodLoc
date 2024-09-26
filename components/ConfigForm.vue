<template>
  <div>
    <h2>Créer une nouvelle configuration</h2>
    <form @submit.prevent="submitForm">
      <div>
        <label for="configName">Nom de la configuration:</label>
        <input v-model="configName" type="text" id="configName" required />
      </div>
      <div>
        <label for="appName">Nom de l'application:</label>
        <input v-model="config.appName" type="text" id="appName" required />
      </div>
      <div>
        <label for="titleHero">Titre Hero:</label>
        <input v-model="config.titleHero" type="text" id="titleHero" required />
      </div>
      <div>
        <label for="color">Couleur:</label>
        <input v-model="config.color" type="text" id="color" required />
      </div>
      <div>
        <label for="descriptionHero">Description Hero:</label>
        <textarea v-model="config.descriptionHero" id="descriptionHero" required></textarea>
      </div>
      <button type="submit">Sauvegarder</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      configName: '',
      config: {
        appName: '',
        titleHero: '',
        descriptionHero: '',
        color: '',
        imgHero: '',
        advantages: [],
        testimonials: [],
        pricing: []
      }
    };
  },
  methods: {
    async submitForm() {
      try {
        const response = await fetch('/api/saveConfig', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ configName: this.configName, config: this.config })
        });
        const result = await response.json();
        alert(result.message);
        this.$emit('configUpdated', this.configName);
        this.resetForm();
      } catch (error) {
        console.error('Erreur lors de la soumission du formulaire:', error);
      }
    },
    resetForm() {
      this.configName = '';
      this.config = {
        appName: '',
        titleHero: '',
        descriptionHero: '',
        color: '',
        imgHero: '',
        advantages: [],
        testimonials: [],
        pricing: []
      };
    }
  }
};
</script>
