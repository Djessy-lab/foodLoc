<template>
  <div class="lg:h-[70vh] bg-gradient-to-b from-blue-100 to-blue-0">
    <h2 class="text-3xl font-bold text-center p-12">Pourquoi utiliser FoodLoc ?</h2>
    <div class="flex justify-center max-lg:flex-col max-lg:items-center px-10 lg:mt-10 max-lg:mb-20">
      <div v-for="(advantage, index) in advantages" :key="index" class="shadow-lg bg-gray-100 rounded-lg w-96 max-lg:h-[30%] max-lg:w-[100%] max-lg:overflow-scroll  p-10 lg:mr-10 max-lg:mt-10 transition-transform duration-700 hover:-translate-y-2 ">
        <h3 class="text-2xl text-cyan-900 font-amsterdam text-center">{{ advantage.title }}</h3>
        <p class="mt-2 text-center">{{ advantage.text }}</p>
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
