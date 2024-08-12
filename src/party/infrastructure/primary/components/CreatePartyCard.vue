<template>
  <div>
    <button @click="createParty">Create party</button>
  </div>
</template>

<script setup lang="ts">
import { PartyToCreate } from '@/party/domain/PartyToCreate'
import { Board } from '@/party/domain/Board'
import { Player } from '@/party/domain/Player'

const emit = defineEmits(['create-party'])

const generateTimestampBasedString = () =>
  (Math.floor(Math.random() * (10000 - 10)) + 10000).toString()

const partyToCreate = () =>
  new PartyToCreate(generateTimestampBasedString(), new Board(6, 12), [
    new Player('Player 1'),
    new Player('Player 2')
  ])

const createParty = () => {
  emit('create-party', partyToCreate())
}
</script>
