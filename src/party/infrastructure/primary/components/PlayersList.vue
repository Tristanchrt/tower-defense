<template>
  <div class="players">
    <span class="player" :key="player.getName()" v-for="player in players">{{ player.getName() }}</span>
  </div>
</template>

<script setup lang="ts">

import type { PropType } from 'vue'
import type { Player } from '@/party/domain/Player'

defineProps({
  players: {
    type: Array as PropType<Player[]>,
    required: true
  }
})

</script>

<style scoped>
.players {
  margin-left: 3em;
  display: flex;
  flex-direction: column;
}
.player {
  margin: 10px;
  padding: 8px;
}
.player:hover {
  background-color: grey;
  margin: 10px;
}
</style>