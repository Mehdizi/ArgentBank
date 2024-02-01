import { StorageItem, StorageProvider } from "../StorageProvider/StorageProvider"


export class LocalStorageProvider implements StorageProvider {
  store({ key, value }: StorageItem) {
    localStorage.setItem(key, value)
  }
  retrieve({ key }: Pick<StorageItem, "key">) {
    return localStorage.getItem(key) || ""
  }
  remove({ key }: Pick<StorageItem, "key">) {
    localStorage.removeItem(key)
  }
}