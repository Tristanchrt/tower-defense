<template>
  <div class="party-players-to-play" v-if="party">
    <div class="party-board">
      <h1>Party #{{ party.id }}</h1>
      <h3>Round #{{ round }}</h3>
      <BoardCard :board="party.getBoard()" />
    </div>
    <PlayersList :players="party.getPlayers()" :player-turn="playerToPlayer as Player" />
    <AddTowerCard @add-tower="onAddTower" />
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

const party = ref<PartyPlayersToPlay>()
const playerToPlayer = ref<Player>()
const playersPlayed = ref<Record<string, Player>>({})
const round = ref<number>(1)

const partyHandler = inject('partyApplicationService') as PartiesApplicationService

const route = useRoute()

const fetchParty = () => {
  party.value = partyHandler.getPartyById(route.params.id as string) as PartyPlayersToPlay
  playerToPlayer.value = party.value!.getFirstPlayer()
}

const isAllPlayersHasPlayed = (): boolean =>
  Object.keys(playersPlayed.value).length === party.value?.getPlayers().length

const createTower = (x: number, y: number, player: Player) => new Tower(x, y, 10, player)

const onAddTower = ({ x, y }: { x: number; y: number }) => {
  playersPlayed.value[playerToPlayer.value!.getName()] = playerToPlayer.value!
  const tower = createTower(x, y, playerToPlayer!.value as Player)
  party.value?.play(tower)
  playerToPlayer.value = party.value?.getLastPlayer()
  if (isAllPlayersHasPlayed()) {
    playerToPlayer.value = party.value?.getFirstPlayer()
    round.value += 1
  }
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
