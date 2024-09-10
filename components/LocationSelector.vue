<template>
  <div>
    <div v-if="!selectedRegion && !selectedDepartment && !selectedCity"
      class="grid lg:grid-cols-2 max-lg:grid-cols-1 gap-5">
      <div class="col bg-gray-100 shadow-lg rounded-lg p-4 cursor-pointer"
        v-for="(departments, region) in groupedProducers" :key="region" @click="selectRegion(region)">
        <h1 class="font-extrabold text-xl">{{ region }}</h1>
      </div>
    </div>
    <div v-if="selectedRegion && !selectedDepartment && !selectedCity"
      class="grid lg:grid-cols-2 max-lg:grid-cols-1 gap-5">
      <div class="col bg-gray-100 shadow-lg rounded-lg p-4 cursor-pointer"
        v-for="(cities, department) in groupedProducers[selectedRegion]" :key="department"
        @click="selectDepartment(department)">
        <h2 class="font-bold">{{ department }}</h2>
      </div>
    </div>
    <div v-if="selectedRegion && selectedDepartment && !selectedCity"
      class="grid lg:grid-cols-2 max-lg:grid-cols-1 gap-5">
      <div class="col bg-gray-100 shadow-lg rounded-lg p-4 cursor-pointer"
        v-for="(producers, city) in groupedProducers[selectedRegion][selectedDepartment]" :key="city"
        @click="selectCity(city)">
        <h3>{{ city }}</h3>
      </div>
    </div>
    <ProducerCard :selectedRegion="selectedRegion" :selectedDepartment="selectedDepartment" :selectedCity="selectedCity"
      :groupedProducers="groupedProducers" />
  </div>
</template>

<script>
export default {
  name: "LocationSelector",
  emits: ["regionSelected", "departmentSelected", "citySelected"],
  data() {
    return {
    }
  },
  props: {
    regions: {
      type: Array,
      required: true,
    },
    departments: {
      type: Array,
      required: false,
    },
    cities: {
      type: Array,
      required: false,
    },
    selectedRegion: {
      type: String,
      required: false,
    },
    selectedDepartment: {
      type: String,
      required: false,
    },
    selectedCity: {
      type: String,
      required: false,
    },
    groupedProducers: {
      type: Object,
      required: true,
    }
  },
  methods: {
    selectRegion(region) {
      this.$emit("regionSelected", region);
    },
    selectDepartment(department) {
      this.$emit("departmentSelected", department);
    },
    selectCity(city) {
      this.$emit("citySelected", city);
    },
  }
}
</script>
