<template>
  <div class="flex items-center">
    <label for="theme-toggle" class="flex items-center cursor-pointer">
      <div class="relative">
        <input type="checkbox" id="theme-toggle" class="sr-only" :checked="colorMode.value === 'dark'"
          @change="toggleColorMode">
        <div
          class="toggle-bg w-16 h-9 bg-gray-300 rounded-full shadow-inner transition-colors duration-700 ease-in-out dark:bg-gray-600">
        </div>
        <div
          class="dot absolute w-7 h-7 bg-white rounded-full shadow flex items-center justify-center transition-all duration-1000 ease-in-out"
          :class="{ 'translate-x-8 bg-indigo-500': colorMode.value === 'dark' }">
          <Icon :name="iconName" class="w-5 h-5 transition-all duration-1000 ease-in-out"
            :class="colorMode.value === 'dark' ? 'text-yellow-300 rotate-[360deg] scale-110' : 'text-orange-400 rotate-0 scale-100'" />
        </div>
      </div>
    </label>
  </div>
</template>

<script>
export default {
  name: 'ThemeToggle',
  setup() {
    const colorMode = useColorMode()

    const iconName = computed(() => {
      return colorMode.value === 'dark' ? 'lucide:moon' : 'lucide:sun'
    })

    const toggleColorMode = () => {
      colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
    }

    return {
      colorMode,
      iconName,
      toggleColorMode
    }
  }
}
</script>

<style scoped>
.toggle-bg {
  transition: background-color 0.7s ease-in-out;
}

.dot {
  top: 3px;
  left: 3px;
  transition: all 1s cubic-bezier(0.23, 1, 0.32, 1);
}

.dot:hover {
  box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.1);
}
</style>
