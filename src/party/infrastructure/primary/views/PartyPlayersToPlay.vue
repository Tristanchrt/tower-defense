<template>
  <div class="party-players-to-play" v-if="party">
    `
    <div class="party-board">
      <h1>Party #{{ partyId }}</h1>
      <h3>Round #1</h3>
      <BoardCard :board="party.getBoard()" />
    </div>
    <PlayersList :players="party.getPlayers()" :player-turn="playerToPlayer as Player" />
    <AddTowerCard @add-tower="addTower" />
  </div>
</template>

<script lang="ts" setup>
import { inject, ref } from 'vue'
import { useRoute } from 'vue-router'
import { PartiesApplicationService } from '@/party/application/PartiesApplicationService'
import BoardCard from '@/party/infrastructure/primary/components/BoardCard.vue'
import PlayersList from '@/party/infrastructure/primary/components/PlayersList.vue'
import AddTowerCard from '@/party/infrastructure/primary/components/AddTowerCard.vue'
import type { PartyPlayersToPlay } from '@/party/domain/PartyPlayersToPlay'
import { Tower } from '@/party/domain/Tower'
import { Player } from '@/party/domain/Player'

const partyId = ref<string | null>(null)
const party = ref<PartyPlayersToPlay>()
const playerToPlayer = ref<Player>()

const partyHandler = inject('partyApplicationService') as PartiesApplicationService

const route = useRoute()

const fetchParty = () => {
  partyId.value = (route.params.id as string | undefined) ?? null
  party.value = partyHandler.getParties()[0] as PartyPlayersToPlay
  playerToPlayer.value = party.value!.getPlayers()[0]
}

const addTower = () => {
  const tower = new Tower(0,0,10, party.value!.getPlayers()[0])
  party.value?.play(tower)
  playerToPlayer.value = party.value?.getPlayers()[1]
}

fetchParty()
</script>

<style scoped>
.party-players-to-play {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
