import { ref, watch } from 'vue';
import { defineStore } from 'pinia';
import type { Account } from "@/types/Account.ts";

const STORAGE_KEY = "accounts";

export const useAccountStore = defineStore('account', () => {
  const accounts = ref<Account[]>(JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]"));

  function addAccount(): void {
    if (accounts.value.some(acc => !validateAccount(acc).login || !validateAccount(acc).password || !validateAccount(acc).tags)) {
      return;
    }
    accounts.value.push({
      tags: [],
      recordType: "Local",
      login: "",
      password: "",
    });
  }

  function removeAccount(index: number) {
    accounts.value.splice(index, 1);
  }

  function updateTags(index: number, tagsString: string) {
    accounts.value[index].tags = tagsString.split(";").map(tag => ({ text: tag.trim() })).filter(tag => tag.text);
  }

  function validateAccount(account: Account) {
    return {
      login: account.login.trim().length > 0 && account.login.length <= 100,
      password: account.recordType === "Local" ? (account.password ? account.password.trim().length > 0 && account.password.length <= 100 : false) : true,
      tags: Boolean(account.tags.length && account.tags.every(tag => tag.text.length <= 50)),
    };
  }

  watch(accounts, (newAccounts) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newAccounts));
  }, { deep: true });

  return { accounts, addAccount, removeAccount, updateTags, validateAccount };
});
