<script setup>
import { Settings, FileTable, FrontWindow } from '@/js/globalState.js'
import { ElMessage } from 'element-plus'

const settings = Settings()
const fileTable = FileTable()
const frontWindow = FrontWindow()

const fileExtension = {
    mp4: '#7862DA',
    mkv: '#3BBFCD',
    mov: '#C562D9',
    avi: '#D97362',
    vob: '#B2AAD9',
    flv: '#B4D962',
    ts: '#D9CB62',
    webm: '#62D9A5',
    wmv: '#628BD9'
}

//文件选择对话框按钮
function selectFile () {
    let options = {
        properties: ['openFile', 'multiSelections', 'dontAddToRecent'],
        filters: [
            { name: 'Video Files', extensions: Object.keys(fileExtension) }
        ]
    }
    let handle = wsClient.invoke('showOpenDialog', options)
    handle.onRespond((message) => {
        addFiles(message.data)
    })
}

/**
 * @param {string[]} files
 */
async function addFiles (files) {
    //忽略已在列表中的文件
    files = files.filter(file => fileTable.encodeTable.findIndex(e => e.path === file) === -1)
    if (files.length === 0) {
        console.log('文件重复导入')
        ElMessage({
            message: () => {return i18n('import_file_repeat')},
            type: 'warning',
            plain: true,
            duration: 2000,
        })
        return
    }
    let fileList = await getInfo(files)
    fileList.forEach((file) => {
        fileTable.encodeTable_add(file)
    })
}

function getInfo (files) {
    return new Promise((resolve, reject) => {
        let data = files.map(file => ({
            path: file,
            type: 'video',
        }))

        let handle = wsClient.invoke('getFileInfo', data)
        let count = 0
        let fileList = []

        handle.onRespond((message) => {
            count++
            frontWindow.set_file_import_window(count, files.length)
            fileList.push(message.data)

            if (count === files.length) {
                resolve(fileList)
            }
        })
    })
}

</script>

<template>
    <div class="table-container">
        <el-config-provider :locale="settings.getLanguage_elementUi">

            <div class="table-container-top">
                <el-button @click="fileTable.encodeTable_clear()" type="primary" round>{{ $i18n('clear') }}</el-button>
                <el-button @click="selectFile()" type="primary" round>{{ $i18n('add') }}</el-button>
            </div>

            <el-table class="video-table"
                      :data="fileTable.encodeTable"
                      :table-layout="'auto'"
                      height="calc(100vh - 7rem)"
            >
                <el-table-column type="selection"/>
                <el-table-column prop="name">
                    <template #header>{{ $i18n('name') }}</template>
                    <template #default="scope">
                        <div style="display: flex; align-items: center;line-height: 1.35em;">

                            <!--格式图标-->
                            <el-avatar class="item-icon" :style="'background-color:'+fileExtension[scope.row.extension]"
                            > {{ scope.row.extension }}
                            </el-avatar>

                            <div style="user-select: text;cursor: default">
                                <span class="item-name">{{ scope.row.name }}</span>
                                <div class="item-info">
                                    <span style="display: block;width: 3.5em">{{ scope.row.format }}</span>
                                    <span style="display: block;width: 6.5em">{{ scope.row.widthHeight }}</span>
                                    <span style="display: block">{{ scope.row.frameRate }}</span>
                                </div>
                            </div>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="size">
                    <template #header>{{ $i18n('size') }}</template>
                </el-table-column>
                <el-table-column prop="subtitle">
                    <template #header>{{ $i18n('subtitle') }}</template>
                </el-table-column>
                <el-table-column prop="chapter">
                    <template #header>{{ $i18n('chapter') }}</template>
                </el-table-column>
                <el-table-column prop="state">
                    <template #header>{{ $i18n('state') }}</template>
                </el-table-column>
            </el-table>
        </el-config-provider>
    </div>
</template>

<style scoped>
.el-table {
    --el-table-header-bg-color: var(--color-secondary);
    --el-table-header-text-color: var(--color-text-secondary);
    --el-table-text-color: var(--color-text-secondary-light);
    --el-table-tr-bg-color: var(--color-primary);
    --el-table-border-color: var(--color-secondary);
}

.table-container {
    width: calc(100% - 20rem);
    border-right: 1px solid var(--el-border-color);

    & .table-container-top {
        height: 4rem;
        padding: 0 2rem;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        background-color: var(--color-secondary-light);

        & button {
            width: 5em;
        }
    }

    & .video-table {
        background-color: var(--color-primary);

        & :deep(.cell) {
            white-space: nowrap;
        }

        & .item-icon {
            width: 2.5em;
            height: 2.5em;
            margin: .5em .75em .5em 0;
        }

        & .item-name {
            color: var(--color-text-secondary);
            font-weight: bold;
        }

        & .item-info {
            display: flex;
            font-size: 11px;
            color: #A8ABB2;
            line-height: 1em;
            margin-top: .5em
        }

        & :deep(.el-checkbox) {
            transform: translateX(.8em)
        }

        & :deep(.el-checkbox__input.is-checked) .el-checkbox__inner,& :deep(.el-checkbox__input.is-indeterminate) .el-checkbox__inner{
            background-color: var(--el-color-primary-light-5);
            border-color: var(--el-color-primary-light-5);
        }
    }
}
</style>