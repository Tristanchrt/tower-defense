<template>
  <div class="parties-list">
    <div class="party" v-for="party in parties" :key="party.id">
      <span class="party-id">{{ party.id }}</span>
      <span class="party-status">{{ partyStatus(party) }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Party } from '@/party/domain/Party'
import type { PropType } from 'vue'
import { PartyCreated } from '@/party/domain/PartyCreated'

defineProps({
  parties: {
    type: Array as PropType<Party[]>,
    required: true
  }
})

const partyStatus = (party: Party) => {
  if(party instanceof PartyCreated) {
    return "CREATED"
  }
}

</script>

<style scoped>

.party {
  display: flex;
  justify-content: space-between;
}

</style>
