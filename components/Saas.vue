<template>
  <div>
    <HeroSection :key="color" :title="titleHero" :description="descriptionHero" :color="color" />
  </div>
  <div>
    <Advantages :key="color" :color="color" />
  </div>
  <div>
    <HowItsWorks />
  </div>
  <div>
    <Pricing :color="color" />
  </div>
  <div>
    <Testimonials />
  </div>
  <div>
    <GetEmail :color="color" />
  </div>
</template>

<script>
export default {
  name: 'Home',
  props: {
    titleHero: { type: String, default: "" },
    descriptionHero: { type: String, default: "" },
    color: { type: String, default: "blue" },
  }
}
</script>
