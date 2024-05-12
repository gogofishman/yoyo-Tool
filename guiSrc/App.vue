<script setup>
import MainTab from '@/vue/MainTab.vue'
import frontWindow from '@/vue/frontWindow.vue'
import { Settings } from '@/js/globalState/globalState.js'

//设置从localStorage初始化
Settings().init()

</script>

<template>
    <MainTab></MainTab>
    <div id="logo">
        <span class="title">YOYO</span>
        <span class="title">TOOL</span>
    </div>
    <frontWindow></frontWindow>
</template>

<style scoped>
#logo {
    position: absolute;
    width: 4rem;
    bottom: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    & .title {
        color: var(--color-primary);
        font-weight: 700;
        transform: scaleX(.9);
    }
}
</style>
