import locales from '@/js/data/locales.js'
import { Settings } from '@/js/globalState/globalState.js'

export default {
    install: (app) => {
        const settings = Settings()

        /**
         * 国际化翻译
         * @param key
         * @param {boolean} upperCase 大写
         * @param {boolean} onlyFirst 只有首写字母大写
         * @returns {string}
         */
        function i18n (key, upperCase = false, onlyFirst = true) {
            let language = settings.language
            let text = ''
            if (key in locales) {
                if (language in locales[key]) {
                    text = locales[key][language]
                } else {
                    text = locales[key]['en']
                }
            } else {
                text = key
            }

            if (upperCase) {
                if (onlyFirst) {
                    text = text.charAt(0).toUpperCase() + text.slice(1)
                } else {
                    text = text.toUpperCase()
                }
            }

            return text
        }

        app.config.globalProperties.$i18n = i18n
        window.i18n = i18n
    }
}