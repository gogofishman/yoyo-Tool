<script setup>
import {
    EncodeParameter,
    EncodePreset,
    Dialog_newPreset,
    Settings,
    Dialog_bashEditor
} from '@/js/globalState/globalState.js'
import Tooltip from '@/vue/control/tooltip.vue'
import ControlLine from '@/vue/control/controlLine.vue'
import { onBeforeMount } from 'vue'

const dialogBashEditor = Dialog_bashEditor()
const setting = Settings()
const encodeParameter = EncodeParameter()
encodeParameter.$subscribe((mutation, state) => {
    if (mutation.events.key === 'bash') return
    if (mutation.events.key.startsWith('_')) return
    state.bash = encodeParameter.getArgs
})
const encodePreset = EncodePreset()
const dialogNewPreset = Dialog_newPreset()

onBeforeMount(()=>{
    //开启app时永远折叠预设
    encodeParameter._open = encodeParameter._open.filter(item => item !== 'preset')
})
</script>

<template>

    <el-collapse class="parameter-editor-collapse" v-model="encodeParameter._open">
        <el-scrollbar always="always">
            <!--            预设-->
            <el-collapse-item :title="$i18n('preset',true,true)" name="preset">
                <!--预设选择-->
                <control-line :label="$i18n('selcet')">
                    <el-select v-model="encodePreset.currentPresetName" size="small" style="width: var(--select-width)"
                               @change="encodePreset.selectPreset()">
                        <el-option v-for="item in encodePreset.presetList" :key="item" :label="item" :value="item"/>
                    </el-select>
                </control-line>

                <!--预设按钮-->
                <control-line justify-content="space-between">
                    <tooltip :text="$i18n('new_preset_tooltip')">
                        <el-button type="primary" size="small" plain
                                   @click="dialogNewPreset.open()">{{ $i18n('new') }}
                        </el-button>
                    </tooltip>
                    <el-button type="primary" size="small" plain
                               :disabled="encodePreset.currentPresetName === 'default'"
                               @click="encodePreset.deletePreset()">
                        {{ $i18n('delete') }}
                    </el-button>
                    <tooltip :text="$i18n('save_preset_tooltip')">
                        <el-button type="primary" size="small" plain
                                   @click="encodePreset.savePreset()">{{ $i18n('save') }}
                        </el-button>
                    </tooltip>
                </control-line>
            </el-collapse-item>

            <!--            输出-->
            <el-collapse-item :title="$i18n('output',true,true)" name="output">
                <!--保存在源文件夹-->
                <control-line :label="$i18n('save_in_the_source_folder')" tooltip="save in the source folder"
                              :tooltip-disabled="setting.language !=='en'">
                    <el-switch v-model="encodeParameter.output_save_in_the_source_folder"></el-switch>
                </control-line>
                <!--覆盖源文件-->
                <control-line :label="$i18n('overwrite_source_file')" tooltip="overwrite source file"
                              :disabled="!encodeParameter.output_save_in_the_source_folder"
                              :tooltip-disabled="setting.language !=='en'">
                    <el-switch v-model="encodeParameter.output_overwrite_source_file"></el-switch>
                </control-line>
                <!--输出文件夹-->
                <control-line :label="$i18n('output_folder')"
                              :disabled="encodeParameter.output_save_in_the_source_folder">
                    <el-input v-model="encodeParameter.output_folder" size="small"></el-input>
                </control-line>
                <!--文件后缀-->
                <control-line :label="$i18n('output_suffix')" :disabled="encodeParameter.output_overwrite_source_file">
                    <el-input v-model="encodeParameter.output_suffix" size="small"></el-input>
                </control-line>
            </el-collapse-item>

            <!--            视频编码-->
            <el-collapse-item :title="$i18n('video_encode',true,true)" name="video_encode">
                <!--                gpu-->
                <control-line :label="$i18n('encode_core')">
                    <el-radio-group v-model="encodeParameter.core" size="small" style="width: 100%">
                        <el-radio-button v-for="item in encodeParameter.coreList" :label="item" :value="item"/>
                    </el-radio-group>
                </control-line>

                <!--                文件格式-->
                <control-line :label="$i18n('file_format')">
                    <el-select v-model="encodeParameter.file_format" size="small" style="width: var(--select-width)"
                               @change="encodeParameter.onchangeFileFormat()">
                        <el-option v-for="item in encodeParameter.fileFormatList" :key="item" :label="item"
                                   :value="item"/>
                    </el-select>
                </control-line>
                <!--                编码格式-->
                <control-line :label="$i18n('codec')">
                    <el-select v-model="encodeParameter.codec" size="small" style="width: var(--select-width)">
                        <el-option v-for="item in encodeParameter.codecList" :key="item" :label="$i18n(item)"
                                   :value="item"/>
                    </el-select>
                </control-line>

                <!-- 质量-->
                <control-line :label="$i18n('quality')">
                    <el-input-number
                        v-model="encodeParameter.quality"
                        :min="0"
                        :max="51"
                        size="small"
                        :precision="1"
                    />
                </control-line>

                <!--高级-->
                <control-line :label="$i18n('advanced')">
                    <el-switch v-model="encodeParameter._more"></el-switch>
                </control-line>

                <!--                位深度-->
                <control-line v-if="encodeParameter._more" :label="$i18n('depth')">
                    <el-radio-group v-model="encodeParameter.depth" size="small" style="width: 100%">
                        <el-radio-button v-for="item in encodeParameter.depthList" :label="item" :value="item"/>
                    </el-radio-group>
                </control-line>
                <control-line v-if="encodeParameter._more" :label="$i18n('color_space')">
                    <el-radio-group v-model="encodeParameter.color_space" size="small" style="width: 100%">
                        <el-radio-button v-for="item in encodeParameter.colorSpaceList" :label="item" :value="item"/>
                    </el-radio-group>
                </control-line>
                <control-line v-if="encodeParameter._more" label="lookahead" :tooltip="$i18n('lookahead_tooltip')">
                    <el-input-number
                        v-model="encodeParameter.lookahead"
                        :min="0"
                        :max="32"
                        size="small"
                    />
                </control-line>
                <control-line v-if="encodeParameter._more" label="aq" :tooltip="$i18n('aq_tooltip')">
                    <el-input-number
                        v-model="encodeParameter.aq"
                        :min="-1"
                        :max="15"
                        size="small"
                    />
                </control-line>
                <control-line v-if="encodeParameter._more" label="gop" :tooltip="$i18n('gop_tooltip')">
                    <el-input-number
                        v-model="encodeParameter.gop"
                        :min="-1"
                        size="small"
                    />
                </control-line>
                <control-line v-if="encodeParameter._more&&encodeParameter.codec!=='av1'" :label="$i18n('lossless')">
                    <el-switch v-model="encodeParameter.lossless"></el-switch>
                </control-line>
                <control-line v-if="encodeParameter._more" label="vfr" :tooltip="$i18n('vfr_tooltip')">
                    <el-switch v-model="encodeParameter.vfr"></el-switch>
                </control-line>

            </el-collapse-item>

            <!--            音频编码-->
            <el-collapse-item :title="$i18n('audio_encode',true,true)" name="audio_encode">
                <!--                编码格式-->
                <control-line :label="$i18n('codec')">
                    <el-select v-model="encodeParameter.audio_codec" size="small" style="width: var(--select-width)">
                        <el-option v-for="item in encodeParameter.audioCodecList" :key="item" :label="$i18n(item)"
                                   :value="item"/>
                    </el-select>
                </control-line>
                <!--                音频比特率-->
                <control-line :label="$i18n('bitrate')+' /kbps'">
                    <el-autocomplete
                        v-model="encodeParameter.audio_bitrate"
                        :fetch-suggestions="encodeParameter.audioBitrateFunc"
                        @change="encodeParameter.onchangeAudioBitrate()"
                    />
                </control-line>
                <!--                采样率-->
                <control-line :label="$i18n('samplerate')+' /Hz'">
                    <el-autocomplete
                        v-model="encodeParameter.audio_samplerate"
                        :fetch-suggestions="encodeParameter.audioSamplerateFunc"
                        @change="encodeParameter.onchangeAudioSamplerate()"
                    />
                </control-line>
                <!--                声道-->
                <control-line :label="$i18n('audio_channel')">
                    <el-select v-model="encodeParameter.audio_channel" size="small" style="width: var(--select-width)">
                        <el-option v-for="item in encodeParameter.audioChannelList" :key="item" :label="$i18n(item)"
                                   :value="item"/>
                    </el-select>
                </control-line>
            </el-collapse-item>

            <!--            杂项-->
            <el-collapse-item :title="$i18n('others_parameter',true,true)" name="others">
                <!--                修改分辨率-->
                <control-line :label="$i18n('change_resolution')" right-width="5em">
                    <el-switch v-model="encodeParameter.change_resolution"></el-switch>
                </control-line>
                <!--分辨率-->
                <control-line :label="$i18n('resolution')" v-if="encodeParameter.change_resolution">
                    <el-autocomplete
                        v-model="encodeParameter.resolution"
                        :fetch-suggestions="encodeParameter.resolutionFunc"
                        @change="encodeParameter.onchangeResolution()"
                    />
                </control-line>
                <!--                缩放算法-->
                <control-line :label="$i18n('scale_algorithm')" v-if="encodeParameter.change_resolution">
                    <el-select v-model="encodeParameter.scale_mode" size="small" style="width: var(--select-width)">
                        <el-option v-for="item in encodeParameter.scaleModeList" :key="item" :label="item"
                                   :value="item"/>
                    </el-select>
                </control-line>
                <!--                像素比-->
                <control-line label="SAR" :tooltip="$i18n('sar_tooltip')" v-if="encodeParameter.change_resolution">
                    <el-autocomplete
                        v-model="encodeParameter.sar"
                        :fetch-suggestions="encodeParameter.sarFunc"
                        @change="encodeParameter.onchangeSar()"
                    />
                </control-line>
                <!--                从输入文件保留章节信息。-->
                <control-line :label="$i18n('chapter_copy')">
                    <el-switch v-model="encodeParameter.chapter_copy"></el-switch>
                </control-line>
                <!--                从输入文件保留章节信息。-->
                <control-line :label="$i18n('key_on_chapter')" :tooltip="$i18n('key_on_chapter_tooltip')"
                              v-if="encodeParameter.chapter_copy">
                    <el-switch v-model="encodeParameter.key_on_chapter"></el-switch>
                </control-line>
                <!--                字幕相关-->
                <control-line :label="$i18n('encode_sub')" right-width="5em">
                    <el-switch v-model="encodeParameter.encode_sub"></el-switch>
                </control-line>
                <control-line :label="$i18n('encode_sub_mode')" :tooltip="$i18n('encode_sub_mode_tooltip')"
                              v-if="encodeParameter.encode_sub">
                    <el-select v-model="encodeParameter.encode_sub_mode" size="small"
                               style="width: var(--select-width)">
                        <el-option v-for="item in encodeParameter.encodeSubModeList" :key="item" :label="$i18n(item)"
                                   :value="item"/>
                    </el-select>
                </control-line>
                <!--                编辑参数-->
                <control-line>
                    <el-button type="primary" size="small" plain
                               @click="dialogBashEditor.open(encodeParameter.getBashText,
                               (text)=>encodeParameter.bash=text.split(/\s+/))">
                        {{ $i18n('edit_parameters') }}
                    </el-button>
                </control-line>
            </el-collapse-item>

            <!--            VS-->
            <el-collapse-item title="VapourSynth" name="vapoursynth">

            </el-collapse-item>
        </el-scrollbar>
    </el-collapse>
</template>

<style scoped>

</style>