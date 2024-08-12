<template>
  <div class="add-tower-card">
    <input class="tower-x" type="number" v-model="towerX" placeholder="X Coordinate" />
    <input class="tower-y" type="number" v-model="towerY" placeholder="Y Coordinate" />
    <button @click="handleTower">Add tower</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits(['add-tower'])

const towerX = ref<number | null>(null)
const towerY = ref<number | null>(null)

const handleTower = () => {
  if (towerX.value !== null && towerY.value !== null) {
    emit('add-tower', { x: towerX.value, y: towerY.value })
  }
}
</script>

<style scoped>
.add-tower-card {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

input {
  padding: 8px;
  font-size: 16px;
}

button {
  padding: 10px;
  font-size: 16px;
  cursor: pointer;
}
</style>
