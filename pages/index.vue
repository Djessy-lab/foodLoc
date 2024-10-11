<template>
  <div>
    <ConfigForm @configUpdated="updateConfig" />
  </div>
</template>

<script>
import ConfigForm from '@/components/ConfigForm.vue';

export default {
  name: 'Home',
  components: {
    ConfigForm
  },
  data() {
    return {
      currentConfig: null
    };
  },
  methods: {
    async updateConfig(configName) {
      try {
        const config = await $fetch(`/api/getConfig?configName=${configName}`);
        if (!config.error) {
          this.currentConfig = config;
        } else {
          console.error(config.error);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération de la configuration:', error);
      }
    }
  }
}
</script>
