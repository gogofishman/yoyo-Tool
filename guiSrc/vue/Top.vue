<script setup>
import { CurrentTab } from '@/js/globalState/globalState.js'

const currentTab = CurrentTab()
</script>

<template>
    <div class="top-container">
        <span class="top-title">{{ $i18n(currentTab.name) }}</span>
    </div>
</template>

<style scoped>
.top-container {
    display: flex;
    width: 100%;
    height: 3rem;
    border-bottom: 1px solid var(--el-border-color);
    -webkit-app-region: drag;

    & .top-title {
        font-size: 16px;
        margin-left: 2rem;
        margin-top: 1.4rem;
        font-weight: 700;
        letter-spacing: .1em;
    }
}
</style>