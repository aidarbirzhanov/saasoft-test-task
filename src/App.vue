<script setup lang="ts">

import AccountForm from "@/components/AccountForm.vue";
import {useAccountStore} from "@/stores/account.ts";
import IconQuestion from "@/components/icons/IconQuestion.vue";
import {computed} from "vue";

const accountStore = useAccountStore()

const isAnyInvalid = computed(() => {
  return accountStore.accounts.some((_, index) => {
    const validation = accountStore.validateAccount(accountStore.accounts[index]);
    return !validation.login || !validation.password || !validation.tags;
  });
});
</script>

<template>
  <div class="flex items-center justify-center h-screen">
    <div class="w-1/2">
      <div class="flex items-center gap-2">
        <p class="font-bold text-lg">
          Учетные записи
        </p>
        <button
          :disabled="isAnyInvalid"
          @click="accountStore.addAccount()"
          class="button">
          +
        </button>
      </div>
      <div class="flex bg-blue-100 w-full hint">
        <IconQuestion class="border rounded-full"/>
        <span>
          Для указания нескольких меток для одной пары логин/пароль используйте разделитель ;
        </span>
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

.hint{
  padding: 5px;
  margin: 10px 0 10px;
}

</style>
