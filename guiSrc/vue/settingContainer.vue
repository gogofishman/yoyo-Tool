<script setup>
import { Settings } from '@/js/globalState/globalState.js'
import ControlLine from '@/vue/control/controlLine.vue'
const settings = Settings()
</script>

<template>
    <div class="setting-container">
        <control-line :label="$i18n('language')" width="20rem">
            <el-select
                v-model="settings.language"
                placeholder="Select"
                size="small"
                style="width: var(--select-width)"
            >
                <el-option
                    v-for="item in settings.getLanguageList"
                    :key="item"
                    :label="item"
                    :value="item"
                />
            </el-select>
        </control-line>
    </div>
</template>

<style scoped>
.setting-container {
    --select-width : 150px;

    height: calc(100% - 3rem);
    display: flex;
    justify-content: center;
    padding-top: 2rem;
}
</style>