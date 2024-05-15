import { defineStore } from 'pinia'

import { fileTable } from '@/js/globalState/fileTable.js'
import { settings } from '@/js/globalState/settings.js'

export { Dialog_fileImport, Dialog_newPreset, Dialog_bashEditor } from '@/js/globalState/dialog.js'
export { EncodeParameter, EncodePreset } from '@/js/globalState/parameter/encodeParameter.js'

export const FileTable = fileTable
export const Settings = settings

export const CurrentTab = defineStore('currentTab', {
    state: () => ({ name: '' }),
})

