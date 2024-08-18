<template>
  <div class="party-playing-view">
    <PartyMonstersPlaying
      :party="party as PartyMonstersToPlay"
      v-if="partyState(party as Party) === PartyStatus.MONSTERS_PLAYING"
    />
    <PartyPlayersToPlayView
      :key="renderUpdate"
      @players-played="playersPlayed"
      :party="party as PartyPlayersToPlay"
      v-if="partyState(party as Party) === PartyStatus.PLAYERS_TO_PLAY"
    />
  </div>
</template>

<script setup lang="ts">
import PartyMonstersPlaying from '@/party/infrastructure/primary/views/PartyMonstersPlayingView.vue'
import { useRoute } from 'vue-router'
import { inject, ref } from 'vue'
import { PartiesApplicationService } from '@/party/application/PartiesApplicationService'
import type { Party } from '@/party/domain/Party'
import { PartyMonstersToPlay } from '@/party/domain/PartyMonsterToPlay'
import { PartyStatus } from '@/party/domain/PartyStatus'
import { PartyPlayersToPlay } from '@/party/domain/PartyPlayersToPlay'
import PartyPlayersToPlayView from '@/party/infrastructure/primary/views/PartyPlayersToPlayView.vue'

const partyHandler = inject('partyApplicationService') as PartiesApplicationService

const party = ref<Party>()
const renderUpdate = ref(0)

const fetchParty = () => {
  const route = useRoute()
  party.value = partyHandler.getPartyById(route.params.id as string)
}

const partyState = (party: Party) => {
  if (party instanceof PartyMonstersToPlay) {
    return PartyStatus.MONSTERS_PLAYING
  }
  if (party instanceof PartyPlayersToPlay) {
    return PartyStatus.PLAYERS_TO_PLAY
  }
}

const playersPlayed = () => {
  const partyMonsterToPlay = partyHandler.toMonsterToPlay(party.value as PartyPlayersToPlay)
  party.value = partyHandler.monsterPlay(partyMonsterToPlay)
  renderUpdate.value++
}

void fetchParty()
</script>

<style scoped></style>
