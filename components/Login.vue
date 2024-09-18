<template>
  <div>
    <input v-model="email" type="email" placeholder="Enter your email" />
    <button @click="loginWithMagic">Login with Magic Link</button>
  </div>
</template>

<script setup>
import { useNuxtApp } from '#app';
import { ref } from 'vue';

const email = ref('');
const nuxtApp = useNuxtApp();

const loginWithMagic = async () => {
  try {
    const didToken = await nuxtApp.$magic.auth.loginWithMagicLink({ email: email.value });
    console.log('DID Token:', didToken);
  } catch (error) {
    console.error('Login failed:', error);
  }
};
</script>
