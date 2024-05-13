import { defineStore } from 'pinia'

import { fileTable } from '@/js/globalState/fileTable.js'
import { dialog_fileImport, dialog_newPreset } from '@/js/globalState/dialog.js'
import { settings } from '@/js/globalState/settings.js'

export { EncodeParameter, EncodePreset } from '@/js/globalState/parameter/encodeParameter.js'

export const FileTable = fileTable
export const Dialog_fileImport = dialog_fileImport
export const Dialog_newPreset = dialog_newPreset
export const Settings = settings

export const CurrentTab = defineStore('currentTab', {
    state: () => ({ name: '' }),
})

