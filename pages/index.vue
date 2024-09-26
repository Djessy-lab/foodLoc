<template>
  <Saas v-bind="foodloc" />
</template>

<script>
import config from '@/data/config.js'

export default {
  name: 'Home',
  data() {
    return {
      foodloc: config.foodloc,
      test: config.test
    }
  }
}
</script>
