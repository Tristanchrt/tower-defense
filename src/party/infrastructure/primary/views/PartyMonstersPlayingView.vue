<template>
  <div class="party-monsters-playing">
    <div class="party-board">
      <h1>Party #{{ party.id }}</h1>
      <h3>Round #{{ party.getRound() }}</h3>
      <h3>Monsters playing...</h3>
      <BoardCard :board="party.display()" />
    </div>
    <div class="tower-lifecycle">
      <TowersList :towers="party.getTowers()" />
    </div>
  </div>
</template>

<script setup lang="ts">
import TowersList from '@/party/infrastructure/primary/components/TowersList.vue'
import BoardCard from '@/party/infrastructure/primary/components/BoardCard.vue'
import { inject, type PropType } from 'vue'
import type { PartyMonstersToPlay } from '@/party/domain/PartyMonsterToPlay'
import { PartiesApplicationService } from '@/party/application/PartiesApplicationService'

const emit = defineEmits(['monsters-played'])

const partyHandler = inject('partyApplicationService') as PartiesApplicationService

const props = defineProps({
  party: {
    type: Object as PropType<PartyMonstersToPlay>,
    required: true
  }
})

const monsterPlayed = () => {
  setTimeout(() => {
    const party = partyHandler.monsterPlay(props.party as PartyMonstersToPlay)
    emit('monsters-played', party)
  }, 2000)
}

void monsterPlayed()
</script>

<style scoped></style>
