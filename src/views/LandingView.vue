<script setup lang="ts">
import Header from '@/components/HeaderComponent.vue'
import Button from '@/components/ButtonComponent.vue'
import Footer from '@/components/FooterComponent.vue'
import { Check } from 'lucide-vue-next'
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import Card from '@/components/Landing/CardComponent.vue'
const authStore = useAuthStore()
const route = ref('')
if (authStore.isLogged) {
  route.value = '/dashboard'
} else {
  route.value = '/login'
}
</script>
<template>
  <main class="flex flex-col gap-20 items-center">
    <section
      class="min-h-[80vh] flex flex-col max-w-5xl px-10 md:px-20 items-center justify-center gap-8"
    >
      <div class="text-center">
        <h1 class="text-4xl md:text-6xl lg:text-7xl font-black text-slate-800">
          Unlock Your Career Potential with ResumeAI!
        </h1>
      </div>
      <div class="text-center">
        <p class="text-base text-slate-600">
          Our AI-powered platform analyzes your resume against job descriptions, providing
          actionable insights to enhance your application and increase your chances of landing your
          dream job.
        </p>
      </div>
      <div class="w-full sm:w-auto">
        <Button type="primary" :to="route" text="Analyze Now" block></Button>
      </div>
    </section>
    <section class="bg-slate-100 w-full flex justify-center px-10 md:px-20 py-20">
      <div class="grid lg:grid-cols-2 gap-16 items-center">
        <div class="bg-black w-full h-115 rounded-lg">
          <img src="" alt="" />
        </div>
        <div class="flex gap-5 flex-col">
          <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-800">
            Optimize Your Resume’s Potential
          </h2>
          <p class="text-base text-slate-600">
            Leverage smart insights and personalized guidance to stand out from the crowd. Elevate
            every section of your resume, ensuring it resonates with hiring managers and unlocks the
            next step in your career.
          </p>
          <ul class="text-sm text-slate-600 flex gap-2 flex-col">
            <li class="flex gap-2"><Check /> Showcase your most relevant experiences</li>
            <li class="flex gap-2"><Check />Align keywords with industry demands</li>
            <li class="flex gap-2"><Check /> Refine format for clarity and appeal</li>
            <li class="flex gap-2"><Check />Strengthen each section with targeted improvements</li>
          </ul>
        </div>
      </div>
    </section>
    <section
      class="px-10 md:px-20 items-center justify-center py-15 grid md:grid-cols-3 grid-cols-1 gap-6"
    >
      <Card
        title="AI-Powered Resume Analyzes"
        description=" Use cutting-edge AI to highlight your strengths, background, and ambitions. Produce a
          polished resume that resonates with recruiters."
      />
      <Card
        title="AI-Powered Resume Analyzes"
        description=" Use cutting-edge AI to highlight your strengths, background, and ambitions. Produce a
          polished resume that resonates with recruiters."
      />
      <Card
        title="AI-Powered Resume Analyzes"
        description=" Use cutting-edge AI to highlight your strengths, background, and ambitions. Produce a
          polished resume that resonates with recruiters."
      />
    </section>
  </main>
</template>

<style scoped></style>
