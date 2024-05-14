<script setup>
import { EncodeParameter, EncodePreset, Dialog_newPreset, Settings } from '@/js/globalState/globalState.js'
import Tooltip from '@/vue/control/tooltip.vue'
import ControlLine from '@/vue/control/controlLine.vue'

const open = ['output', 'encode', 'others']
const setting = Settings()
const encodeParameter = EncodeParameter()
const encodePreset = EncodePreset()
encodePreset.selectPreset()

const dialogNewPreset = Dialog_newPreset()
</script>

<template>

    <el-collapse class="parameter-editor-collapse" v-model="open">
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
            <el-collapse-item :title="$i18n('encode_parameter',true,true)" name="encode">
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
                        <el-option v-for="item in encodeParameter.codecList" :key="item" :label="item" :value="item"/>
                    </el-select>
                </control-line>
                <!--                编码模式-->
                <control-line :label="$i18n('codec_mode')" :tooltip="$i18n('codec_mode_tooltip')">
                    <el-radio-group v-model="encodeParameter.codec_mode" size="small" style="width: 100%">
                        <el-radio-button v-for="item in encodeParameter.codecModeList" :label="item" :value="item"/>
                    </el-radio-group>
                </control-line>
            </el-collapse-item>
            <el-collapse-item :title="$i18n('others_parameter',true,true)" name="others">
                <div>
                    Decision making: giving advices about operations is acceptable, but do
                    not make decisions for the users;
                </div>
                <div>
                    Controlled consequences: users should be granted the freedom to
                    operate, including canceling, aborting or terminating current
                    operation.
                </div>
            </el-collapse-item>
            <el-collapse-item title="vapoursynth" name="vapoursynth">
                <div>
                    Decision making: giving advices about operations is acceptable, but do
                    not make decisions for the users;
                </div>
                <div>
                    Controlled consequences: users should be granted the freedom to
                    operate, including canceling, aborting or terminating current
                    operation.
                </div>
            </el-collapse-item>
        </el-scrollbar>
    </el-collapse>
</template>

<style scoped>

</style>