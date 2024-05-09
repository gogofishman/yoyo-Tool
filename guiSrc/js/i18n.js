import locales from '@/js/data/locales.js'
import { Settings } from '@/js/globalState.js'


export default {
    install: (app) => {
        const settings = Settings()

        let lang = localStorage.getItem('language')
        if (lang) {
            settings.setLanguage(lang)
        }

        function i18n (key) {
            let language = settings.language
            if (key in locales) {
                if (language in locales[key]) {
                    return locales[key][language]
                } else {
                    return locales[key]['en']
                }
            } else {
                return key
            }
        }

        app.config.globalProperties.$i18n = i18n
        window.i18n = i18n
    }
}