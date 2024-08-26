<template>
  <div>
    <section id="testimonials" class="bg-gray-100 py-12">
      <h2 class="text-3xl font-bold text-gray-900 text-center">Ce que disent nos utilisateurs</h2>
      <div class="max-w-4xl mx-auto mt-8">
        <div class="flex flex-wrap justify-center space-x-4">
          <div v-for="(testimonial, index) in testimonials" :key="index"
            class="w-80 bg-white p-4 rounded-lg shadow-lg m-4">
            <p class="text-gray-600  min-h-8 max-h-24 overflow-scroll">{{ testimonial.text }}</p>
            <p class="mt-4 text-right font-bold text-gray-900  min-h-8 max-h-24 overflow-scroll">- {{ testimonial.author }}</p>
            <div class="flex">
              <img v-for="(star, index) in testimonial.stars" src="/img/stars.png" alt="stars" class="w-6">
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import testimonials from '@/data/testimonials.js'
export default {
  name: 'Testimonials',
  data() {
    return {
      testimonials
    }
  },
}
</script>
