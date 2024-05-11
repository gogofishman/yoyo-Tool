import { defineStore } from 'pinia'

import { fileTable } from '@/js/globalState/fileTable.js'
import { frontWindow_fileImport } from '@/js/globalState/frontWindow_fileImport.js'
import { settings } from '@/js/globalState/settings.js'

export const FileTable = fileTable
export const FrontWindow_fileImport = frontWindow_fileImport
export const Settings = settings

export const CurrentTab = defineStore('currentTab', {
    state: () => ({ name: '' }),
})

