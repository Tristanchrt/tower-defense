<template>
  <div class="party-players-to-play">
    <h1>Party #{{ partyId }}</h1>
    <h3>Round #1</h3>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const partyId = ref<string | null>(null)

onMounted(() => {
  const route = useRoute()
  partyId.value = (route.params.id as string | undefined) ?? null
})
</script>