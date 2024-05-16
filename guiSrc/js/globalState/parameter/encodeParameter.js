import { defineStore } from 'pinia'
import nvenccArgs from '@/js/createBashCode/nvencc.js'

const parameter = {
    _more: false,
    _open: ['output', 'video_encode'],
    output_save_in_the_source_folder: true,
    output_overwrite_source_file: false,
    output_folder: '',
    output_suffix: '_encoded',
    core: 'GPU',
    file_format: 'mp4',
    codec: 'hevc',
    quality: 21,
    depth: 10,
    lookahead: 12,
    aq: 0,
    gop: -1,
    color_space: 'yuv420',
    lossless: false,
    vfr: false,
    audio_codec: 'aac',
    audio_bitrate: 320,
    audio_samplerate: 48000,
    audio_channel: 'copy',
    change_resolution: false,
    resolution: '1920x1080',
    scale_mode: 'spline36',
    sar: '1:1',
    chapter_copy: true,
    key_on_chapter: true,
    encode_sub: false,
    encode_sub_mode: 'inTheSameDirectory',
    bash: [],
}

const core = ['CPU', 'GPU']
const fileFormat = {
    mkv: ['h264', 'hevc', 'av1'],
    mp4: ['h264', 'hevc', 'av1'],
    mov: ['h264', 'hevc', 'av1'],
    webm: ['av1'],
}
const depth = [8, 10]
const colorSpace = ['yuv420', 'yuv444']

const audioCodec = ['aac', 'mp3', 'copy']
const audioChannel = [2, 5.1, 7.1, 'copy']
const scaleMode = ['bicubic', 'spline36', 'lanczos']
const encodeSubMode = ['inTheSameDirectory', 'inVideoFile']

export const EncodeParameter = defineStore('encodeParameter', {
    state: () => (parameter),
    getters: {
        getBashText: (state) => {
            let text = ''
            for (const item of state.bash) {
                if (item.toString().startsWith('-')) {
                    text += '\n' + item
                } else {
                    text += ' ' + item
                }
            }
            return text.replace(/^\s+|\s+$/g, '');
        },
        getArgs: (state) => nvenccArgs(state),
        coreList: () => core,
        fileFormatList: () => Object.keys(fileFormat),
        codecList: (state) => {
            if (state.core === 'CPU') {
                return fileFormat[state.file_format].concat(['copy', 'none'])
            } else {
                return fileFormat[state.file_format]
            }
        },
        depthList: () => depth,
        colorSpaceList: () => colorSpace,
        audioCodecList: () => audioCodec,
        audioChannelList: () => audioChannel,
        scaleModeList: () => scaleMode,
        encodeSubModeList: () => encodeSubMode,
    },
    actions: {
        onchangeFileFormat () {
            if (!this.codecList.includes(this.codec))
                this.codec = this.codecList[0]
        },
        audioBitrateFunc (queryString, cb) {
            const results = [
                { value: 96 },
                { value: 128 },
                { value: 192 },
                { value: 256 },
                { value: 320 },
                { value: 512 },
            ]
            cb(results)
        },
        onchangeAudioBitrate () { if (isNaN(Number(this.audio_bitrate)) || Number(this.audio_bitrate) <= 0) { this.audio_bitrate = 320 } },
        audioSamplerateFunc (queryString, cb) {
            const results = [
                { value: 24000 },
                { value: 32000 },
                { value: 44100 },
                { value: 48000 },
                { value: 64000 },
                { value: 96100 },
            ]
            cb(results)
        },
        onchangeAudioSamplerate () {
            if (isNaN(Number(this.audio_samplerate)) || Number(this.audio_samplerate) <= 0) { this.audio_samplerate = 48000 }
        },
        resolutionFunc (queryString, cb) {
            cb([
                { value: '720x480' },
                { value: '1280x720' },
                { value: '1920x1080' },
                { value: '2560x1440' },
                { value: '3840x2160' },
                { value: '7680×4320' },
            ])
        },
        onchangeResolution () { if (!/^\d{3,4}x\d{3,4}$/.test(this.resolution)) { this.resolution = '1920x1080' } },
        sarFunc (queryString, cb) {
            cb([
                { value: '1:1' },
                { value: '8:9' },
                { value: '32:27' },
            ])
        },
        onchangeSar () { if (!/^\d+:\d+$/.test(this.sar)) { this.sar = '1:1' } },
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

