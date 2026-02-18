<script setup lang="ts">
import { computed, ref } from 'vue'
import Button from './ButtonComponent.vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()
function handleClick() {
  router.push('/dashboard')
}

// Example isLogged check (replace with your actual auth logic)
const isLogged = computed(() => {
  return authStore.isLogged
})
function logout() {
  authStore.logout()
  alert('Logged Out. Redirecting to home page...')
  router.push('/')
}

const isMobileMenuOpen = ref(false)

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}
</script>

<template>
  <header class="fixed top-0 w-screen bg-slate-50 border-b border-slate-200 z-50">
    <div class="flex items-center justify-between px-10 md:px-20 py-5">
      <div class="w-36 flex flex-row items-center gap-2 cursor-pointer" @click="handleClick()">
        <img class="w-4" src="../../public/logo.png" alt="" />
        <h1 class="text-lg font-bold text-slate-800">Resume AI</h1>
      </div>

      <nav>
        <ul class="hidden md:flex flex-row gap-10 items-center">
          <li class="font-medium text-slate-600 hover:text-blue-600 transition">
            <router-link to="/"> Product </router-link>
          </li>
          <li class="font-medium text-slate-600 hover:text-blue-600 transition">
            <router-link to="/"> Pricing </router-link>
          </li>

          <li class="flex flex-row gap-5">
            <template v-if="!isLogged">
              <Button text="Get started" type="primary" to="/register" />
              <Button text="Log in" type="secundary" to="/login" />
            </template>

            <template v-else>
              <Button text="Dashboard" type="primary" to="/dashboard" />
              <Button text="Log out" type="secundary" @click="logout()" />
            </template>
          </li>
        </ul>

        <!-- Hamburger -->
        <button class="md:hidden flex flex-col gap-1.5 p-2" @click="toggleMobileMenu">
          <span class="w-6 h-0.5 bg-slate-800"></span>
          <span class="w-6 h-0.5 bg-slate-800"></span>
          <span class="w-6 h-0.5 bg-slate-800"></span>
        </button>
      </nav>
    </div>
  </header>

  <!-- Mobile Menu -->
  <div
    class="fixed inset-0 bg-slate-50 z-40 transition"
    :class="isMobileMenuOpen ? 'flex' : 'hidden'"
  >
    <div class="w-full h-full flex flex-col justify-between px-8 py-10">
      <!-- Top -->
      <div class="flex items-center justify-between">
        <h2 class="text-xl font-bold text-slate-800">Resume AI</h2>

        <button class="text-slate-600 hover:text-slate-800" @click="closeMobileMenu">✕</button>
      </div>

      <!-- Links -->
      <nav class="flex flex-col gap-6 mt-16">
        <router-link
          to="/"
          class="text-2xl font-medium text-slate-700 hover:text-blue-600 transition"
          @click="closeMobileMenu"
        >
          Product
        </router-link>

        <router-link
          to="/"
          class="text-2xl font-medium text-slate-700 hover:text-blue-600 transition"
          @click="closeMobileMenu"
        >
          Pricing
        </router-link>
      </nav>

      <!-- Actions -->
      <div class="flex flex-col gap-4">
        <template v-if="!isLogged">
          <a
            href="/register"
            class="w-full text-center px-6 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-500 active:bg-blue-700 transition"
          >
            Get started
          </a>

          <a
            href="/login"
            class="w-full text-center px-6 py-3 rounded-lg border border-slate-200 text-slate-700 font-medium hover:bg-slate-100 transition"
          >
            Log in
          </a>
        </template>

        <template v-else>
          <a
            href="/dashboard"
            class="w-full text-center px-6 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-500 transition"
          >
            Dashboard
          </a>

          <button
            class="w-full px-6 py-3 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 transition"
            @click="logout"
          >
            Log out
          </button>
        </template>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
