<template>
  <div class="party-players-to-play">`
    <div class="party-board">
      <h1>Party #{{ partyId }}</h1>
      <h3>Round #1</h3>
      <BoardCard :board="party!.getBoard()" v-if="party" />
    </div>
    <div class="players" v-if="party">
      <span class="player" :key="player.getName()" v-for="player in party!.getPlayers()">{{ player.getName() }}</span>
    </div>
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
  console.log(party.value)
})
</script>

<style scoped>
.party-players-to-play {
  display: flex;
  justify-content: center;
  align-items: center;
}
.players {
  margin-left: 3em;
  display: flex;
  flex-direction: column;
}
.player {
  margin: 10px;
  padding: 8px;
 }
.player:hover {
  background-color: grey;
  margin: 10px;
}
</style>
