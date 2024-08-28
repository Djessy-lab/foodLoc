<template>
  <div class="lg:h-[80vh]">
    <h2 class="text-3xl font-bold text-center py-10">Tarifs</h2>
    <div class="flex justify-center max-lg:flex-col max-lg:items-center lg:mt-10 px-10">
      <div v-for="(price, index) in pricing"
        class="shadow-lg bg-gradient-to-b from-blue-200 to-blue-100 rounded-lg w-80 max-lg:h-[30%] max-lg:w-[100%] h-96 p-10 lg:mr-10 max-lg:mt-10">
        <h4 class="lg:text-xl font-bold text-center">{{ price.title }}</h4>
        <p class="text-center text-4xl font-bold mt-5">{{ price.price }}€ / <span class="font-normal text-sm">{{
        price.duration }}</span></p>
        <div class="mt-6">
          <ul>
            <li v-for="feature in price.features" class="max-lg:text-center mt-2 max-lg:text-sm">
              <span class="text-green-500">✔</span> {{ feature }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import pricing from '@/data/pricing.js'

export default {
  name: 'Pricing',
  data() {
    return {
      pricing
    }
  },
}
</script>
