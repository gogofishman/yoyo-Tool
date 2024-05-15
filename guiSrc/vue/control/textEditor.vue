<script setup>
import { onMounted, ref } from 'vue'
import { CodeJar } from 'codejar'
import hljs from 'highlight.js'

import { Dialog_bashEditor } from '@/js/globalState/globalState.js'

const dialogBashEditor = Dialog_bashEditor()
const editor = ref(null)
const editorLeft = ref(null)
const editorLineCount = ref(2)

onMounted(() => {
    function lineCount(text) {
        let num = (text.match(/\n/g) || []).length +1
        if (!text.endsWith('\n')) num++
        return num
    }

    const highlight = (editor) => {
        let code = editor.textContent
        code = hljs.highlightAuto(code, ['javascript', 'python', 'bash']).value
        editor.innerHTML = code
    }

    if (editor.value) {
        const jar = CodeJar(editor.value, highlight, {
            tab: ' '.repeat(4),
        })

        // 设置初始代码
        const content = ref(dialogBashEditor.text)
        editorLineCount.value = lineCount(content.value)
        jar.updateCode(content.value)

        dialogBashEditor.$onAction(({name})=>{
            if (name === 'close') {
                // 每次关闭时重置代码
                jar.updateCode(dialogBashEditor.text)
            }
            if (name === 'save') {
                dialogBashEditor.text = content.value
            }
        })

        // 监听代码变化
        jar.onUpdate((code) => {
            console.log(code)
            content.value = code
            editorLineCount.value = lineCount(code)
        })
    }

    function hasVerticalScrollbar (element) {
        return element.scrollHeight > element.clientHeight
    }

    function hasHorizontalScrollbar (element) {
        return element.scrollWidth > element.clientWidth
    }

    // 在滚动条上不改变鼠标样式
    let content = editor.value
    content.addEventListener('mousemove', (event) => {
        const rect = content.getBoundingClientRect()
        let rightScrollbar = hasVerticalScrollbar(content)
        let bottomScrollbar = hasHorizontalScrollbar(content)

        if (!rightScrollbar && !bottomScrollbar) {return}

        let rightPadding = rightScrollbar ? 10 : 0
        let bottomPadding = bottomScrollbar ? 10 : 0
        if (event.clientX <= rect.right - rightPadding && event.clientY <= rect.bottom - bottomPadding) {
            content.style.cursor = 'text'
        } else {
            content.style.cursor = 'default'
        }
    })

    //行数滚动
    content.addEventListener('scroll', function () {
        // 设置第二个 div 的滚动位置为第一个 div 的滚动位置
        editorLeft.value.scrollTop = content.scrollTop
    })
})
</script>

<template>
    <div class="text-editor" style="display: flex">
        <div ref="editorLeft" class="codejar-editor-left">
            <div v-for="i in editorLineCount-1">{{ i }}</div>
            <div style="display: inline-block"></div>
        </div>
        <div ref="editor" class="codejar-editor hljs" style="flex: 1"></div>
    </div>
</template>

<style>
.codejar-editor-left {
    padding-top: 1px;
    overflow: hidden;
    margin-right: 1em;
    min-width: 2em;
    text-align: right;
}

.codejar-editor,.codejar-editor-left {
    --font-size: 15px;

    white-space: nowrap !important;
    line-height: 1.4em;
    font-family: Consolas, sans-serif !important;
    font-size: var(--font-size);
    height: calc(80vh - var(--el-dialog-padding-primary) * 2 - 54px);

    & * {
        font-family: Consolas, sans-serif !important;
        font-size: var(--font-size);
    }
}

/* 修改滚动条轨道的样式 */
::-webkit-scrollbar {
    width: 6px;
    height: 6px;
}

/* 修改滚动条的滑块样式 */
::-webkit-scrollbar-thumb {
    background-color: #888; /* 设置滑块的背景颜色 */
    border-radius: 6px; /* 设置滑块的圆角 */
}

::-webkit-scrollbar-track {
    background: transparent; /* 轨道背景颜色 */
}

/* 修改滚动条轨道上方和下方的按钮样式 */
::-webkit-scrollbar-button {
    display: none; /* 隐藏滚动条按钮 */
}
</style>
