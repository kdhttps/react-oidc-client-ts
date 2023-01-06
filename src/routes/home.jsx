import { makeUserAuthentication } from "../makeOIDCUserManager";

export default function Home() {
  const auth = makeUserAuthentication()
  
  async function login() {
    return await auth.signinRedirect()
  }
 
  return (
    <div id="home-page">
      <h2>Hello, Login with Jans Github Flow</h2>
      <button onClick={login}>Login</button>
    </div>
  );
}