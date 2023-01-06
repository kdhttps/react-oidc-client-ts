import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { makeUserAuthentication } from "../makeOIDCUserManager";

export default function SignIn() {
  const navigate = useNavigate();
  const auth = makeUserAuthentication()

  useEffect(() => {
    checkCodeAndGetToken()
  })

  async function checkCodeAndGetToken() {
    const accessToken = await auth.verifyCodeAndGetAccessToken()
    console.log("Validate code and get accessToken: ", accessToken)
    return navigate("/dashboard")  
  }

  return (
    <div id="home-page">
      <h2>Loading...</h2>
    </div>
  )
}