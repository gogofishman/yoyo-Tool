import { defineStore } from 'pinia'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import en from 'element-plus/dist/locale/en.mjs'

/**
 * 获取文件大小的格式化字符串
 * @protected
 * @param {number} size 文件大小
 * @returns {string}
 */
function getSize (size) {
    if (!isNaN(size)) {
        //kb
        size = size / 1024
        if (size < 1024) {
            return size.toFixed(0) + ' KB'
        }

        //mb
        size = size / 1024
        if (size < 1024) {
            return size.toFixed(0) + ' MB'
        }

        //gb
        size = size / 1024
        return size.toFixed(2) + ' GB'
    }
    return '0 KB'
}

export const CurrentTab = defineStore('currentTab', {
    state: () => ({ name: '' }),
})

export const FileTable = defineStore('fileTable', {
    state: () => ({
        encodeTable: [],
    }),
    actions: {
        /**
         * 添加文件到encodeTable
         */
        encodeTable_add (file) {
            let extension = file.fileExtension
            let name = file.basename

            let frameRate = file.track[0]['FrameRate']
            frameRate = Number(frameRate)
            frameRate = Math.floor(frameRate * 10) / 10

            let videoTrack = file.track[1]
            let videoFormat
            let widthHeight
            if (videoTrack) {
                videoFormat = videoTrack['Format']
                widthHeight = `${videoTrack['Width']}x${videoTrack['Height']}`
            } else {
                videoFormat = ''
                widthHeight = ''
            }

            let subtitle = false
            let chapter = false

            let tracks = file.track
            if (tracks) {
                for (const track of tracks) {
                    if (track['@type'] === 'Text') {
                        subtitle = true
                    }
                    if (track['@type'] === 'Menu') {
                        chapter = true
                    }
                }
            }

            this.encodeTable.push({
                path: file.path,
                name: name,
                extension: extension,
                format: videoFormat,
                widthHeight: widthHeight,
                frameRate: frameRate,
                size: getSize(file.size),
                subtitle: subtitle,
                chapter: chapter
            })
        },
        encodeTable_clear () {
            this.encodeTable = []
        }
    },
})

export const FrontWindow = defineStore('frontWindow', {
    state: () => ({
        file_import_window_show: false,
        file_import_window_current: 0,
        file_import_window_total: 1
    }),
    getters: {
        file_import_window_percentage: (state) => {
            return state.file_import_window_total === 0 ? 0 : state.file_import_window_current / state.file_import_window_total * 100
        },
    },
    actions: {
        /**
         * 设置文件导入的提示窗口
         * @param current 已导入文件
         * @param total 总文件
         */
        set_file_import_window (current, total) {
            this.file_import_window_show = current !== total
            this.file_import_window_current = current
            this.file_import_window_total = total
        }
    }
})

//保存到localStorage中的设置
export const Settings = defineStore('Settings', {
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