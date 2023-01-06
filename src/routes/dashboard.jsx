import { useEffect } from "react";
import { makeUserAuthentication } from "../makeOIDCUserManager";

export default function Dashboard() {
  const auth = makeUserAuthentication()

  useEffect(() => {
    introspectToken()
  })

  async function introspectToken() {
    const accessToken = await auth.getAccessToken()
    console.log("Dashboard accessToken: ", accessToken)

    const formBody = `${encodeURIComponent("token")}=${encodeURIComponent(accessToken)}`
    const response = await fetch(`${process.env.REACT_APP_OP_SERVER}/jans-auth/restv1/introspection`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Bearer ${accessToken}`
      },
      body: formBody
    });

    console.log(await response.json())
  }

  return (
    <div id="dashboard-page">
      <h1>Login Successfully!</h1>
    </div>
  );
}
