<template>
  <div class="parties">
    <div class="parties-list">
      <h1>List of parties</h1>
      <PartyList v-if="hasParties" :parties="parties" @start-party="startParty($event)" />
      <span v-else>Empty list</span>
    </div>
    <div class="party-to-create">
      <h1>Party to create</h1>
      <CreatePartyCard @create-party="createParty" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, inject, ref } from 'vue'
import type { Party } from '@/party/domain/Party'
import CreatePartyCard from '@/party/infrastructure/primary/components/CreatePartyCard.vue'
import { PartyToCreate } from '@/party/domain/PartyToCreate'
import PartyList from '@/party/infrastructure/primary/components/PartiesList.vue'
import { PartiesApplicationService } from '@/party/application/PartiesApplicationService'
import type { PartyCreated } from '@/party/domain/PartyCreated'

const parties = ref<Party[]>([])
const partyHandler = inject('partyApplicationService') as PartiesApplicationService

const hasParties = computed(() => parties.value.length > 0)

const fetchParties = () => (parties.value = partyHandler.getParties())

const createParty = (party: PartyToCreate) => {
  const partyCreated = partyHandler.create(party)
  parties.value.push(partyCreated)
}

const startParty = (party: PartyCreated) => {
  const partyPlayersToPlay = partyHandler.toPlayersToPlay(party)
  parties.value = parties.value.filter((party: Party) => party.id !== partyPlayersToPlay.id)
  parties.value.push(partyPlayersToPlay)
}

fetchParties()
</script>

<style scoped>
.parties {
  display: flex;
  justify-content: space-around;
}
</style>
