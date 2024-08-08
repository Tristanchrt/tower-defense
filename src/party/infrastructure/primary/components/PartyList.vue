<template>
  <div class="parties-list">
    <div class="party" v-for="party in parties" :key="party.id" @click="goToParty(party.id)">
      <span class="party-id">{{ party.id }}</span>
      <span class="party-status">{{ partyStatus(party) }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Party } from '@/party/domain/Party'
import type { PropType } from 'vue'
import { PartyCreated } from '@/party/domain/PartyCreated'
import { PartyStatus } from '@/party/domain/PartyStatus'

defineProps({
  parties: {
    type: Array as PropType<Party[]>,
    required: true
  }
})

const partyStatus = (party: Party) => {
  if (party instanceof PartyCreated) return PartyStatus.CREATED
}

const goToParty = (party: string) => {
  console.log(party)
}
</script>

<style scoped>
.party {
  display: flex;
  justify-content: space-between;
  cursor: pointer;
}
.party:hover {
  background-color: #7f7f7f;
}
</style>
