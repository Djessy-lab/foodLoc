<template>
  <div class="">
    <header class="flex items-center justify-between p-4">
      <div class="text-xl font-bold"><a href="/">FoodLoc</a></div>
      <nav>
        <ul class="flex space-x-4">
          <li><a href="/products" class="text-blue-600">Produits</a></li>
          <li><a href="#testimonials" class="text-blue-600">Avis</a></li>
          <li><a href="#get-email" class="text-blue-600">S'inscrire</a></li>
        </ul>
      </nav>
    </header>
    <section class="text-center py-12">
      <h1 class="text-4xl font-extrabold text-gray-900">Connectez les Producteurs aux Consommateurs</h1>
      <p class="mt-4 text-lg text-gray-600">Découvrez les produits locaux directement auprès des producteurs de votre
        région.</p>
      <div class="mt-6">
        <button @click="handleClick" class="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700">Découvrir</button>
        <button @click="handleClick" class="bg-white ml-2 px-4 py-2 rounded-lg shadow hover:bg-slate-100">S'inscrire</button>
      </div>
      <div class="mt-8">
        <img src="/img/vegetables.avif" alt="Producteurs et Consommateurs" class="mx-auto w-[40%] rounded-lg shadow-lg" />
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'HeroSection',
  methods: {
    handleClick() {
      this.$router.push('/products')
    },
  },
}
</script>
