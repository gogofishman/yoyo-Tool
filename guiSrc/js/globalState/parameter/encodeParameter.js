import { defineStore } from 'pinia'

const parameter = {
    output_save_in_the_source_folder: true,
    output_overwrite_source_file: false,
    output_folder: '',
    output_suffix: '_encoded',
    file_format: 'mp4',
    codec: 'h264 (nvencc)',
    codec_mode: 'cqp'
}

const fileFormat = {
    mkv: ['h264 (nvencc)', 'hevc (nvencc)', 'av1 (nvencc)', 'raw'],
    mp4: ['h264 (nvencc)', 'hevc (nvencc)', 'av1 (nvencc)', 'raw'],
    mov: ['h264 (nvencc)', 'hevc (nvencc)', 'av1 (nvencc)', 'raw'],
    webm: ['av1 (nvencc)'],
}

const codecMode = ['CFR','VBR']

export const EncodeParameter = defineStore('encodeParameter', {
    state: () => (parameter),
    getters: {
        fileFormatList: () => Object.keys(fileFormat),
        codecList: (state) => fileFormat[state.file_format],
        codecModeList: () => codecMode
    },
    actions: {
        onchangeFileFormat () {
            if (!this.codecList.includes(this.codec))
                this.codec = this.codecList[0]
        }
    },
    persist: true,
})

export const EncodePreset = defineStore('encodePreset', {
    state: () => ({
        currentPresetName: 'default',
        preset: {
            default: { ...parameter }
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

