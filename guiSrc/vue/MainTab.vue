<script setup>
import Top from '@/vue/Top.vue'
import { CurrentTab } from '@/js/globalState.js'

const currentTab = CurrentTab()
currentTab.name = 'extract'

</script>

<template>
    <el-tabs model-value="extract" type="border-card" tab-position="left" class="main-tab"
             @tab-change="(name)=>{currentTab.name = name}">
        <el-tab-pane name="extract">
            <template #label>
                <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M489.4 544l315.3 285.5c-77.8 85.9-190.3 139.8-315.3 139.8C254.4 969.3 64 778.9 64 544s190.4-425.4 425.4-425.4V544z m424.5 230.8c68.4-75.5 110.1-175.6 110.1-285.5 0-234.9-190.4-425.4-425.4-425.4v425.4l315.3 285.5z"></path>
                </svg>
            </template>
            <Top></Top>
            Route
        </el-tab-pane>
        <el-tab-pane name="merge">
            <template #label>
                <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M760.832 199.168L364.032 428.544V665.6l-102.4-58.368V369.152l396.8-229.376L512 55.296 115.2 284.672v460.8L512 972.8l397.824-228.864v-460.8z m92.16 312.832l-109.056 61.44V448.512l109.056-64z"></path>
                </svg>
            </template>
            <Top></Top>
            Config
        </el-tab-pane>
        <el-tab-pane name="subtitle">
            <template #label>
                <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M476.16 0h71.68c8.2432 1.792 16.4352 4.1984 24.832 5.12A505.856 505.856 0 0 1 1008.64 396.4928c6.0928 26.3168 10.24 53.0432 15.36 79.616v71.68c-1.7408 8.1408-4.1472 16.2304-5.12 24.4736-27.9552 218.8288-178.8928 386.7648-393.472 436.9408C599.6544 1015.1936 573.44 1018.88 547.84 1024H476.16c-8.2432-1.792-16.4352-4.1984-24.832-5.12-215.04-25.6-386.5088-179.2-435.968-391.3216-6.144-26.2656-10.24-53.0432-15.36-79.5648V476.16c1.8432-9.0112 4.3008-17.92 5.4272-27.0336A505.7536 505.7536 0 0 1 396.1856 15.36C422.6048 9.216 449.4336 5.12 476.16 0z m-21.0944 409.6v368.64c0 7.68 0 15.36 0.256 23.04 1.6384 24.6784 19.5072 47.9232 40.96 53.4016 26.5728 6.8608 52.2752-2.8672 64.9728-28.0064a90.7776 90.7776 0 0 0 7.6288-39.2704c0.5632-116.0192 0.3072-232.0384 0.3072-348.16v-29.4912h30.72c43.52 0 87.04 0.9216 130.5088-0.3072 45.056-1.28 71.3728-35.5328 59.392-74.8032-7.2192-23.7056-28.9792-38.912-59.3408-38.9632q-217.5488-0.512-435.2 0a92.16 92.16 0 0 0-15.36 1.1264c-24.1152 4.096-40.0384 17.7152-46.08 41.6256-9.8304 38.5024 16.7936 70.3488 61.44 71.2192 51.5584 0.6656 103.5776-0.0512 159.6928-0.0512z"></path>
                </svg>
            </template>
            <Top></Top>
            Role
        </el-tab-pane>
        <el-tab-pane name="encode">
            <template #label>
                <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M512 0C229.256533 0 0 229.239467 0 512c0 282.760533 229.256533 512 512 512 282.7776 0 512-229.239467 512-512C1024 229.239467 794.7776 0 512 0z m219.9552 540.450133l-291.157333 168.0896a28.125867 28.125867 0 0 1-42.1888-24.354133V347.989333a28.125867 28.125867 0 0 1 42.1888-24.354133l291.157333 168.0896c18.756267 10.820267 18.756267 37.888 0 48.725333z"></path>
                </svg>
            </template>
            <Top></Top>
            Task
        </el-tab-pane>
    </el-tabs>
</template>

<style scoped>
.main-tab {
    width: 100%;
    height: 100%;

    & svg {
        width: 1.5rem;
        height: 1.5rem;
        fill: rgb(190, 190, 190);
        transition: all .2s;

        .is-active & {
            fill: var(--color-accent);
            width: 1rem;
            height: 1rem;
        }
    }

    & :deep(.el-tab-pane) {
        height: 100%;
    }

    & :deep(.el-tabs__header) {
        width: 4rem;
        margin: 0 !important;
        background-color: var(--color-accent);
    }

    & :deep(.el-tabs__nav-scroll) {
        display: flex;
        justify-content: center;
        padding: 2rem 0 1rem;
    }

    & :deep(.el-tabs__content) {
        height: 100%;
        padding: 0;
        background-color: var(--color-primary);
    }

    & :deep(.el-tabs__item) {
        height: 2.5rem;
        width: 2.5rem;
        margin: .2rem 0 !important;
        padding: 0;
        border-radius: 10rem;
        transition: all .2s;
        justify-content: center !important;
        cursor: default !important;
    }
}
</style>