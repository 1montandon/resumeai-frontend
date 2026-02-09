<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  type: {
    type: String,
    default: 'primary', // 'primary' or 'secondary'
  },
  to: {
    type: String,
    default: '',
  },
  text: {
    type: String,
    required: true,
  },
  block: {
    type: Boolean,
    default: false,
  },
})

const router = useRouter()

const buttonClass = computed(() =>
  [
    props.type === 'primary'
      ? 'bg-blue-600 hover:bg-blue-500 text-slate-50 px-5 py-3 rounded-lg font-medium transition'
      : 'border border-slate-300 text-slate-700 hover:bg-slate-100 px-5 py-3 rounded-lg font-medium transition',
    props.block == true ? 'w-full' : '',
  ].join(' '),
)

function handleClick() {
  if (props.to) {
    router.push(props.to)
  }
}
</script>
<template>
  <button :class="buttonClass" @click="handleClick">
    {{ text }}
  </button>
</template>
