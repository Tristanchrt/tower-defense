<template>
  <div class="parties">
    <div class="parties-list">
      <h1>List of parties</h1>
      <PartyList
        v-if="parties && parties.length > 0"
        :parties="parties"
        @start-party="startParty($event)"
      />
      <span v-else>Empty list</span>
    </div>
    <div class="party-to-create">
      <h1>Party to create</h1>
      <CreatePartyCard @create-party="createParty" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { inject, onMounted, ref } from 'vue'
import { Board } from '@/party/domain/Board'
import { Player } from '@/party/domain/Player'
import type { Party } from '@/party/domain/Party'
import CreatePartyCard from '@/party/infrastructure/primary/components/CreatePartyCard.vue'
import { PartyToCreate } from '@/party/domain/PartyToCreate'
import PartyList from '@/party/infrastructure/primary/components/PartyList.vue'
import { PartiesApplicationService } from '@/party/application/PartiesApplicationService'
import type { PartyCreated } from '@/party/domain/PartyCreated'

const parties = ref<Party[]>([])
const partyHandler = inject('partyApplicationService') as PartiesApplicationService

onMounted(() => {
  parties.value = partyHandler.getParties()
})

const generateTimestampBasedString = (): string =>
  (Math.floor(Math.random() * (10000 - 10)) + 10000).toString()

const partyToCreate = () =>
  new PartyToCreate(generateTimestampBasedString(), new Board(6, 12), [
    new Player('Player 1'),
    new Player('Player 2')
  ])

const createParty = () => {
  const partyCreated = partyHandler.create(partyToCreate())
  parties.value.push(partyCreated)
}

const startParty = (party: PartyCreated) => {
  const partyPlayersToPlay = partyHandler.withPlayersToPlay(party)
  parties.value = parties.value.filter((party: Party) => party.id !== partyPlayersToPlay.id)
  parties.value.push(partyPlayersToPlay)
}
</script>

<style scoped>
.parties {
  display: flex;
  justify-content: space-around;
}
</style>
