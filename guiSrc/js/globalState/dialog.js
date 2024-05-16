import { defineStore } from 'pinia'
import { EncodePreset } from '@/js/globalState/globalState.js'

export const Dialog_fileImport = defineStore('frontWindow_fileImport', {
    state: () => ({
        show: false,
        current: 0,
        total: 1
    }),
    getters: {
        percentage: (state) => {
            return state.total === 0 ? 0 : state.current / state.total * 100
        },
    },
    actions: {
        /**
         * 设置文件导入的提示窗口
         * @param current 已导入文件
         * @param total 总文件
         */
        set_file_import_window (current, total) {
            this.show = current !== total
            this.current = current
            this.total = total
        }
    }
})

export const Dialog_newPreset = defineStore('frontWindow_newPreset', {
    state: () => ({
        show: false,
        presetName: '',
        defaultName: '',
    }),
    actions: {
        open () {
            const encodePreset = EncodePreset()
            let count = 1
            let defaultName = i18n('preset') + ' ' + count
            let presetList = encodePreset.presetList

            while (presetList.includes(defaultName)) {
                count++
                defaultName = i18n('preset') + ' ' + count
            }

            this.presetName = ''
            this.defaultName = defaultName
            this.show = true
        },
        close () {
            this.show = false
        },
        save () {
            if (this.presetName === '') {
                this.presetName = this.defaultName
            }
            const encodePreset = EncodePreset()
            encodePreset.addPreset(this.presetName)
            this.close()
        }
    }
})

let bashFunc = null
export const Dialog_bashEditor = defineStore('dialog_bashEditor', {
    state: () => ({
        show: false,
        text: '',
    }),
    actions: {
        open (text, func) {
            this.text = text
            bashFunc = func
            this.show = true
        },
        close () {
            this.show = false
        },
        save () {
            this.close()
            bashFunc(this.text)
        }
    }
})