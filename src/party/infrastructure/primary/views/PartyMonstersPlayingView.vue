<template>
  <div class="party-monsters-playing">
    <div class="party-board">
      <h1>Party #{{ party.id }}</h1>
      <h3>Round #{{ party.getRound() }}</h3>
      <h3>Monsters playing...</h3>
      <BoardCard :board="board as Board" v-if="board" />
    </div>
    <div class="tower-lifecycle">
      <TowersList :towers="towers" v-if="towers" />
    </div>
  </div>
</template>

<script setup lang="ts">
import TowersList from '@/party/infrastructure/primary/components/TowersList.vue'
import BoardCard from '@/party/infrastructure/primary/components/BoardCard.vue'
import { inject, type PropType, ref } from 'vue'
import type { PartyMonstersToPlay } from '@/party/domain/PartyMonsterToPlay'
import { PartiesApplicationService } from '@/party/application/PartiesApplicationService'
import { Board } from '@/party/domain/Board'
import type { Tower } from '@/party/domain/Tower'

const emit = defineEmits(['monsters-played'])

const partyHandler = inject('partyApplicationService') as PartiesApplicationService

const props = defineProps({
  party: {
    type: Object as PropType<PartyMonstersToPlay>,
    required: true
  }
})

const board = ref<Board>()
const towers = ref<Tower[]>()

const initBoard = () => (board.value = props.party?.display())
const setTowers = () => (towers.value = board.value?.getTowers())

const monsterPlayed = async () => {
  setTimeout(async () => {
    const party = partyHandler.monsterPlay(props.party as PartyMonstersToPlay)

    const events = partyHandler
      .getEvents(party.id)
      .filter((e) => e.round === props.party.getRound())

    for (const event of events) {
      await new Promise((resolve) => setTimeout(resolve, 200))
      board.value?.updateCell(event.cell)
      void setTowers()
      console.log(event, board.value)
    }

    emit('monsters-played', party)
  }, 500)
}

void initBoard()
void setTowers()
void monsterPlayed()
</script>

<style scoped></style>
