import { defineStore } from 'pinia'

export const CurrentTab = defineStore('currentTab', {
    state: () => ({ name: "" }),
})