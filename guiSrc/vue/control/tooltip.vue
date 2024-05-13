<script setup>
const props = defineProps({
    text: String
})
</script>

<template>
    <el-tooltip
        :content="props.text"
        placement="top-start"
        :show-after="500"
    >
        <slot></slot>
    </el-tooltip>
</template>

<style scoped>

</style>