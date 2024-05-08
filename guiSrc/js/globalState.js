import { defineStore } from 'pinia'

export const CurrentTab = defineStore('currentTab', {
    state: () => ({ name: "" }),
})

//保存到localStorage中的设置
export const Settings = defineStore('Settings', {
    state: () => ({
        language: "zh-cn"
    }),
    actions: {
        setLanguage(language) {
            this.language = language
            config.set('language', language)
        },
    },
})