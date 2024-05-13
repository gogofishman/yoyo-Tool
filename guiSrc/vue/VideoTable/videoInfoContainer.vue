<script setup>
import VideoInfoLine from '@/vue/VideoTable/videoInfoLine.vue'

const props = defineProps({
    info: Object
})

const activeName = 'general'
</script>

<template>
    <el-tabs v-model="activeName" class="video-info-tab" tab-position="left">
        <el-tab-pane :label="$i18n('general')" name="general">
            <videoInfoLine :name="$i18n('path')" :value="props.info.path"></videoInfoLine>
            <videoInfoLine :name="$i18n('size')" :value="props.info.size"></videoInfoLine>
            <videoInfoLine :name="$i18n('duration')" :value="props.info.duration"></videoInfoLine>
            <videoInfoLine :name="$i18n('overallBitRate')" :value="props.info.overallBitRate"></videoInfoLine>
            <videoInfoLine :name="$i18n('frameCount')" :value="props.info.frameCount"></videoInfoLine>
            <videoInfoLine :name="$i18n('frameRate')" :value="props.info.frameRate"></videoInfoLine>
            <videoInfoLine :name="$i18n('encodedDate')" :value="props.info.encodedDate"></videoInfoLine>
        </el-tab-pane>
        <el-tab-pane v-for="data in props.info.tracks" :label="data.label" :name="data.label">
<!--            视频轨道-->
            <el-scrollbar always="always" height="20rem" v-if="data.type === 'Video'" style="width: calc(100% - 5em)">
                <videoInfoLine :name="$i18n('encodingFormat')" :value="data.format"></videoInfoLine>
                <videoInfoLine :name="$i18n('encodingConfig')" :value="data.formatConfig"></videoInfoLine>
                <videoInfoLine :name="$i18n('codecID')" :value="data.codecID"></videoInfoLine>
                <videoInfoLine :name="$i18n('bitDepth')" :value="data.bitDepth"></videoInfoLine>
                <videoInfoLine :name="$i18n('bitRate')" :value="data.bitRate"></videoInfoLine>
                <videoInfoLine :name="$i18n('frameRateMode')" :value="data.frameRateMode"></videoInfoLine>
                <videoInfoLine :name="$i18n('frameCount')" :value="data.frameCount"></videoInfoLine>
                <videoInfoLine :name="$i18n('frameRate')" :value="data.frameRate"></videoInfoLine>

                <videoInfoLine :name="$i18n('width')" :value="data.width"></videoInfoLine>
                <videoInfoLine :name="$i18n('height')" :value="data.height"></videoInfoLine>
                <videoInfoLine :name="$i18n('displayAspectRatio')" :value="data.displayAspectRatio"></videoInfoLine>
                <videoInfoLine :name="$i18n('pixelAspectRatio')" :value="data.pixelAspectRatio"></videoInfoLine>

                <videoInfoLine :name="$i18n('colorSpace')" :value="data.colorSpace"></videoInfoLine>
                <videoInfoLine :name="$i18n('chromaSubsampling')" :value="data.chromaSubsampling"></videoInfoLine>

                <videoInfoLine :name="$i18n('duration')" :value="data.duration"></videoInfoLine>
                <videoInfoLine :name="$i18n('streamSize')" :value="data.streamSize"></videoInfoLine>
                <videoInfoLine :name="$i18n('language')" :value="data.language"></videoInfoLine>
                <videoInfoLine :name="$i18n('defaultTrack')" :value="data.default"></videoInfoLine>
                <videoInfoLine :name="$i18n('forcedTrack')" :value="data.forced"></videoInfoLine>
                <videoInfoLine :name="$i18n('encodedLibrary')" :value="data.encodedLibrary"></videoInfoLine>
                <videoInfoLine :name="$i18n('encodedLibrarySettings')" :value="data.encodedLibrarySettings"></videoInfoLine>
            </el-scrollbar>
