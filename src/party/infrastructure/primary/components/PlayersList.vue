<template>
  <div class="players">
    <div class="player" :key="player.getName()" v-for="player in players">
      <span class="player-name">
        {{ player.getName() }}
      </span>
      <span> - </span>
      <span class="player-turn">
        {{ isPlaying(player) }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">

import type { PropType } from 'vue'
import type { Player } from '@/party/domain/Player'

const props = defineProps({
  players: {
    type: Array as PropType<Player[]>,
    required: true
  },
  playerTurn: {
    type: Object as PropType<Player>,
    required: true
  }
})

const isPlaying = (player: Player) => {
  if (props.playerTurn.getName() === player.getName()) {
    return 'Y'
  }
  return "N"
}

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