<template>
  <div class="h-[50vh] bg-gradient-to-b from-blue-100 to-blue-200 flex items-center justify-center">
    <section id="get-email" class="flex flex-col items-center">
      <div class="text-center mb-10">
        <h3 class="text-3xl">S'inscrire pour l'accès anticipé</h3>
        <p class="mt-2">Inscrivez-vous aujourd'hui et bénéficiez de 40% de réduction</p>
      </div>
      <div class="w-full flex justify-center">
        <input v-model="email" type="email" placeholder="votre.meilleur@email.com"
          class="w-80 rounded-2xl p-1 text-center">
      </div>
      <div class="w-full flex justify-center mt-4">
        <button @click="subscribe" class="w-80 bg-blue-600 rounded-2xl p-1 text-white">S'inscrire</button>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'GetEmail',
  data() {
    return {
      email: '',
    };
  },
  methods: {
    async subscribe() {
      try {
        const response = await $fetch('/api/subscribe', {
          method: 'POST',
          body: { email: this.email },
        });

        if (response.message === "Vous êtes déjà inscrit avec cet email.") {
          alert("Vous êtes déjà inscrit avec cet email.");
        } else {
          alert(response.message);
          this.email = '';
        }
      } catch (error) {
        console.error("Erreur lors de l'inscription :", error);
        alert("Une erreur s'est produite lors de l'inscription.");
      }
    },
  },
};
</script>
