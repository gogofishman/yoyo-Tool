<script setup>
import { EncodeParameter } from '@/js/globalState/globalState.js'
import Tooltip from '@/vue/control/tooltip.vue'
import ControlLine from '@/vue/control/controlLine.vue'
import { Dialog_newPreset } from '@/js/globalState/globalState.js'

const open = ['output', 'encode', 'others']
const encodePreset = EncodeParameter()
encodePreset.$subscribe((mutation, state)=>{
    encodePreset.selectPreset(state.currentPresetName)
})


const dialogNewPreset = Dialog_newPreset()
</script>

<template>

    <el-collapse class="parameter-editor-collapse" v-model="open">
        <el-scrollbar always="always">
            <el-collapse-item :title="$i18n('preset',true,true)" name="preset">

                <control-line :label="$i18n('selcet')">
                    <el-select v-model="encodePreset.currentPresetName" size="small" style="width: var(--select-width)">
                        <el-option v-for="item in encodePreset.presetList" :key="item" :label="item" :value="item"/>
                    </el-select>
                </control-line>

                <control-line>
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
            <el-collapse-item :title="$i18n('output',true,true)" name="output">
                <div>
                    Operation feedback: enable the users to clearly perceive their
                    operations by style updates and interactive effects;
                </div>
                <div>
                    Visual feedback: reflect current state by updating or rearranging
                    elements of the page.
                </div>
            </el-collapse-item>
            <el-collapse-item :title="$i18n('encode_parameter',true,true)" name="encode">
                <div>
                    Simplify the process: keep operating process simple and intuitive;
                </div>
                <div>
                    Definite and clear: enunciate your intentions clearly so that the
                    users can quickly understand and make decisions;
                </div>
                <div>
                    Easy to identify: the interface should be straightforward, which helps
                    the users to identify and frees them from memorizing and recalling.
                </div>
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