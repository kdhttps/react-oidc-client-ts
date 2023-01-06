import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { makeUserAuthentication } from "../makeOIDCUserManager";

export default function Dashboard() {
  const navigate = useNavigate()
  const auth = makeUserAuthentication()
  const [name, setName] = useState('')

  useEffect(() => {
    introspectToken()
  })
  
  async function introspectToken() {
    const accessToken = await auth.getAccessToken()
    console.log("Dashboard accessToken: ", accessToken)
    if (!accessToken) {
      console.log('access token not found.')
      return navigate("/")  
    }
  

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
    getUserInfo()
  }

  async function getUserInfo() {
    const accessToken = await auth.getAccessToken()

    const response = await fetch(`${process.env.REACT_APP_OP_SERVER}/jans-auth/restv1/userinfo`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
    });

    const user = await response.json()
    console.log('Dashboard user: ', user)
    setName(user.name)
  }

  return (
    <div id="dashboard-page">
      <h1>Welcome {name}</h1>
      <h1>Login Successfully!</h1>
    </div>
  );
}
