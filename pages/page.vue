<template>
  <Saas v-if="currentConfig" v-bind="currentConfig" />
  <div v-else>Chargement...</div>
</template>

<script>
export default {
  name: 'page',
  data() {
    return {
      currentConfig: null
    };
  },
  async mounted() {
    const configName = this.$route.query.configName;
    if (configName) {
      try {
        this.currentConfig = await $fetch(`/api/getConfig?configName=${configName}`);
      } catch (error) {
        console.error('Erreur lors du chargement de la configuration:', error);
      }
    }
  }
}
</script>
