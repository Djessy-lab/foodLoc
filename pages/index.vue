<template>
  <div>
    <!-- <ConfigForm @configUpdated="(name) => updateConfig(name)" /> -->
    <Saas v-bind="currentConfig" />
  </div>
</template>

<script>
import config from '@/data/config.js';
import ConfigForm from '@/components/ConfigForm.vue';

export default {
  name: 'Home',
  components: {
    ConfigForm
  },
  data() {
    return {
      currentConfig: config.foodloc
    };
  },
}
</script>
