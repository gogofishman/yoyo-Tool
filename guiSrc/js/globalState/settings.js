import { defineStore } from 'pinia'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import en from 'element-plus/dist/locale/en.mjs'

//保存到localStorage中的设置
export const settings = defineStore('settings', {
    state: () => ({
        language: 'zh-cn'
    }),
    getters: {
        /**
         * 获取当前系统语言，以elementUi类型返回
         */
        getLanguage_elementUi: (state) => {
            switch (state.language) {
                case 'zh-cn':
                    return zhCn
                case 'en':
                    return en
                default:
                    return zhCn
            }
        }
    },
    actions: {
        setLanguage (language) {
            this.language = language
            localStorage.setItem('language', language)
        },
    },
})