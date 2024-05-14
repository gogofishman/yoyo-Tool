<script setup>
const props = defineProps({
    text: {
        type: String,
        default: ''
    },
    disabled: {
        type: Boolean,
        default: false
    }
})
</script>

<template>
    <el-tooltip
        :content="props.text"
        :disabled="props.disabled || props.text === ''"
        placement="top-start"
        :show-after="500"
        :raw-content="true"
    >
        <slot></slot>
    </el-tooltip>
</template>

<style scoped>

</style>