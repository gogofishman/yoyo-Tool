import { defineStore } from 'pinia'

export const frontWindow_fileImport = defineStore('frontWindow_fileImport', {
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