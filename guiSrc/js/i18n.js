import locales from '@/js/data/locales.js'
import { Settings } from '@/js/globalState.js'


export default {
    install: (app) => {
        const settings = Settings()

        // let lang = config.get('language')
        // if (lang) {
        //     settings.setLanguage(lang)
        // }

        app.config.globalProperties.$i18n = (key) => {
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
    }
}