<script setup lang="ts">
import { useAccountStore } from "@/stores/account.ts";
import IconTrash from "@/components/icons/IconTrash.vue";
import type { RecordType } from "@/types/Account.ts";
import { ref } from "vue";

const accountStore = useAccountStore();
const recordTypes: RecordType[] = ["Local", "LDAP"];

const errors = ref<Record<string, boolean>[]>([]);

const validateField = (index: number) => {
  const account = accountStore.accounts[index];
  errors.value[index] = accountStore.validateAccount(account);
  console.log(errors.value)
};
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
        class="flex gap-5 items-center">
        <input
          :class="{ '!border-red-500': errors[index]?.tags === false }"
          :value="account.tags.map(tag => tag.text).join('; ')"
          @blur="(e) => {
            accountStore.updateTags(index, e.target.value);
            validateField(index);
          }"
          type="text"
          placeholder="Теги" />

        <select v-model="account.recordType" @change="validateField(index)">
          <option v-for="type in recordTypes" :key="type" :value="type">
            {{ type }}
          </option>
        </select>

        <input
          :class="{ '!border-red-500': errors[index]?.login === false }"
          v-model="account.login"
          @blur="validateField(index)"
          type="text"
          placeholder="Логин" />

        <input
          v-if="account.recordType === 'Local'"
          :class="{ '!border-red-500': errors[index]?.password === false }"
          v-model="account.password"
          @blur="validateField(index)"
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

input, select {
  border: 1px solid gray;
  border-radius: 5px;
  padding: 2px 2px;
  width: 22%;
}
</style>
