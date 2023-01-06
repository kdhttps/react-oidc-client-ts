import { UserAuthentication } from "./UserAuthentication"
import {
  InMemoryWebStorage,
  UserManager,
  WebStorageStateStore,
} from "oidc-client-ts"

const userManagerSettings = {
  authority: process.env.REACT_APP_OP_SERVER,
  client_id: process.env.REACT_APP_OP_CLIENT_ID,
  redirect_uri: `${process.env.REACT_APP_URL}/signin`,
  post_logout_redirect_uri: process.env.REACT_APP_URL,
  response_type: "code",
  scope: "openid email profile offline_access",
  automaticSilentRenew: true,
  validateSubOnSilentRenew: true,
  userStore: new WebStorageStateStore({ store: new InMemoryWebStorage() }),
}
const userManager = new UserManager(userManagerSettings)
const userAuthentication = new UserAuthentication(userManager)

export const makeUserAuthentication = () => {
  return userAuthentication
}
