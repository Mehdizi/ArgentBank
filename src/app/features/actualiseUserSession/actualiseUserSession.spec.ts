import { SpyStorageProvider } from "../../dependencies/StorageProvider/SpyStorageProvider"
import { StubLocalTokenValidator } from "../../dependencies/TokenGateway/StubLocalTokenValidator"
import { StubUserGateway } from "../../dependencies/UserGateway/StubUserGateway"
import { initReduxStore } from "../../store"
import { testData } from "../authenticateUser/testData"
import { actualiseUserSession } from "./actualiseUserSession"

describe("actualise user session", () => {
  it("should actualise the user session if the token is valdid", async () => {
    // storage provider
    // token gateway
    // userGateway
    // récup le token du localstorage
    // vérifie le token via le tokenGateway
    // fais le call http ou reset le user en fonction
    const storageProvider = new SpyStorageProvider()
    const tokenValidator = new StubLocalTokenValidator()
    const userGateway = new StubUserGateway()

    storageProvider.store({ key: "token", value: "validToken" })
    userGateway.feedWith({ firstName: testData.firstName, lastName: testData.lastName, id: testData.userId })
    const store = initReduxStore({ dependencies: { storageProvider, tokenValidator, userGateway } })
    const initialState = store.getState()

    await store.dispatch(actualiseUserSession())
    expect(storageProvider.retrieve({ key: "token" })).toEqual("validToken")
    expect(store.getState()).toStrictEqual({
      ...initialState, user: {
        isLogged: true,
        firstName: testData.firstName,
        lastName: testData.lastName,
        id: testData.userId
      }
    })
  }
    // it("should reset the user if the token is invalid", () => {

    // })

  )
})