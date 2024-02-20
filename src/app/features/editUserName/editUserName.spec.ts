import { SpyEditUserNameGateway } from "../../dependencies/EditUserName/SpyEditUserNameGateway"
import { SpyStorageProvider } from "../../dependencies/StorageProvider/SpyStorageProvider"
import { initReduxStore } from "../../store"
import { editUserName } from "./editUserName"


describe("change user name", () => {
  it("should modify the name of the user", async () => {

    const storageProvider = new SpyStorageProvider()
    storageProvider.store({ key: "token", value: "validToken" })
    const editUserNameGateway = new SpyEditUserNameGateway()

    const store = initReduxStore({ dependencies: { storageProvider, editUserNameGateway }, preloadedState: { user: { id: "1234", firstName: "firstNameTest", lastName: "lastNameTest", isLogged: true } } })

    const initialState = store.getState()

    await store.dispatch(editUserName({ newFirstName: "newFirstNameTest", newLastName: "newLastNameTest" }))

    expect(editUserNameGateway.Args).toStrictEqual([{ newFirstName: "newFirstNameTest", newLastName: "newLastNameTest", token: "validToken" }])

    expect(store.getState()).toStrictEqual({
      ...initialState, user: {
        isLogged: true,
        id: "1234",
        firstName: "newFirstNameTest",
        lastName: "newLastNameTest"
      }
    })
  })
})