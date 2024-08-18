<template>
  <div class="party-players-to-play" v-if="party">
    <div class="party-board">
      <h1>Party #{{ party.id }}</h1>
      <h3>Round #{{ party.getRound() }}</h3>
      <BoardCard :board="party.display()" />
    </div>
    <PlayersList :players="party.getPlayers()" :player-turn="playerToPlayer as Player" />
    <div class="tower-lifecycle">
      <AddTowerCard @add-tower="onAddTower" />
      <div class="break-1" />
      <TowersList :key="renderCount" :towers="party.getTowers()" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { inject, type PropType, ref } from 'vue'
import { PartiesApplicationService } from '@/party/application/PartiesApplicationService'
import BoardCard from '@/party/infrastructure/primary/components/BoardCard.vue'
import PlayersList from '@/party/infrastructure/primary/components/PlayersList.vue'
import AddTowerCard from '@/party/infrastructure/primary/components/AddTowerCard.vue'
import type { PartyPlayersToPlay } from '@/party/domain/PartyPlayersToPlay'
import { Tower } from '@/party/domain/Tower'
import { Player } from '@/party/domain/Player'
import type { Cell } from '@/party/domain/Cell'
import TowersList from '@/party/infrastructure/primary/components/TowersList.vue'

const playerToPlayer = ref<Player>()
const playersPlayed = ref<Record<string, Player>>({})
const renderCount = ref(0)

const emit = defineEmits(['players-played'])

const props = defineProps({
  party: {
    type: Object as PropType<PartyPlayersToPlay>,
    required: true
  }
})

const partyHandler = inject('partyApplicationService') as PartiesApplicationService

const getPlayerToPlay = () => {
  playerToPlayer.value = props.party.getFirstPlayer()
}

const isAllPlayersHasPlayed = (): boolean =>
  Object.keys(playersPlayed.value).length === props.party.getPlayers().length

const createTower = (x: number, y: number, player: Player) =>
  new Tower(crypto.randomUUID(), x, y, 5, player)

const onAddTower = ({ x, y }: Cell) => {
  playersPlayed.value[playerToPlayer.value!.getName()] = playerToPlayer.value!
  const tower = createTower(x, y, playerToPlayer!.value as Player)

  partyHandler.addTowerToParty(props.party.id, tower)
  playerToPlayer.value = props.party.getLastPlayer()
  renderCount.value += 1

  if (isAllPlayersHasPlayed()) {
    emit('players-played')
    playersPlayed.value = {}
  }
}

void getPlayerToPlay()
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
