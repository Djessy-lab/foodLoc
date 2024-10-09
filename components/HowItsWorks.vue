<template>
  <div class="sm:w-[100%] lg:w-[40%] mx-auto">
    <img :src="imgArg" alt="Comment ça marche">
  </div>
</template>


<script>
export default {
  name: 'HowItsWorks',
  props: {
    imgArg: { type: String, default: "" },
  }
}
</script>
