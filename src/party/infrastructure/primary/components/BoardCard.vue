<template>
  <div>
    <div class="board">
      <div class="row" :key="`row-${rowIndex}`" v-for="(row, rowIndex) in props.board.getMatrix()">
        <div class="height" :key="`cell-${cell.id}`" v-for="cell in row">
          <span class="cell tooltip">
            {{ cellType(cell) }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Board } from '@/party/domain/Board'
import { Tower } from '@/party/domain/Tower'
import type { Cell } from '@/party/domain/Cell'
import type { PropType } from 'vue'
import { Monster } from '@/party/domain/Monster'

const props = defineProps({
  board: {
    type: Object as PropType<Board>,
    required: true
  }
})

const cellType = (cell: Cell) => {
  if (cell instanceof Tower) {
    return 'T'
  }
  if (cell instanceof Monster) {
    return "M"
  }
  return '.'
}
</script>

<style scoped>
.row {
  display: flex;
  margin-top: 1em;
}
.height {
  margin: 8px;
}
</style>
