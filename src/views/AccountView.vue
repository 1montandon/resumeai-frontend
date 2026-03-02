<script setup lang="ts">
import { reactive } from 'vue'
import Header from '@/components/HeaderComponent.vue'
import Button from '@/components/ButtonComponent.vue'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

const profileForm = reactive({
  username: authStore.user.username,
  email: authStore.user.email,
})

const passwordForm = reactive({
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
})

function updateProfile() {
  console.log('Update profile', profileForm)
}

function updatePassword() {
  console.log('Update password', passwordForm)
}

function deleteAccount() {
  console.log('Delete account')
}
</script>

<template>
  <Header />

  <div class="min-h-svh bg-slate-50 px-60 py-12 flex flex-col gap-12">

    <!-- Page Header -->
    <div class="flex flex-col gap-2">
      <h1 class="text-3xl font-bold text-slate-800">
        Account Settings
      </h1>
      <p class="text-slate-600">
        Manage your profile information and security settings.
      </p>
    </div>

    <!-- Profile Section -->
    <div class="rounded-xl border border-slate-200 bg-white/90 p-8 flex flex-col gap-6">
      <h2 class="text-xl font-semibold text-slate-800">
        Profile Information
      </h2>

      <div class="flex flex-col gap-4">
        <div class="flex flex-col gap-1">
          <label class="text-sm text-slate-500">Username</label>
          <input
            v-model="profileForm.username"
            class="border border-slate-200 rounded-lg px-4 py-2
                   text-slate-700 focus:outline-none
                   focus:ring-2 focus:ring-blue-600"
          />
        </div>

        <div class="flex flex-col gap-1">
          <label class="text-sm text-slate-500">Email</label>
          <input
            v-model="profileForm.email"
            type="email"
            class="border border-slate-200 rounded-lg px-4 py-2
                   text-slate-700 focus:outline-none
                   focus:ring-2 focus:ring-blue-600"
          />
        </div>
      </div>

      <div class="flex justify-end">
        <Button type="primary" text="Save changes" />
      </div>
    </div>

    <!-- Security Section -->
    <div class="rounded-xl border border-slate-200 bg-white/90 p-8 flex flex-col gap-6">
      <h2 class="text-xl font-semibold text-slate-800">
        Change Password
      </h2>

      <div class="flex flex-col gap-4">
        <input
          v-model="passwordForm.currentPassword"
          type="password"
          placeholder="Current password"
          class="border border-slate-200 rounded-lg px-4 py-2
                 text-slate-700 focus:outline-none
                 focus:ring-2 focus:ring-blue-600"
        />

        <input
          v-model="passwordForm.newPassword"
          type="password"
          placeholder="New password"
          class="border border-slate-200 rounded-lg px-4 py-2
                 text-slate-700 focus:outline-none
                 focus:ring-2 focus:ring-blue-600"
        />

        <input
          v-model="passwordForm.confirmPassword"
          type="password"
          placeholder="Confirm new password"
          class="border border-slate-200 rounded-lg px-4 py-2
                 text-slate-700 focus:outline-none
                 focus:ring-2 focus:ring-blue-600"
        />
      </div>

      <div class="flex justify-end">
        <Button type="primary" text="Update password" />
      </div>
    </div>

    <!-- Account Info -->
    <div class="rounded-xl border border-slate-200 bg-white/90 p-8 flex flex-col gap-4">
      <h2 class="text-xl font-semibold text-slate-800">
        Account Information
      </h2>

      <div class="text-sm text-slate-600 flex flex-col gap-2">
        <p><span class="text-slate-500">User ID:</span> {{ authStore.user.id }}</p>
        <p>
          <span class="text-slate-500">Member since:</span>
          {{ new Date(authStore.user.createdAt).toLocaleDateString() }}
        </p>
        <p>
          <span class="text-slate-500">Total analyses:</span>
          {{ authStore.user.analyses?.length || 0 }}
        </p>
      </div>
    </div>

    <!-- Danger Zone -->
    <div class="rounded-xl border border-red-200 bg-white p-8 flex flex-col gap-4">
      <h2 class="text-xl font-semibold text-red-600">
        Danger Zone
      </h2>

      <p class="text-sm text-slate-600">
        Permanently delete your account and all associated analyses.
        This action cannot be undone.
      </p>

      <div class="flex justify-end">
        <button
          class="px-4 py-2 rounded-lg border border-red-300
                 text-red-600 hover:bg-red-50 transition"
          @click="deleteAccount"
        >
          Delete account
        </button>
      </div>
    </div>

  </div>
</template>
