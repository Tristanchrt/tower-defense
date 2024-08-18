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
import type { PropType } from 'vue'
import type { PartyMonstersToPlay } from '@/party/domain/PartyMonsterToPlay'

const emit = defineEmits(['monsters-played'])

defineProps({
  party: {
    type: Object as PropType<PartyMonstersToPlay>,
    required: true
  }
})

const monsterPlayed = () => {
  setTimeout(() => {
    emit('monsters-played')
  }, 2000)
}

void monsterPlayed()
</script>

<style scoped></style>
