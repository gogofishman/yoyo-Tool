<script setup>
import { Dialog_fileImport, Dialog_newPreset } from '@/js/globalState/globalState.js'

const dialogFileImport = Dialog_fileImport()
const dialogNewPreset = Dialog_newPreset()
</script>

<template>
    <!--    文件导入对话框-->
    <el-dialog v-model="dialogFileImport.show"
               width="500"
               :show-close="false"
               :close-on-click-modal="false"
               :close-on-press-escape="false"
               style="border-radius: 6px;
                height: 120px;
                display: flex;
                flex-direction: column;
                justify-content: center;
                --el-dialog-padding-primary: 0;
                padding: 0 3rem;
            ">
        <div style="display: flex;justify-content: space-between;margin-bottom: 1em;padding-right: .25em">
            <span>{{ $i18n('import_file_titles') }}</span>
            <span>{{ dialogFileImport.current }}/{{ dialogFileImport.total }}</span>
        </div>
        <el-progress class="front-window-progress"
                     :percentage="dialogFileImport.percentage"
                     :stroke-width="10">
            <span></span>
        </el-progress>
    </el-dialog>

    <!--        新建预设对话框-->
    <el-dialog v-model="dialogNewPreset.show"
               :title="$i18n('new_preset')"
               width="500"
               :show-close="false"
               :close-on-click-modal="false"
               :close-on-press-escape="false"
               style="border-radius: 6px;">
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="dialogNewPreset.close()">{{ $i18n('cancel',true) }}</el-button>
                <el-button @click="dialogNewPreset.save()" type="primary" plain>{{ $i18n('save',true) }}</el-button>
            </div>
        </template>
        <el-input v-model="dialogNewPreset.presetName" :placeholder="dialogNewPreset.defaultName"></el-input>
    </el-dialog>
</template>

<style scoped>
div:deep(.el-progress-bar__inner) {
    transition: width .2s ease;
}

div:deep(.el-progress__text) {
    min-width: 0;
}

span {
    font-size: var(--font-size);
}
</style>