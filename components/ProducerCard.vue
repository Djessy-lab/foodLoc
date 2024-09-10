<template>
  <div v-if="selectedRegion && selectedDepartment && selectedCity" class="grid lg:grid-cols-2 max-lg:grid-cols-1 gap-5">
    <div class="col bg-gray-100 shadow-lg rounded-lg p-7"
      v-for="producer in groupedProducers[selectedRegion][selectedDepartment][selectedCity]" :key="producer.id">
      <h2 class="font-bold text-lg text-center mb-4">{{ producer.name }}</h2>
      <p><span class="font-bold">Adresse: </span>{{ producer.address }}</p>
      <p v-if="producer.site.includes('http')"><span class="font-bold">Site:</span> <a class="text-blue-600 underline"
          :href="producer.site" target="_blank">{{ producer.site }}</a></p>
      <p><span class="font-bold">Email:</span> <a class="text-blue-600 underline" :href="'mailto:' + producer.email">{{
    producer.email }}</a></p>
      <p><span class="font-bold">Téléphone: </span> <a class="underline" :href="'tel:' + producer.phone">{{
    producer.phone }}</a></p>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProducerCard",
  data() {
    return {
    }
  },
  props: {
    selectedRegion: { type: String, default: '' },
    selectedDepartment: { type: String, default: '' },
    selectedCity: { type: String, default: '' },
    groupedProducers: { type: Object, default: () => { } }
  }
}
</script>
