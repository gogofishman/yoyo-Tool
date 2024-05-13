<script setup>
const props = defineProps({
    label: {
        type: String,
        default: ''
    },
    height: {
        type: String,
        default: '2rem'
    },
    width: {
        type: String,
        default: '100%'
    },
    rightWidth: {
        type: String,
        default: '10rem'
    },
    controlHeight: {
        type: String,
        default: '20px'
    },
    labelTextSize: {
        type: String,
        default: '1em'
    },
    controlTextSize: {
        type: String,
        default: '12px'
    },
    labelTextColor: {
        type: String,
        default: 'var(--color-text-secondary)'
    }
})
</script>

<template>
    <div class="control-line"
         :style="`--control-height:${props.controlHeight};--control-text-size:${props.controlTextSize};height:${props.height};width:${props.width};`">
        <span :style="`font-size:${props.labelTextSize};color:${props.labelTextColor};`">{{ props.label }}</span>
        <div class="control-line-right" :style="`width:${props.rightWidth};`">
            <slot></slot>
        </div>
    </div>
</template>

<style scoped>
.control-line {
    --control-height: 20px;
    --control-text-size: 12px;

    display: flex;
    justify-content: space-between;
    align-items: center;

    & .control-line-right {
        height: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;

        & :deep(button) {
            margin: 0;
            height: var(--control-height);
        }

        & :deep(button) span {
            font-size: var(--control-text-size);
        }

        & :deep(.el-select) {
            width: 100% !important;
        }

        & :deep(.el-select__wrapper) {
            height: var(--control-height);
            min-height: var(--control-height);
            font-size: var(--control-text-size);
        }
    }
}
</style>