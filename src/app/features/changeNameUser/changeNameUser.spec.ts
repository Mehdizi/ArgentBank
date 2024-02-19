import { SpyStorageProvider } from "../../dependencies/StorageProvider/SpyStorageProvider"
import { StubChangeNameGateway } from "../../dependencies/EditName/StubChangeNameGateway"
import { initReduxStore } from "../../store"
import { changeUserName } from "./changeNameUser"


describe("change user name", () => {
  it("should modify the name of the user", async () => {

    const storageProvider = new SpyStorageProvider()
    storageProvider.store({ key: "token", value: "validToken" })
    const changeNameGateway = new StubChangeNameGateway()
    changeNameGateway.feedWith("1234")

    const store = initReduxStore({ dependencies: { storageProvider, changeNameGateway }, preloadedState: { user: { id: "1234", firstName: "firstNameTest", lastName: "lastNameTest", isLogged: true } } })

    const initialState = store.getState()

    await store.dispatch(changeUserName({ newFirstName: "newFirstNameTest", newLastName: "newLastNameTest" }))

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