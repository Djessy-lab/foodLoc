<template>
  <div>
    <section id="testimonials" class="bg-gray-100 py-12">
      <h2 class="text-3xl font-bold text-gray-900 text-center">Ce que disent nos utilisateurs</h2>
      <div class="max-w-4xl mx-auto mt-8">
        <div class="flex flex-wrap justify-center ">
          <div v-for="(testimonial, index) in testimonials" :key="index"
            class="w-96 bg-white p-4 rounded-lg shadow-lg m-4 flex flex-col justify-between">
            <p class="text-gray-600 h-40 max-h-40 overflow-scroll">{{ testimonial.text }}</p>
            <div class="flex justify-between items-center mt-4">
              <div class="flex">
                <img v-for="(star, starIndex) in testimonial.stars" :key="starIndex" src="/img/stars.png" alt="stars"
                  class="w-6">
              </div>
              <p class="font-bold text-gray-900">- {{ testimonial.author }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>


<script>

export default {
  name: 'Testimonials',
  data() {
    return {
    }
  },
  props: {
    testimonials: { type: Array, default: () => [] },
  }
}
</script>
