<template>
  <div class="parties-list">
    <div v-for="party in parties" :key="party.id">
      <span class="party">{{ party.id }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Party } from '@/party/domain/Party'
import type { PropType } from 'vue'

defineProps({
  parties: {
    type: Array as PropType<Party[]>,
    required: true
  }
})
</script>
