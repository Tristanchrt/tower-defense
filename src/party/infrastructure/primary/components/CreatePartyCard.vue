<template>
  <div>
      <button @click="createParty">Create party</button>
  </div>
</template>

<script setup lang="ts">

const emit = defineEmits(['create-party'])

const createParty = () => {
  emit('create-party')
}

</script>