<template>
  <div class="h-[70vh] bg-gradient-to-b from-blue-100 to-blue-0">
    <h2 class="text-3xl font-bold text-center p-12">Pourquoi utiliser FoodLoc ?</h2>
    <div class="flex justify-center px-10 mt-10">
      <div v-for="(advantage, index) in advantages" class="shadow-lg bg-gray-100 rounded-lg w-96  p-10 mr-10">
        <h3 class="text-xl font-bold text-center">{{ advantage.title }}</h3>
        <p class="mt-2">{{ advantage.text }}</p>
      </div>
    </div>
  </div>
</template>


<script>
import advantages from '@/data/advantages.js'
export default {
  name: 'Advantages',
  data() {
    return {
      advantages
    }
  },
}
</script>
