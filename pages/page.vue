<template>
  <div>
    <Saas v-if="isConfigReady" v-bind="currentConfig" />
    <div v-else-if="configError">Une erreur s'est produite lors du chargement de la configuration.</div>
    <div v-else>Chargement...</div>
  </div>
</template>

<script>
import config from '@/data/config.js';
import { defineAsyncComponent } from 'vue';

export default {
  name: 'page',
  components: {
    Saas: defineAsyncComponent(() => import('@/components/Saas.vue'))
  },
  data() {
    return {
      currentConfig: null,
      isConfigReady: false,
      configError: false
    };
  },
  async mounted() {
    try {
      await this.loadConfig();
    } catch (error) {
      console.error('Erreur lors du chargement de la configuration:', error);
      this.configError = true;
    }
  },
  methods: {
    async loadConfig() {
      const configName = this.$route.query.configName;
      console.log('Nom de la configuration:', configName);

      if (configName && config[configName]) {
        this.currentConfig = config[configName];
      } else {
        this.currentConfig = config.foodloc;
      }

      if (this.validateConfig(this.currentConfig)) {
        this.isConfigReady = true;
      } else {
        throw new Error('Configuration invalide');
      }

      console.log('Configuration actuelle:', this.currentConfig);
    },
    validateConfig(config) {
      return config && config.title && config.description;
    }
  }
}
</script>
