<script setup>
import { Close, FullScreen, Minus } from '@element-plus/icons-vue'

const close = () => {
    wsClient.send('appControl', 'close')
}

const min = () => {
    wsClient.send('appControl', 'min')
}

const max = () => {
    wsClient.send('appControl', 'max')
}
</script>

<template>
    <div class="app-button-container">
        <div class="app-button" id="app-min-button"
             @click="min()">
            <el-icon size="100%">
                <Minus/>
            </el-icon>
        </div>
        <div class="app-button" id="app-max-button"
             @click="max()">
            <el-icon size="100%">
                <FullScreen/>
            </el-icon>
        </div>
        <div class="app-button" id="app-close-button"
             @click="close()">
            <el-icon size="100%">
                <Close/>
            </el-icon>
        </div>
    </div>
</template>

<style scoped>
.app-button-container {
    position: absolute;
    top: 0;
    right: 0;
    height: 30px;
    display: flex;
}

.app-button {
    height: 100%;
    width: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    fill: var(--el-color-primary-light-7);
    transition: background-color 0.2s ease;

    &:hover {
        background-color: rgb(212, 212, 212);
    }

    &:active {
        background-color: rgb(182, 182, 182);
    }
}

#app-close-button {
    border-top-right-radius: 10px;

    &:hover {
        background-color: rgb(232, 17, 35);
    }

    &:active {
        background-color: rgb(237, 109, 119);

        & :deep(path) {
            fill: white !important;
        }
    }

}
</style>