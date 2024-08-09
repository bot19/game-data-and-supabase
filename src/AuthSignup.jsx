import { useState } from "react";
import { supabase } from "./supabaseClient";

export default function AuthSignup(props) {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (event) => {
    event.preventDefault();

    setLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username,
        },
      },
    });

    if (error) {
      alert(error.error_description || error.message);
    } else {
      props.setSession(data.session);
      // alert("Check your email for the login link!");
    }
    setLoading(false);
  };

  return (
    <div className="form-widget relative">
      <h1 className="header no-m">Signup</h1>
      <form className="form-widget" onSubmit={handleSignup}>
        <div>
          <input
            className="inputField"
            type="email"
            placeholder="Your email (validate unique)"
            value={email}
            required={true}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <input
            className="inputField"
            type="username"
            placeholder="Your username"
            value={username}
            required={true}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div>
          <input
            className="inputField"
            type="password"
            placeholder="Your password"
            value={password}
            required={true}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div>
          <button className={"button block"} disabled={loading}>
            {loading ? <span>Loading</span> : <span>Signup</span>}
          </button>
        </div>
      </form>
      {props.disabled && <div className="blocker"></div>}
    </div>
  );
}
