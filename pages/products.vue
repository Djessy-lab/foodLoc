<template>
  <div>
    <div :class="gradientClass">
      <div class="text-xl font-bold font-mono p-4"><a href="/">{{ appName }}</a></div>
      <h1 class="text-center text-6xl font-amsterdam">Liste des Producteurs</h1>
      <div class="flex justify-center mt-10">
        <input v-model="search" type="text" id="search-email" placeholder="Recherchez votre producteur ici"
          class="rounded-2xl shadow w-80 p-2 text-center" />
      </div>
      <div v-if="selectedRegion || selectedDepartment || selectedCity">
        <button @click="goBack" class="w-20 ml-2 mt-2 rounded-lg">
          <Icon name="ic:baseline-arrow-back" class="text-4xl" />
        </button>
      </div>
    </div>
    <div :class="`bg-gradient-to-b ${gradientClass100to0} flex flex-col-reverse lg:flex-row`">
      <div class="lg:w-2/3 p-8">
        <LocationSelector :regions="Object.keys(groupedProducers)"
          :departments="selectedRegion ? Object.keys(groupedProducers[selectedRegion]) : []"
          :cities="selectedDepartment ? Object.keys(groupedProducers[selectedRegion][selectedDepartment]) : []"
          :groupedProducers="groupedProducers" :selectedRegion="selectedRegion" :selectedDepartment="selectedDepartment"
          :selectedCity="selectedCity" @regionSelected="selectRegion" @departmentSelected="selectDepartment"
          @citySelected="selectCity" />
      </div>
      <div class="lg:w-1/3 p-8 flex justify-center items-center">
        <div class="w-[100%] h-[100%]">
          <FranceMap :color="color" @regionSelected="(region) => selectRegion(region)" />
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
      search: "",
      color: this.$route.query.color,
      appName: this.$route.query.appName,
    };
  },
  mounted() {
    this.groupProducers();
    const token = localStorage.getItem('token');
    if(!token){
      this.$router.push('/login');
    }
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
  computed: {
    gradientClass() {
      const colorClasses = {
        blue: 'bg-gradient-to-b from-blue-200 to-blue-100',
        red: 'bg-gradient-to-b from-red-200 to-red-100',
        green: 'bg-gradient-to-b from-green-200 to-green-100',
        yellow: 'bg-gradient-to-b from-yellow-200 to-yellow-100',
        emerald: 'bg-gradient-to-b from-emerald-200 to-emerald-100',
        sky: 'bg-gradient-to-b from-sky-200 to-sky-100',
        rose: 'bg-gradient-to-b from-rose-200 to-rose-100',
        slate: 'bg-gradient-to-b from-slate-200 to-slate-100',
        pink: 'bg-gradient-to-b from-pink-200 to-pink-100',
        orange: 'bg-gradient-to-b from-orange-200 to-orange-100',
        neutral: 'bg-gradient-to-b from-neutral-200 to-neutral-100',
        stone: 'bg-gradient-to-b from-stone-200 to-stone-100',
        amber: 'bg-gradient-to-b from-amber-200 to-amber-100',
        lime: 'bg-gradient-to-b from-lime-200 to-lime-100',
        teal: 'bg-gradient-to-b from-teal-200 to-teal-100',
        cyan: 'bg-gradient-to-b from-cyan-200 to-cyan-100',
        indigo: 'bg-gradient-to-b from-indigo-200 to-indigo-100',
        violet: 'bg-gradient-to-b from-violet-200 to-violet-100',
        purple: 'bg-gradient-to-b from-purple-200 to-purple-100',
        fuchsia: 'bg-gradient-to-b from-fuchsia-200 to-fuchsia-100',
        dark: 'bg-gray-900 text-white'
      };
      return colorClasses[this.color] || colorClasses['blue'];
    },
    gradientClass100to0() {
      const colorClasses = {
        blue: 'bg-gradient-to-b from-blue-100 to-blue-0',
        red: 'bg-gradient-to-b from-red-100 to-red-0',
        green: 'bg-gradient-to-b from-green-100 to-green-0',
        yellow: 'bg-gradient-to-b from-yellow-100 to-yellow-0',
        emerald: 'bg-gradient-to-b from-emerald-100 to-emerald-0',
        sky: 'bg-gradient-to-b from-sky-100 to-sky-0',
        rose: 'bg-gradient-to-b from-rose-100 to-rose-0',
        slate: 'bg-gradient-to-b from-slate-100 to-slate-0',
        pink: 'bg-gradient-to-b from-pink-100 to-pink-0',
        orange: 'bg-gradient-to-b from-orange-100 to-orange-0',
        neutral: 'bg-gradient-to-b from-neutral-100 to-neutral-0',
        stone: 'bg-gradient-to-b from-stone-100 to-stone-0',
        amber: 'bg-gradient-to-b from-amber-100 to-amber-0',
        lime: 'bg-gradient-to-b from-lime-100 to-lime-0',
        teal: 'bg-gradient-to-b from-teal-100 to-teal-0',
        cyan: 'bg-gradient-to-b from-cyan-100 to-cyan-0',
        indigo: 'bg-gradient-to-b from-indigo-100 to-indigo-0',
        violet: 'bg-gradient-to-b from-violet-100 to-violet-0',
        purple: 'bg-gradient-to-b from-purple-100 to-purple-0',
        fuchsia: 'bg-gradient-to-b from-fuchsia-100 to-fuchsia-0',
      };
      return colorClasses[this.color] || colorClasses['blue'];
    },
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
