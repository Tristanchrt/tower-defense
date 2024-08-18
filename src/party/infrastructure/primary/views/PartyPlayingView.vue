<template>
  <div class="party-playing-view">
    <PartyMonstersPlaying
      @monsters-played="monstersPlayed"
      :party="party as PartyMonstersToPlay"
      v-if="partyState(party as Party) === PartyStatus.MONSTERS_PLAYING"
    />
    <PartyPlayersToPlayView
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

const route = useRoute()

const fetchParty = () => {
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
  party.value = partyHandler.toMonsterToPlay(party.value as PartyPlayersToPlay)
}

const monstersPlayed = (partyMonsterPlayed: Party) => {
  party.value = partyMonsterPlayed
}

void fetchParty()
</script>

<style scoped></style>
