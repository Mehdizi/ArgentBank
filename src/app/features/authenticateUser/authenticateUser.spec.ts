import { StubAuthenticationGateway } from "../../dependencies/AuthenticationGateway/StubAuthenticationGateway";
import { StubUserGateway } from "../../dependencies/UserGateway/StubUserGateway";
import { SpyRequestConfigurator } from "../../dependencies/RequestConfigurator/SpyRequestConfigurator";
import { initReduxStore } from "../../store"
import { authenticateUser } from "./authenticateUser";
import { testData } from "./testData";
import { SpyStorageProvider } from "../../dependencies/StorageProvider/SpyStorageProvider";

describe("authenticateUser usecase", () => {

  it("should authenticate user given correct username and password", async () => {
    const storageProvider = new SpyStorageProvider()
    const authenticationGateway = new StubAuthenticationGateway()
    const requestConfigurator = new SpyRequestConfigurator()
    const userGateway = new StubUserGateway()


    authenticationGateway.feedWith(testData.validToken)
    userGateway.feedWith({ firstName: testData.firstName, lastName: testData.lastName, id: testData.userId })
    const store = initReduxStore({
      dependencies: {
        authenticationGateway, requestConfigurator, userGateway, storageProvider
      }
    })
    const initialState = store.getState()

    await store.dispatch(authenticateUser({
      email: testData.validEmail,
      password: testData.validPassword
    }))

    expect(storageProvider.Args).toStrictEqual([{ key: testData.tokenKey, value: testData.validToken }])

    expect(requestConfigurator.Args).toStrictEqual([testData.validToken])

    expect(store.getState()).toStrictEqual({
      ...initialState,
      user: {
        id: testData.userId,
        lastName: testData.lastName,
        firstName: testData.firstName,
        isLogged: true
      }
    })
  })

  // it("Should not authentificate if the password or the email is incorrect", async () => {
  //   const authenticationGateway = new ExceptionAuthenticationGateway()
  //   const { store, initialState } = initFixture(authenticationGateway)

  //   await store.dispatch(authenticateUser({
  //     email: testData.wrongEmail,
  //     password: testData.wrongPassword
  //   }))

  //   expect(store.getState()).toStrictEqual({
  //     ...initialState,
  //     user: {
  //       firstName: "",
  //       lastName: "",
  //       id: "",
  //       isLogged: false
  //     }
  //   })
  // })
})