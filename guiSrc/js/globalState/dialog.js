import { defineStore } from 'pinia'
import { EncodeParameter } from '@/js/globalState/globalState.js'

export const dialog_fileImport = defineStore('frontWindow_fileImport', {
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

export const dialog_newPreset = defineStore('frontWindow_newPreset', {
    state: () => ({
        show: false,
        presetName: '',
        defaultName: '',
    }),
    actions: {
        open () {
            const encodeParameter = EncodeParameter()
            let count = 1
            let defaultName = i18n('preset') + ' ' + count
            let presetList = encodeParameter.presetList

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
            const encodeParameter = EncodeParameter()
            encodeParameter.addPreset(this.presetName)
            this.close()
        }
    }
})