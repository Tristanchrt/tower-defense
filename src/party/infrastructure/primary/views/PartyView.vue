<template>
    <div>
      <div class="party-to-create" v-if="party === null">
        <h1>Party to create</h1>
        <CreatePartyCard @create-party="createParty" />
      </div>
      <div class="board" v-if="party !== null" >
        <h1>Party created #{{ party.id }}</h1>
        <BoardCard :board="party.getBoard()" />
      </div>
    </div>
</template>

<script setup lang="ts">
import BoardCard from '../components/BoardCard.vue';
import { ref } from 'vue'
import { Board } from '@/party/domain/Board'
import { Player } from '@/party/domain/Player'
import type { Party } from '@/party/domain/Party'
import CreatePartyCard from '@/party/infrastructure/primary/components/CreatePartyCard.vue'
import { PartyToCreate } from '@/party/domain/PartyToCreate'
import { PartiesApplicationService } from '@/party/application/PartiesApplicationService'

const party = ref(null as Party | null)

const generateRandomString = (length: number): string => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  const charactersLength = characters.length;

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

const partyToCreate = new PartyToCreate(
  generateRandomString(12),
  new Board(6, 12),
  [new Player("Player 1"), new Player("Player 2")]
)

const createParty = () => {
  const partiesApplicationService = new PartiesApplicationService()
  party.value = partiesApplicationService.create(partyToCreate)
}

</script>
