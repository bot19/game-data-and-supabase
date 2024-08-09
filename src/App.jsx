import { useState, useEffect } from "react";
import "./styles/App.css";
import { supabase } from "./supabaseClient";
import AuthSignup from "./AuthSignup";
import Dashboard from "./Dashboard";
import AuthLogin from "./AuthLogin";

function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => data.subscription.unsubscribe();
  }, []);

  console.log("App session", session);

  return (
    <div className="container">
      <div className="row flex">
        <div className="col-6 form-widget">
          <AuthSignup setSession={setSession} disabled={Boolean(session)} />
          <AuthLogin setSession={setSession} disabled={Boolean(session)} />
        </div>
        <div className="col-6 form-widget">
          <Dashboard
            key={session?.user?.id || "no-session"}
            session={session}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
