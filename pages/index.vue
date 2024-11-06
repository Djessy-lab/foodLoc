<template>
  <div>
    <Saas v-if="currentConfig" v-bind="currentConfig" />
    <div v-else>Chargement...</div>
  </div>
</template>

<script>
import config from '../data/config.js';
export default {
  name: 'Home',
  data() {
    return {
      currentConfig: config.foodloc
    };
  },
}
</script>
