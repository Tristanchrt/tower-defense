<template>
  <div class="party-players-to-play" v-if="party">
    <div class="party-board">
      <h1>Party #{{ party.id }}</h1>
      <h3>Round #{{ party.round }}</h3>
      <BoardCard :board="party.display()" />
    </div>
    <PlayersList :players="party.getPlayers()" :player-turn="playerToPlayer as Player" />
    <div class="tower-lifecycle">
      <AddTowerCard @add-tower="onAddTower" />
      <div class="break-1" />
      <TowersList :towers="party.getTowers()" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { inject, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { PartiesApplicationService } from '@/party/application/PartiesApplicationService'
import BoardCard from '@/party/infrastructure/primary/components/BoardCard.vue'
import PlayersList from '@/party/infrastructure/primary/components/PlayersList.vue'
import AddTowerCard from '@/party/infrastructure/primary/components/AddTowerCard.vue'
import type { PartyPlayersToPlay } from '@/party/domain/PartyPlayersToPlay'
import { Tower } from '@/party/domain/Tower'
import { Player } from '@/party/domain/Player'
import type { Cell } from '@/party/domain/Cell'
import TowersList from '@/party/infrastructure/primary/components/TowersList.vue'

const party = ref<PartyPlayersToPlay>()
const playerToPlayer = ref<Player>()
const playersPlayed = ref<Record<string, Player>>({})

const partyHandler = inject('partyApplicationService') as PartiesApplicationService

const fetchParty = () => {
  const route = useRoute()
  party.value = partyHandler.getPartyById(route.params.id as string) as PartyPlayersToPlay
  playerToPlayer.value = party.value!.getFirstPlayer()
}

const isAllPlayersHasPlayed = (): boolean =>
  Object.keys(playersPlayed.value).length === party.value?.getPlayers().length

const createTower = (x: number, y: number, player: Player) => new Tower(x, y, 5, player)

const onAddTower = ({ x, y }: Cell) => {
  playersPlayed.value[playerToPlayer.value!.getName()] = playerToPlayer.value!
  const tower = createTower(x, y, playerToPlayer!.value as Player)
  party.value?.addTower(tower)
  playerToPlayer.value = party.value?.getLastPlayer()
  if (isAllPlayersHasPlayed()) {
    const partyMonsterToPlay = partyHandler.toMonsterToPlay(party.value as PartyPlayersToPlay)
    party.value = partyHandler.monsterPlay(partyMonsterToPlay)
  }
}
onMounted(() => {
  void fetchParty()
})
</script>

<style scoped>
.party-players-to-play {
  display: flex;
  justify-content: center;
  align-items: center;
}
.tower-lifecycle {
  display: flex;
  flex-direction: column;
}
</style>
