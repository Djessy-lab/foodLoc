<template>
  <Saas v-bind="currentConfig" />
</template>


<script>
import config from '@/data/config.js';

export default {
  name: 'page',
  data() {
    return {
      currentConfig: config.foodloc
    };
  },
  mounted(){
    if(this.$route.query.configName){
      this.currentConfig = config[this.$route.query.configName]
    } else {
      this.currentConfig = config.foodloc
    }
  }
}
</script>
