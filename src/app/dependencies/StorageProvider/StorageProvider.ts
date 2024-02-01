export type StorageItem = {
  key: string,
  value: string
}

export interface StorageProvider {
  store: ({ key, value }: StorageItem) => void
  retrieve: ({ key }: Pick<StorageItem, "key">) => string
  remove: ({ key }: Pick<StorageItem, "key">) => void
}
