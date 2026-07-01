import { useContext } from 'react'
import { LocaleContext } from 'contexts/LocaleContext'

const useLocale = () => useContext(LocaleContext)

export default useLocale
