import { ElMessage } from 'element-plus'

function elMessage (text,type) {
    ElMessage({
        message: text,
        type: type,
        plain: true,
        duration: 2000,
    })
}

export default function () {
    window.showElMessage = {
        success: (text) => elMessage(text,'success'),
        warning: (text) => elMessage(text,'warning'),
        error: (text) => elMessage(text,'error'),
        info: (text) => elMessage(text,'info'),
    }
}