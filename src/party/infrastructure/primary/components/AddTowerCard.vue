<template>
  <div class="add-tower-card">
    <button @click="handleTower">Add tower</button>
  </div>
</template>

<script setup lang="ts">

const emit = defineEmits(['add-tower'])

const handleTower = () => {
  emit('add-tower')
}

</script>


<style scoped>

</style>