<!--            音频轨道-->
            <el-scrollbar always="always" height="20rem" v-if="data.type === 'Audio'" style="width: calc(100% - 5em)">
                <videoInfoLine :name="$i18n('encodingFormat')" :value="data.format"></videoInfoLine>
                <videoInfoLine :name="$i18n('codecID')" :value="data.codecID"></videoInfoLine>

                <videoInfoLine :name="$i18n('channels')" :value="data.channels"></videoInfoLine>
                <videoInfoLine :name="$i18n('channelLayout')" :value="data.channelLayout"></videoInfoLine>

                <videoInfoLine :name="$i18n('bitRate')" :value="data.bitRate"></videoInfoLine>
                <videoInfoLine :name="$i18n('samplingRate')" :value="data.samplingRate"></videoInfoLine>
                <videoInfoLine :name="$i18n('frameRate')" :value="data.frameRate"></videoInfoLine>

                <videoInfoLine :name="$i18n('duration')" :value="data.duration"></videoInfoLine>
                <videoInfoLine :name="$i18n('streamSize')" :value="data.streamSize"></videoInfoLine>
                <videoInfoLine :name="$i18n('language')" :value="data.language"></videoInfoLine>
                <videoInfoLine :name="$i18n('defaultTrack')" :value="data.default"></videoInfoLine>
                <videoInfoLine :name="$i18n('forcedTrack')" :value="data.forced"></videoInfoLine>
            </el-scrollbar>
<!--            字幕轨道-->
            <el-scrollbar always="always" height="20rem" v-if="data.type === 'Text'" style="width: calc(100% - 5em)">
                <videoInfoLine :name="$i18n('encodingFormat')" :value="data.format"></videoInfoLine>
                <videoInfoLine :name="$i18n('codecID')" :value="data.codecID"></videoInfoLine>

                <videoInfoLine :name="$i18n('duration')" :value="data.duration"></videoInfoLine>
                <videoInfoLine :name="$i18n('streamSize')" :value="data.streamSize"></videoInfoLine>
                <videoInfoLine :name="$i18n('language')" :value="data.language"></videoInfoLine>
                <videoInfoLine :name="$i18n('defaultTrack')" :value="data.default"></videoInfoLine>
                <videoInfoLine :name="$i18n('forcedTrack')" :value="data.forced"></videoInfoLine>
            </el-scrollbar>
<!--            章节-->
            <el-scrollbar always="always" height="20rem" v-if="data.type === 'Menu'" style="width: calc(100% - 5em)">
                <videoInfoLine v-for="(value, key) in data.data" :name="key" :value="value"></videoInfoLine>
            </el-scrollbar>
<!--            附件-->
            <el-scrollbar always="always" height="20rem" v-if="data.type === 'Attachments'" style="width: calc(100% - 5em)">
                <videoInfoLine v-for="(item, index) in data.data" :name="String(index+1)" :value="item"></videoInfoLine>
            </el-scrollbar>
        </el-tab-pane>
    </el-tabs>
</template>

<style scoped>
.video-info-tab {
    margin-left: 2em;

    & :deep(.el-tab-pane) {
        height: 100%;
    }

    & :deep(.el-tabs__header) {
        width: auto !important;
        background-color: transparent !important;
    }

    & :deep(.el-tabs__nav-scroll) {
        display: block !important;
        padding: 0 !important;
    }

    & :deep(.el-tabs__content) {
        height: 100%;
        padding: 0;
        background-color: var(--color-primary);
    }

    & :deep(.el-tabs__item) {
        height: var(--el-tabs-header-height) !important;
        width: auto !important;
        margin: .2rem 0 !important;
        padding: 0 20px !important;
        border-radius: 0 !important;
        border: none !important;
        transition: all .2s !important;
        justify-content: center !important;
        cursor: pointer !important;
        font-size: 13px;
        color: var(--el-table-text-color) !important;
    }

    & :deep(.el-tabs__active-bar){
        background-color: var(--el-color-primary-light-7) !important;
    }
}
</style>