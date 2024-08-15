<template>
  <div class="towers-list">
    <div class="tower-details" :key="tower.x + ',' + tower.y" v-for="tower in towers">
      <div class="tower-row">
        <span class="tower-positions">{{ tower.x + ',' + tower.y }}</span>
        <span
          class="tower-munitions"
          :class="{
            'has-munitions': tower.getMunitions() > 0,
            'has-no-munitions': tower.getMunitions() === 0
          }"
        >
          {{ tower.getMunitions() }}</span
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'
import type { Tower } from '@/party/domain/Tower'

defineProps({
  towers: {
    type: Array as PropType<Tower[]>,
    required: true
  }
})
</script>

<style scoped>
.towers-list {
  display: table;
  width: 100%;
  border-collapse: collapse;
}

.tower-details {
  display: table-row-group;
}

.tower-row {
  display: table-row;
}

.tower-positions,
.tower-munitions {
  display: table-cell;
  padding: 10px;
  border: 1px solid #ccc;
  text-align: center;
  vertical-align: middle;
}

.tower-positions {
  font-weight: bold;
}

.tower-munitions {
  font-size: 1.1em;
}

.has-no-munitions {
  background-color: red !important;
  color: white;
}

.has-munitions {
  background-color: #8bc34a !important;
  color: white;
}
</style>
