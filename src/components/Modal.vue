<template>
  <div id="modal" ref="modal" v-if="showModal">
    <span class="modal--name">{{ peopleName }}</span>
    <p class="modal--dialogue">{{ peopleDialogue }}</p>
  </div>
</template>
<script setup>
defineProps({
  peopleName: String,
  peopleDialogue: String,
  showModal: Boolean
})
</script>
<style lang="scss" scoped>
#modal {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: rgba(0, 0, 0, 1);
  padding: 30px;
  color: white;
  // max-width: 320px;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  &--name {
    font-size: 1rem;
    font-weight: bold;
  }

  &--dialogue {
    font-size: 0.8rem;
  }
}
</style>