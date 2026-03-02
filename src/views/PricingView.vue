<script setup lang="ts">
import Header from '@/components/HeaderComponent.vue'
import Button from '@/components/ButtonComponent.vue'
</script>

<template>
  <Header />

  <div class="min-h-svh bg-slate-50 px-20 py-16 flex flex-col gap-16">

    <!-- Title -->
    <div class="text-center flex flex-col gap-3 max-w-2xl mx-auto">
      <h1 class="text-4xl font-bold text-slate-800">
        Simple, transparent pricing
      </h1>
      <p class="text-slate-600">
        Choose the plan that fits your job search needs.
        Upgrade anytime.
      </p>
    </div>

    <!-- Pricing Cards -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto w-full">

      <!-- Free Plan -->
      <div class="rounded-xl border border-slate-200 bg-white/90 p-8 flex flex-col gap-6">
        <div class="flex flex-col gap-2">
          <h2 class="text-xl font-semibold text-slate-800">Free</h2>
          <p class="text-slate-500 text-sm">For getting started</p>
        </div>

        <div>
          <span class="text-3xl font-bold text-slate-800">$0</span>
          <span class="text-slate-500"> / month</span>
        </div>

        <ul class="flex flex-col gap-3 text-slate-600 text-sm">
          <li>• 3 resume analyses per month</li>
          <li>• Basic compatibility score</li>
          <li>• Overview summary</li>
        </ul>

        <div class="mt-auto">
          <Button type="secundary" text="Start free" to="/register" />
        </div>
      </div>

      <!-- Pro Plan (Highlighted) -->
      <div
        class="rounded-xl border-2 border-blue-600 bg-white p-8 flex flex-col gap-6 relative"
      >
        <!-- Badge -->
        <div
          class="absolute -top-3 left-1/2 -translate-x-1/2
                 bg-blue-50 text-blue-700 text-xs font-medium
                 px-3 py-1 rounded-full"
        >
          Most Popular
        </div>

        <div class="flex flex-col gap-2">
          <h2 class="text-xl font-semibold text-slate-800">Pro</h2>
          <p class="text-slate-500 text-sm">For serious job seekers</p>
        </div>

        <div>
          <span class="text-3xl font-bold text-slate-800">$19</span>
          <span class="text-slate-500"> / month</span>
        </div>

        <ul class="flex flex-col gap-3 text-slate-600 text-sm">
          <li>• Unlimited analyses</li>
          <li>• Detailed strengths & weaknesses</li>
          <li>• Smart improvement suggestions</li>
          <li>• Priority processing</li>
        </ul>

        <div class="mt-auto">
          <Button type="primary" text="Upgrade to Pro" to="/register" />
        </div>
      </div>

      <!-- Business Plan -->
      <div class="rounded-xl border border-slate-200 bg-white/90 p-8 flex flex-col gap-6">
        <div class="flex flex-col gap-2">
          <h2 class="text-xl font-semibold text-slate-800">Business</h2>
          <p class="text-slate-500 text-sm">For recruiters & teams</p>
        </div>

        <div>
          <span class="text-3xl font-bold text-slate-800">$49</span>
          <span class="text-slate-500"> / month</span>
        </div>

        <ul class="flex flex-col gap-3 text-slate-600 text-sm">
          <li>• Everything in Pro</li>
          <li>• Team dashboard</li>
          <li>• Candidate comparison tools</li>
          <li>• Export reports (PDF)</li>
        </ul>

        <div class="mt-auto">
          <Button type="secundary" text="Contact sales" to="/contact" />
        </div>
      </div>

    </div>

    <!-- Bottom Section -->
    <div class="text-center text-slate-500 text-sm">
      No hidden fees. Cancel anytime.
    </div>

  </div>
</template>
