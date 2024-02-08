import { SpyStorageProvider } from "../../dependencies/StorageProvider/SpyStorageProvider"
import { initReduxStore } from "../../store"
import { logoutUser } from "./logoutUser"

describe("logoutUser", () => {
  it("should logout the user", async () => {
    const storageProvider = new SpyStorageProvider()
    storageProvider.store({ key: "token", value: "fakeToken" })
    const store = initReduxStore({ dependencies: { storageProvider }, preloadedState: { user: { id: "1234", firstName: "Gegar", lastName: "Mussassi", isLogged: true } } })
    const initialState = store.getState()


    await store.dispatch(logoutUser())

    expect(storageProvider.Args).toStrictEqual([])
    expect(store.getState()).toStrictEqual({
      ...initialState,
      user: {
        id: "",
        lastName: "",
        firstName: "",
        isLogged: false
      }
    })
  })
})


