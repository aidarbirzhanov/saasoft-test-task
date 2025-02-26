import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Account } from "@/types/Account.ts";

export const useAccountStore = defineStore('account', () => {

  const accounts = ref<Account[]>([])

  function addAccount():void {
    accounts.value.push({
      tags: [],
      recordType: "Local",
      login: "",
      password: "",
    })
  }

  function removeAccount(index: number) {
    accounts.value = accounts.value.filter((_, i) => i !== index);
  }

  return { accounts, addAccount, removeAccount }
})
