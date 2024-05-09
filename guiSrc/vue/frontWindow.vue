<script setup>
import { FrontWindow } from '@/js/globalState.js'

const frontWindow = FrontWindow()
</script>

<template>
    <div class="front-window" :aria-hidden="!frontWindow.file_import_window_show">
        <el-card class="front-window-main" shadow="always">
            <span style="margin-right: 1em">{{ $i18n('import_file_titles') }}</span>
            <el-progress class="front-window-progress"
                         :percentage="frontWindow.file_import_window_percentage"
                         :stroke-width="8">
                <span>{{ frontWindow.file_import_window_current }}/{{ frontWindow.file_import_window_total }}</span>
            </el-progress>
        </el-card>
    </div>
</template>

<style scoped>
.front-window {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999;
    background-color: rgba(255, 255, 255, .3);

    & .front-window-main {
        min-width: 30rem;
        min-height: 7rem;

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        & :deep(.el-card__body) {
            display: flex;
        }

        & span {
            font-size: var(--font-size);
        }
    }

    & .front-window-progress {
        width: 20em;
    }

    &[aria-hidden="true"] {
        display: none;
    }

    & :deep(.el-progress-bar__inner){
        transition: width .2s ease;
    }
}
</style>