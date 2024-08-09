import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

export default function Login(props) {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (!props.disabled) {
      // logged out, clear previous values
      setEmail("");
      setPassword("");
    }
  }, [props.disabled]);

  const handleLogin = async (event) => {
    event.preventDefault();

    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
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
      <h1 className="header no-m">Login</h1>
      <form className="form-widget" onSubmit={handleLogin}>
        <div>
          <input
            className="inputField"
            type="email"
            placeholder="Your email (validate email)"
            value={email}
            required={true}
            onChange={(e) => setEmail(e.target.value)}
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
            {loading ? <span>Loading</span> : <span>Login</span>}
          </button>
        </div>
      </form>
      {props.disabled && <div className="blocker"></div>}
    </div>
  );
}
