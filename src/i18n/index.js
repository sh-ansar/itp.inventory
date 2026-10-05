import Vue from 'vue'
import { locale, loadMessages } from 'devextreme/localization'
import ruMessages from 'devextreme/localization/messages/ru.json'
import enMessages from 'devextreme/localization/messages/en.json'
import { appMessages } from './appMessages'
import { pageMessages } from './pageMessages'

function mergeDeep (target, source) {
  const output = { ...target }

  if (!source || typeof source !== 'object') {
    return output
  }

  Object.keys(source).forEach((key) => {
    const sourceValue = source[key]
    const targetValue = output[key]

    if (
      sourceValue &&
      typeof sourceValue === 'object' &&
      !Array.isArray(sourceValue)
    ) {
      output[key] = mergeDeep(
        targetValue && typeof targetValue === 'object' ? targetValue : {},
        sourceValue,
      )
    } else {
      output[key] = sourceValue
    }
  })

  return output
}

const legacyRu = require('./ru.json')
const legacyEn = require('./en.json')

Vue.i18n.add('ru', mergeDeep(mergeDeep(legacyRu, appMessages.ru), pageMessages.ru))
Vue.i18n.add('en', mergeDeep(mergeDeep(legacyEn, appMessages.en), pageMessages.en))
Vue.i18n.add('ka', mergeDeep(appMessages.ka, pageMessages.ka))

loadMessages(ruMessages)
loadMessages(enMessages)
loadMessages({
  ka: {
    Yes: 'დიახ',
    No: 'არა',
    Cancel: 'გაუქმება',
    Clear: 'გასუფთავება',
    Done: 'მზადაა',
    Loading: 'იტვირთება...',
    Select: 'არჩევა...',
    Search: 'ძებნა',
    Back: 'უკან',
    OK: 'კარგი',
    Today: 'დღეს',
    Yesterday: 'გუშინ',
    'dxCollectionWidget-noDataText': 'მონაცემები არ არის',
    'dxDropDownEditor-selectLabel': 'არჩევა',
    'dxLookup-searchPlaceholder': 'ძებნა...',
    'dxList-pullingDownText': 'ჩამოსწიეთ განახლებისთვის...',
    'dxList-pulledDownText': 'გაუშვით განახლებისთვის...',
    'dxList-refreshingText': 'განახლება...',
    'dxList-pageLoadingText': 'იტვირთება...',
    'dxList-nextButtonText': 'მეტი',
    'dxDataGrid-columnChooserTitle': 'სვეტების არჩევა',
    'dxDataGrid-columnChooserEmptyText': 'სვეტის დასამალად გადაიტანეთ აქ',
    'dxDataGrid-groupContinuesMessage': 'გაგრძელება შემდეგ გვერდზე',
    'dxDataGrid-groupContinuedMessage': 'გაგრძელება წინა გვერდიდან',
    'dxDataGrid-groupHeaderText': 'ამ სვეტით დაჯგუფება',
    'dxDataGrid-ungroupHeaderText': 'დაჯგუფების მოხსნა',
    'dxDataGrid-ungroupAllText': 'ყველა დაჯგუფების მოხსნა',
    'dxDataGrid-groupPanelEmptyText': 'დაჯგუფებისთვის გადაიტანეთ სვეტის სათაური აქ',
    'dxDataGrid-noDataText': 'მონაცემები არ არის',
    'dxDataGrid-searchPanelPlaceholder': 'ძებნა...',
    'dxDataGrid-editingEditRow': 'რედაქტირება',
    'dxDataGrid-editingSaveRowChanges': 'შენახვა',
    'dxDataGrid-editingCancelRowChanges': 'გაუქმება',
    'dxDataGrid-editingDeleteRow': 'წაშლა',
    'dxDataGrid-editingUndeleteRow': 'აღდგენა',
    'dxDataGrid-editingConfirmDeleteMessage': 'ნამდვილად გსურთ ამ ჩანაწერის წაშლა?',
    'dxDataGrid-editingConfirmDeleteTitle': 'დადასტურება',
    'dxDataGrid-exportTo': 'ექსპორტი',
    'dxDataGrid-exportToExcel': 'Excel-ში ექსპორტი',
    'dxDataGrid-exporting': 'ექსპორტი...',
    'dxDataGrid-excelFormat': 'Excel ფაილი',
    'dxDataGrid-selectedRows': 'არჩეული ჩანაწერები',
    'dxDataGrid-exportSelectedRows': 'არჩეული ჩანაწერების ექსპორტი',
    'dxDataGrid-exportAll': 'ყველა ჩანაწერის ექსპორტი',
    'dxDataGrid-headerFilterEmptyValue': '(ცარიელი)',
    'dxDataGrid-filterRowShowAllText': '(ყველა)',
    'dxDataGrid-filterRowResetOperationText': 'განულება',
    'dxDataGrid-filterRowOperationEquals': 'ტოლია',
    'dxDataGrid-filterRowOperationNotEquals': 'არ უდრის',
    'dxDataGrid-filterRowOperationLess': 'ნაკლებია',
    'dxDataGrid-filterRowOperationLessOrEquals': 'ნაკლებია ან ტოლია',
    'dxDataGrid-filterRowOperationGreater': 'მეტია',
    'dxDataGrid-filterRowOperationGreaterOrEquals': 'მეტია ან ტოლია',
    'dxDataGrid-filterRowOperationStartsWith': 'იწყება',
    'dxDataGrid-filterRowOperationContains': 'შეიცავს',
    'dxDataGrid-filterRowOperationNotContains': 'არ შეიცავს',
    'dxDataGrid-filterRowOperationEndsWith': 'მთავრდება',
    'dxDataGrid-filterRowOperationBetween': 'შორის',
    'dxDataGrid-filterRowOperationBetweenStartText': 'დაწყება',
    'dxDataGrid-filterRowOperationBetweenEndText': 'დასრულება',
    'dxPager-infoText': 'გვერდი {0} / {1} ({2} ჩანაწერი)',
    'dxPager-pagesCountText': '/',
    'dxPager-pageSizesAllText': 'ყველა',
    'dxLoadPanel-message': 'იტვირთება...',
  },
})

const supportedLanguages = ['ru', 'en', 'ka']

export function setAppLanguage (language) {
  const nextLanguage = supportedLanguages.includes(language) ? language : 'ru'

  Vue.i18n.set(nextLanguage)
  locale(nextLanguage)
  localStorage.setItem('uos-language', nextLanguage)

  if (typeof document !== 'undefined') {
    document.documentElement.setAttribute('lang', nextLanguage)
  }

  return nextLanguage
}

export function getAppLanguage () {
  const storedLanguage = localStorage.getItem('uos-language')
  return supportedLanguages.includes(storedLanguage) ? storedLanguage : 'ru'
}

Vue.i18n.fallback('en')
setAppLanguage(getAppLanguage())
