import { makeUserAuthentication } from "../makeOIDCUserManager";

export default function Dashboard() {
  const auth = makeUserAuthentication()

  async function getToken() {
    let accessToken = await auth.getAccessToken()
    console.log("Dashboard accessToken: ", accessToken)
  }

  getToken()

  return (
    <div id="dashboard-page">
      <h1>Login Successfully!</h1>
    </div>
  );
}
