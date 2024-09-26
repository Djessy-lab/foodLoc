<template>
  <div class="lg:h-[80vh]">
    <h2 class="text-3xl font-bold text-center py-10">Tarifs</h2>
    <div class="flex justify-center max-lg:flex-col max-lg:items-center lg:mt-10 px-10">
      <div v-for="(price, index) in pricing"
        :class="`shadow-lg ${gradientClass} ${price.up ? '-translate-y-2 shadow-2xl' : ''} rounded-lg w-80 max-lg:h-[30%] max-lg:w-[100%] h-96 p-10 lg:mr-4 max-lg:mt-10`">
        <h4 class="lg:text-2xl font-bold font-amsterdam text-center">{{ price.title }}</h4>
        <p class="text-center text-4xl font-bold mt-5">{{ price.price }}€ <span class="font-normal text-xs">/ {{
        price.duration }}</span></p>
        <div class="mt-6">
          <ul>
            <li v-for="feature in price.features" class="max-lg:text-center mt-2 max-lg:text-sm">
              <span>✅</span> {{ feature }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Pricing',
  data() {
    return {  
    }
  },
  props: {
    color: { type: String, default: "blue" },
    pricing: { type: Array, default: () => [] },
  },
  computed: {
    gradientClass() {
      const colorClasses = {
        blue: 'bg-gradient-to-b from-blue-200 to-blue-100',
        red: 'bg-gradient-to-b from-red-200 to-red-100',
        green: 'bg-gradient-to-b from-green-200 to-green-100',
        yellow: 'bg-gradient-to-b from-yellow-200 to-yellow-100',
        emerald: 'bg-gradient-to-b from-emerald-200 to-emerald-100',
        sky: 'bg-gradient-to-b from-sky-200 to-sky-100',
        rose: 'bg-gradient-to-b from-rose-200 to-rose-100',
        slate: 'bg-gradient-to-b from-slate-200 to-slate-100',
        pink: 'bg-gradient-to-b from-pink-200 to-pink-100',
        orange: 'bg-gradient-to-b from-orange-200 to-orange-100',
        neutral: 'bg-gradient-to-b from-neutral-200 to-neutral-100',
        stone: 'bg-gradient-to-b from-stone-200 to-stone-100',
        amber: 'bg-gradient-to-b from-amber-200 to-amber-100',
        lime: 'bg-gradient-to-b from-lime-200 to-lime-100',
        teal: 'bg-gradient-to-b from-teal-200 to-teal-100',
        cyan: 'bg-gradient-to-b from-cyan-200 to-cyan-100',
        indigo: 'bg-gradient-to-b from-indigo-200 to-indigo-100',
        violet: 'bg-gradient-to-b from-violet-200 to-violet-100',
        purple: 'bg-gradient-to-b from-purple-200 to-purple-100',
        fuchsia: 'bg-gradient-to-b from-fuchsia-200 to-fuchsia-100',
      };
      return colorClasses[this.color] || colorClasses['blue'];
    },
  }
}
</script>
