<script setup lang="ts">

import {useAccountStore} from "@/stores/account.ts";
import IconTrash from "@/components/icons/IconTrash.vue";
import type {RecordType} from "@/types/Account.ts";

const accountStore =  useAccountStore()

const recordTypes: RecordType[] = ["Local", "LDAP"];
</script>

<template>
  <div>
    <div class="flex gap-5 labels">
      <span>Метки</span>
      <span>Тип записи</span>
      <span>Логин</span>
      <span>Пароль</span>
    </div>

    <div class="flex flex-col gap-2">
      <div
        v-for="(account, index) in accountStore.accounts"
        :key="index"
        class="flex gap-5 items-center"
      >
        <input
          v-model="account.tags"
          type="text"
          placeholder="Теги" />

        <select v-model="account.recordType">
          <option
            v-for="type in recordTypes"
            :key="type"
            :value="type">
            {{ type }}
          </option>
        </select>

        <input
          v-model="account.login"
          type="text"
          placeholder="Логин" />
        <input
          v-model="account.password"
          type="password"
          placeholder="Пароль" />

        <button
          @click="accountStore.removeAccount(index)"
          class="cursor-pointer hover:text-red-500 transition-all">
          <IconTrash />
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.labels span {
  width: 22%;
}

input, select{
  border: 1px solid gray;
  border-radius: 5px;
  padding: 2px 2px;
  width: 22%;
}
</style>
