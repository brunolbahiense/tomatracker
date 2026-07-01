import en from './en'
import pt from './pt'

export type { Translations } from './en'

export const translations = { en, pt }
export type Locale = keyof typeof translations
