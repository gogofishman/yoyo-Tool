<script setup>
import { Settings } from '@/js/globalState/globalState.js'
const settings = Settings()
settings.$subscribe((mutation, state)=>{
    settings.save()
})
</script>

<template>
    <div class="setting-container">
        <div class="setting-line">
            <span>语言</span>
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
        </div>
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

.setting-line{
    width: 20rem;
    height: 2em;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>