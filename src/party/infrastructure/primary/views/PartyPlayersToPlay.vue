<template>
  <div class="party-players-to-play">
    <h1>Party #{{ partyId }}</h1>
    <h3>Round #1</h3>
    <BoardCard :board="party!.getBoard()" v-if="party"/>
  </div>
</template>

<script lang="ts" setup>
import { inject, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import type { Party } from '@/party/domain/Party'
import { PartiesApplicationService } from '@/party/application/PartiesApplicationService'
import BoardCard from '@/party/infrastructure/primary/components/BoardCard.vue'

const partyId = ref<string | null>(null)
const party = ref<Party>()

const partyHandler = inject('partyApplicationService') as PartiesApplicationService

onMounted(() => {
  const route = useRoute()
  partyId.value = (route.params.id as string | undefined) ?? null
  party.value = partyHandler.getParties()[0]
})
</script>