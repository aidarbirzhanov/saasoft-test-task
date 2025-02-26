<script setup lang="ts">

import AccountForm from "@/components/AccountForm.vue";
import {useAccountStore} from "@/stores/account.ts";

const accountStore = useAccountStore()

const onClick = () => {
  accountStore.addAccount()
}

</script>

<template>
  <div class="flex items-center justify-center h-screen">
    <div class="w-1/2">
      <div class="flex items-center gap-2">
        <p class="font-bold text-lg">
          Учетные записи
        </p>
        <button
          @click="onClick"
          class="button">
          +
        </button>
      </div>
      <AccountForm/>
    </div>
  </div>
</template>

<style scoped>

.button{
  border: 1px solid black;
  padding: 10px;
  cursor: pointer;
}

</style>
