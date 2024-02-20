import { StorageItem, StorageProvider } from "./StorageProvider";

export class SpyStorageProvider implements StorageProvider {
  private args = new Map<StorageItem["key"], StorageItem["value"]>()

  get Args() {
    return Array.from(this.args, ([key, value]) => ({ key, value }))
  }

  retrieve({ key }: Pick<StorageItem, "key">) {
    return this.args.get(key)!
  }

  store(storageItem: StorageItem) {
    this.args.set(storageItem.key, storageItem.value)
  }
  remove({ key }: Pick<StorageItem, "key">) {
    this.args.delete(key)
  }
}