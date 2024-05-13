import { defineStore } from 'pinia'

const data = {
    output_save_in_the_source_folder: true,
    output_overwrite_source_file: true,
    output_folder: '',
    output_suffix: '_encoded',
}

export const EncodeParameter = defineStore('encodeParameter', {
    state: () => (data),
    persist: true,
})

export const EncodePreset = defineStore('encodePreset', {
    state: () => ({
        currentPresetName: 'default',
        preset: {
            default: { ...data }
        },
        ty: 'preset',
    }),
    getters: {
        presetList: (state) => Object.keys(state.preset),
    },
    actions: {
        /**
         * 以当前的参数新建一个预设，重名则覆盖
         */
        addPreset (name) {
            const encodeParameter = EncodeParameter()
            this.preset[name] = { ...encodeParameter.$state }
            this.currentPresetName = name
        },
        /**
         * 选择一个预设到当前参数
         */
        selectPreset () {
            const encodeParameter = EncodeParameter()
            Object.entries(this.preset[this.currentPresetName]).forEach(([key, value]) => {
                encodeParameter[key] = value
            })
        },
        /**
         * 保存参数到当前预设
         */
        savePreset () {
            const encodeParameter = EncodeParameter()
            this.preset[this.currentPresetName] = { ...encodeParameter.$state }
            showElMessage.success(i18n('save_preset_tooltip'))
        },
        deletePreset () {
            const name = this.currentPresetName
            const index = this.presetList.indexOf(name)
            this.currentPresetName = this.presetList[index - 1]
            delete this.preset[name]
        }
    },
    persist: true,
})

