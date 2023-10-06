<script setup lang="ts">
import { ref } from 'vue';
defineProps<{
  msg: string,
  btnState: boolean,
  closeBtn: () => {

  }
}>()

</script>
<template>
    <div  v-if="btnState" class="toast.show" role="alert" aria-live="assertive" aria-atomic="true">
        <div class="toast-header">
        <strong class="me-auto">xin-ai</strong>
        <button type="button" @click="closeBtn"  class="btn-close closeBtn" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
        <div class="toast-body">
        {{ msg }}
        </div>
  </div>
</template>

<style scoped>
 .closeBtn {
    cursor: pointer;
 }
</style>

