<template>
  <div>
    <div class="bg-gradient-to-b from-blue-200 to-blue-100">
      <div>
        <button @click="$router.push('/')" class="bg-blue-500 w-20 text-white p-2 ml-4 mt-4 rounded-lg">Accueil</button>
      </div>
      <h1 class="text-center text-6xl font-amsterdam">Liste des Producteurs</h1>
      <div class="flex justify-center mt-10">
        <input v-model="search" type="text" placeholder="Recherchez votre producteur ici"
          class="rounded-2xl shadow w-80 p-2 text-center" />
      </div>
      <div v-if="selectedRegion || selectedDepartment || selectedCity">
        <button @click="goBack" class="w-20 ml-2 mt-2 rounded-lg">
          <Icon name="ic:baseline-arrow-back" class="text-4xl" />
        </button>
      </div>
    </div>
    <div class="bg-gradient-to-b from-blue-100 to-blue-0">
      <div v-if="!selectedRegion && !selectedDepartment && !selectedCity"
        class="grid lg:grid-cols-2 max-lg:grid-cols-1 gap-5 p-8">
        <div class="col bg-gray-100 shadow-lg rounded-lg p-4 cursor-pointer"
          v-for="(departments, region) in groupedProducers" :key="region" @click="selectRegion(region)">
          <h1 class="font-extrabold text-xl">{{ region }}</h1>
        </div>
      </div>
      <div v-if="selectedRegion && !selectedDepartment && !selectedCity"
        class="grid lg:grid-cols-4 max-lg:grid-cols-1 gap-5 p-8">
        <div class="col bg-gray-100 shadow-lg rounded-lg p-4 cursor-pointer"
          v-for="(cities, department) in groupedProducers[selectedRegion]" :key="department"
          @click="selectDepartment(department)">
          <h2 class="font-bold">{{ department }}</h2>
        </div>
      </div>
      <div v-if="selectedRegion && selectedDepartment && !selectedCity"
        class="grid lg:grid-cols-4 max-lg:grid-cols-1 gap-5 p-8">
        <div class="col bg-gray-100 shadow-lg rounded-lg p-4 cursor-pointer"
          v-for="(producers, city) in groupedProducers[selectedRegion][selectedDepartment]" :key="city"
          @click="selectCity(city)">
          <h3>{{ city }}</h3>
        </div>
      </div>
      <div v-if="selectedRegion && selectedDepartment && selectedCity"
        class="grid lg:grid-cols-3 max-lg:grid-cols-1 gap-5 p-8">
        <div class="col bg-gray-100 shadow-lg rounded-lg p-6"
          v-for="producer in groupedProducers[selectedRegion][selectedDepartment][selectedCity]" :key="producer.id">
          <h2 class="font-bold text-lg text-center mb-4">{{ producer.name }}</h2>
          <p><span class="font-bold">Adresse: </span>{{ producer.address }}</p>
          <p v-if="producer.site.includes('http')"><span class="font-bold">Site:</span> <a
              class="text-blue-600 underline" :href="producer.site" target="_blank">{{ producer.site }}</a></p>
          <p><span class="font-bold">Email:</span> <a class="text-blue-600 underline"
              :href="'mailto:' + producer.email">{{ producer.email }}</a></p>
          <p><span class="font-bold">Téléphone: </span> <a class="underline" :href="'tel:' + producer.phone">{{
          producer.phone }}</a></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import producers from '../static/producers.json';
export default {
  name: 'Products',
  data() {
    return {
      producers: producers,
      filteredProducers: producers,
      groupedProducers: {},
      selectedRegion: null,
      selectedDepartment: null,
      selectedCity: null,
      search: ""
    }
  },
  async mounted() {
    this.groupProducers();
  },

  watch: {
    search: {
      immediate: true,
      deep: true,
      handler() {
        this.groupProducers();
      }
    },
    selectedRegion() {
      this.groupProducers();
    },
    selectedDepartment() {
      this.groupProducers();
    },
    selectedCity() {
      this.groupProducers();
    }
  },
  methods: {
    groupProducers() {
      const filteredProducers = this.filteredProducersBySelection();

      this.groupedProducers = filteredProducers.reduce((acc, producer) => {
        const { region, department, city } = producer;

        if (!acc[region]) acc[region] = {};
        if (!acc[region][department]) acc[region][department] = {};
        if (!acc[region][department][city]) acc[region][department][city] = [];

        acc[region][department][city].push(producer);
        return acc;
      }, {});
    },
    selectRegion(region) {
      this.selectedRegion = region;
    },
    selectDepartment(department) {
      this.selectedDepartment = department;
    },
    selectCity(city) {
      this.selectedCity = city;
    },
    goBack() {
      if (this.selectedCity) {
        this.selectedCity = null;
      } else if (this.selectedDepartment) {
        this.selectedDepartment = null;
      } else if (this.selectedRegion) {
        this.selectedRegion = null;
      }
    },
    filteredProducersBySelection() {
      let producersList = this.producers;

      if (this.selectedRegion) {
        producersList = producersList.filter(producer => producer.region === this.selectedRegion);
      }
      if (this.selectedDepartment) {
        producersList = producersList.filter(producer => producer.department === this.selectedDepartment);
      }
      if (this.selectedCity) {
        producersList = producersList.filter(producer => producer.city === this.selectedCity);
      }
      if (this.search) {
        const lowerCaseSearch = this.search
        producersList = producersList.filter(producer =>
          producer.name.toLowerCase().includes(lowerCaseSearch) ||
          producer.region.toLowerCase().includes(lowerCaseSearch) ||
          producer.city.toLowerCase().includes(lowerCaseSearch)
        );
      }

      return producersList;
    },
  }
}
</script>
