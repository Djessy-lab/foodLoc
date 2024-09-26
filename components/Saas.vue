<template>
  <div>
    <HeroSection :imgHero="imgHero" :title="titleHero" :description="descriptionHero" :color="color" :appName="appName" />
  </div>
  <div>
    <Advantages :color="color" :advantages="advantages" :appName="appName" />
  </div>
  <div>
    <HowItsWorks />
  </div>
  <div>
    <Pricing :color="color" :pricing="pricing" />
  </div>
  <div>
    <Testimonials :testimonials="testimonials" />
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
    imgHero: { type: String, default: "" },
    advantages: { type: Array, default: () => [] },
    testimonials: { type: Array, default: () => [] },
    pricing: { type: Array, default: () => [] },
    appName: { type: String, default: "" },
  }
}
</script>
