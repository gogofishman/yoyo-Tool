import { defineStore } from 'pinia'

export const encodeParameter = defineStore('encodeParameter', {
    state: () => ({
        currentPreset:{
            output_save_in_the_source_folder: true,
            output_overwrite_source_file: true,
            output_folder: '',
            output_suffix: '_encoded',
        },
        currentPresetName:'default',
        preset:{
            default:{}
        }
    }),
    getters: {
        presetList: (state) => {
            if (Object.keys(state.preset.default).length === 0) {
                Object.entries(state.currentPreset).forEach(([key, value]) => {
                    state.preset.default[key] = value
                })
            }
            return Object.keys(state.preset)
        }
    },
    actions: {
        /**
         * 以当前的参数新建一个预设，重名则覆盖
         */
        addPreset (name) {
            this.preset[name] = this.currentPreset
            this.currentPresetName = name
            console.log(this)
        },
        /**
         * 选择一个预设到当前参数
         */
        selectPreset (name) {
            this.currentPresetName = name
            Object.entries(this.preset[name]).forEach(([key, value]) => {
                this.currentPreset[key] = value
            })
        },
        /**
         * 保存参数到当前预设
         */
        savePreset () {
            this.preset[this.currentPresetName] = this.currentPreset
            showElMessage.success(i18n('save_preset_tooltip'))
        },
        deletePreset () {
            const name = this.currentPresetName
            delete this.preset[name]
            if (this.currentPresetName === name) {
                this.currentPresetName = 'default'
            }
        }
    },
    persist:true,
    // persist: {
    //     paths: ['preset','currentPresetName'],
    // }
})