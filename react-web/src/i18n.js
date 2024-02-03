import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import EN_TRANSLATION from './locales/en/tranlation';
import VI_TRANSLATION from './locales/vi/tranlation';
import VI_MASSAGE from './locales/vi/message';
import EN_MASSAGE from './locales/en/message';

const resources = {
    en:{ translatiton: EN_TRANSLATION, mess: EN_MASSAGE},
    vi: { translatiton: VI_TRANSLATION, mess: VI_MASSAGE}
};
i18n
    .use(initReactI18next)
    .init({
        resources,
        lng:"en",
        debug: true,

        interpolatiton: {
            escapeValue: false,
        },
    });
export default i18n;