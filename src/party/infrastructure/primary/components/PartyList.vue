<template>
  <div class="parties-list">
    <div class="party" v-for="party in sortedParties" :key="party.id" @click="goToParty(party)">
      <span class="party-id">{{ party.id }}</span>
      <span class="party-status">{{ partyStatus(party) }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Party } from '@/party/domain/Party'
import { computed, type PropType } from 'vue'
import { PartyCreated } from '@/party/domain/PartyCreated'
import { PartyStatus } from '@/party/domain/PartyStatus'
import { PartyPlayersToPlay } from '@/party/domain/PartyPlayersToPlay'
import { useRouter } from 'vue-router'

const props = defineProps({
  parties: {
    type: Array as PropType<Party[]>,
    required: true
  }
})

const router = useRouter()

const sortedParties = computed(() => {
  return [...props.parties].sort((a, b) => parseInt(a.id) - parseInt(b.id))
})

const emit = defineEmits(['start-party'])

const partyStatus = (party: Party) => {
  if (party instanceof PartyCreated) return PartyStatus.CREATED
  if (party instanceof PartyPlayersToPlay) return PartyStatus.PLAYERS_TO_PLAY
}

const goToParty = (party: Party) => {
  if (party instanceof PartyCreated) {
    if (confirm('Do you want to start the party')) {
      emit('start-party', party as PartyCreated)
    }
  }else if(party instanceof PartyPlayersToPlay) {
    router.push({ name: 'party', params: { id: party.id } })
  }
}
</script>

<style scoped>
.party {
  display: flex;
  width: 16em;
  justify-content: space-between;
  cursor: pointer;
}
.party:hover {
  background-color: #7f7f7f;
}
</style>
