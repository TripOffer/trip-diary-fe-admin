declare namespace CommonType {
  interface StrategicPattern {
    callback: () => void
    condition: boolean
  }
  type Option<K = string> = {
    label: string
    value: K
  }
  type YesOrNo = 'Y' | 'N'
  type RecordNullable<T> = {
    [K in keyof T]?: T[K] | null
  }
}
