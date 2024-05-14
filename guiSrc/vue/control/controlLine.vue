<script setup>
import Tooltip from '@/vue/control/tooltip.vue'

const props = defineProps({
    label: {
        type: String,
        default: ''
    },
    tooltip: {
        type: String,
        default: ''
    },
    tooltipDisabled: {
        type: Boolean,
        default: false
    },
    disabled: {
        type: Boolean,
        default: false
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
    justifyContent: {
        type: String,
        default: 'flex-end'
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
    <div class="control-line" :aria-disabled="props.disabled"
         :style="`--control-height:${props.controlHeight};--control-text-size:${props.controlTextSize};height:${props.height};width:${props.width};`">
        <tooltip :text="props.tooltip" :disabled="props.tooltipDisabled">
            <span
                :style="`font-size:${props.labelTextSize};color:${props.labelTextColor};display:flex;align-items: center;`">{{
                    props.label
                }}
                <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"
                     v-if="props.tooltip !== '' && !props.tooltipDisabled">
                    <path
                        d="M514 63.2c-242.6 0-439.3 200.6-439.3 448.1S271.4 959.4 514 959.4s439.3-200.6 439.3-448.1S756.6 63.2 514 63.2z m50.8 704.3H450V659.6h114.8v107.9zM611.7 512c-43.8 29.7-63.3 58.6-58.6 86.7v18.8h-93.8v-25.8c-1.6-48.4 18.8-87.5 60.9-117.2 39-31.2 57.8-59.4 56.3-84.4-3.1-32.8-21.1-50.8-53.9-53.9-43.8 0-71.1 28.9-82 86.7l-105.5-23.4c18.8-106.2 86.7-157.8 203.9-154.7 96.9 4.7 149.2 48.4 157 131.3 3.2 50-24.9 95.3-84.3 135.9z"></path>
                </svg>
            </span>
        </tooltip>
        <div class="control-line-right" :style="`width:${props.rightWidth};justify-content:${props.justifyContent};`">
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

    & svg {
        margin-left: 2px;
        width: 12px;
        height: 12px;
        fill: var(--color-text-secondary-light);
    }

    & .control-line-right {
        height: 100%;
        display: flex;
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

        & :deep(.el-input__wrapper) {
            height: var(--control-height);
            box-sizing: border-box;
            padding: 0 8px;
        }

        & :deep(.el-input__inner) {
            height: var(--control-height);
        }

        & :deep(.el-radio-group) {
            height: var(--control-height);
        }

        & :deep(.el-radio-button) {
            flex: 1;
        }

        & :deep(.el-radio-button__inner) {
            height: var(--control-height);
            line-height: var(--control-height);
            padding: 0;
            width: 100%;
        }

        & :deep(.el-input-number){
            width: 100%;
        }

        & :deep(.el-input__inner){
            font-size: var(--control-text-size);
        }
    }

    &[aria-disabled="true"] {
        display: none;
    }
}
</style>