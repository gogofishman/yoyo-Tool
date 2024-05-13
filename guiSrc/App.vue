<script setup>
import MainTab from '@/vue/MainTab.vue'
import Dialog from '@/vue/dialog.vue'
import AppCloseButton from '@/vue/appCloseButton.vue'
</script>

<template>
    <MainTab></MainTab>
    <div id="logo">
        <span class="title">YOYO</span>
        <span class="title">TOOL</span>
    </div>
    <app-close-button></app-close-button>
    <Dialog></Dialog>
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
