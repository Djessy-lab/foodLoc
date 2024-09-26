<template>
  <div class="sticky top-0 z-10">
    <select v-model="color">
      <option value="blue">Blue</option>
      <option value="red">Red</option>
      <option value="green">Green</option>
      <option value="yellow">Yellow</option>
      <option value="emerald">Emerald</option>
      <option value="sky">Sky</option>
      <option value="rose">Rose</option>
      <option value="slate">Slate</option>
      <option value="pink">Pink</option>
      <option value="orange">Orange</option>
      <option value="neutral">Neutral</option>
      <option value="stone">Stone</option>
      <option value="amber">Amber</option>
      <option value="lime">Lime</option>
      <option value="teal">Teal</option>
      <option value="cyan">Cyan</option>
      <option value="indigo">Indigo</option>
      <option value="violet">Violet</option>
      <option value="purple">Purple</option>
      <option value="fuchsia">Fuchsia</option>
    </select>
  </div>
  <Saas :titleHero="titleHero" :descriptionHero="descriptionHero" :color="color" />
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      titleHero: "Connecter les Producteurs aux Consommateurs",
      descriptionHero: "Découvrez les produits locaux directement auprès des producteurs de votre région.",
      color: ''
    }
  },
}
</script>
