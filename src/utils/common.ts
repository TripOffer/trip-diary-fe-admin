import { $t } from '@/locales'

export function transformRecordToOption<T extends Record<string, string>>(record: T) {
  return Object.entries(record).map(([value, label]) => ({
    value,
    label,
  })) as CommonType.Option<T[keyof T]>[]
}

export function translateOptions(options: CommonType.Option<string>[]) {
  return options.map(option => ({
    ...option,
    label: $t(option.label as App.I18n.I18nKey),
  }))
}

export function toggleHtmlClass(className: string) {
  function add() {
    document.documentElement.classList.add(className)
  }
  function remove() {
    document.documentElement.classList.remove(className)
  }
  return {
    add,
    remove,
  }
}

export function getKeys(obj: Record<string, any>, parentKeys: string[] = []) {
  let keys: string[] = []
  for (const key in obj) {
    if (key) {
      const newKeys = [...parentKeys, key]
      if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
        keys = keys.concat(getKeys(obj[key], newKeys))
      } else {
        keys = newKeys
      }
    }
  }
  return keys
}
