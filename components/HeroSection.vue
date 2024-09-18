<template>
  <div class="bg-gradient-to-b from-blue-200 to-blue-100">
    <Login />
    <header class="flex items-center justify-between p-4">
      <div class="text-xl font-bold font-mono"><a href="/">FoodLoc</a></div>
      <nav>
        <ul class="flex space-x-4">
          <li><a href="/products" class="text-blue-600">Notre annuaire</a></li>
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
        <button class="max-w-32 min-w-32 bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700">
          <a href="#get-email">
            S'inscrire
          </a>
        </button>
      </div>
      <div class="mt-8">
        <img src="/img/vegetables.avif" alt="Producteurs et Consommateurs"
          class="mx-auto sm:w-[80%] lg:w-[50%] rounded-lg shadow-lg" />
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
