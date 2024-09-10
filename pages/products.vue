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
    <div class="bg-gradient-to-b from-blue-100 to-blue-0 flex flex-col-reverse lg:flex-row">
      <div class="lg:w-2/3 p-8">
        <LocationSelector
          :regions="Object.keys(groupedProducers)"
          :departments="selectedRegion ? Object.keys(groupedProducers[selectedRegion]) : []"
          :cities="selectedDepartment ? Object.keys(groupedProducers[selectedRegion][selectedDepartment]) : []"
          :groupedProducers="groupedProducers"
          :selectedRegion="selectedRegion"
          :selectedDepartment="selectedDepartment"
          :selectedCity="selectedCity"
          @regionSelected="selectRegion"
          @departmentSelected="selectDepartment"
          @citySelected="selectCity"
        />
      </div>
      <div class="lg:w-1/3 p-8 flex justify-center items-center">
        <div class="w-[100%] h-[100%]">
          <FranceMap @regionSelected="(region) => selectRegion(region)" />
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
      groupedProducers: {},
      selectedRegion: null,
      selectedDepartment: null,
      selectedCity: null,
      search: ""
    };
  },
  mounted() {
    this.groupProducers();
  },
  watch: {
    search() {
      this.groupProducers();
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
      this.selectedDepartment = null;
      this.selectedCity = null;
    },
    selectDepartment(department) {
      this.selectedDepartment = department;
      this.selectedCity = null;
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
        const lowerCaseSearch = this.search.toLowerCase();
        producersList = producersList.filter(producer =>
          producer.name.toLowerCase().includes(lowerCaseSearch) ||
          producer.region.toLowerCase().includes(lowerCaseSearch) ||
          producer.city.toLowerCase().includes(lowerCaseSearch)
        );
      }

      return producersList;
    }
  }
};
</script>
