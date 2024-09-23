<template>
  <div class="bg-gradient-to-b from-blue-200 to-blue-100">
    <header class="flex items-center justify-between p-4">
      <div class="text-xl font-bold font-mono"><a href="/">FoodLoc</a></div>
      <nav>
        <ul class="flex space-x-4">
          <li><a href="/products" class="text-blue-600">Notre annuaire</a></li>
          <li><a href="#testimonials" class="text-blue-600">Avis</a></li>
          <li v-if="!userEmail"><a href="/login" class="text-blue-600">Se connecter</a></li>
        </ul>
      </nav>
    </header>
    <section class="text-center py-12">
      <h1 class="text-4xl font-extrabold text-gray-900">Connectez les Producteurs aux Consommateurs</h1>
      <p class="mt-4 text-lg text-gray-600">Découvrez les produits locaux directement auprès des producteurs de votre région.</p>
      <div v-if="userEmail" class="mt-4 text-lg text-gray-800">Bienvenue, {{ userEmail }}!</div>
      <div class="mt-6">
        <button class="max-w-32 min-w-32 bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700">
          <a href="#get-email">
            S'inscrire
          </a>
        </button>
      </div>
      <div class="mt-8">
        <img src="/img/vegetables.avif" alt="Producteurs et Consommateurs" class="mx-auto sm:w-[80%] lg:w-[50%] rounded-lg shadow-lg" />
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'HeroSection',
  data() {
    return {
      userEmail: null,
    };
  },
  created() {
    this.fetchUserEmail();
  },
  methods: {
    setUserEmail(email) {
      this.userEmail = email;
    },
    async fetchUserEmail() {
      try {
        const token = localStorage.getItem('token');
        const response = await $fetch('/api/auth/getUser', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        if (response.status === 200) {
          this.userEmail = response.email;
        }
      } catch (error) {
        console.error('Erreur lors de la récupération de l\'utilisateur:', error);
      }
    },
  },
};
</script>
