import { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";
// import Avatar from './Avatar'

export default function Dashboard({ session }) {
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState(null);
  const [link, setLink] = useState(null);
  // const [avatar_url, setAvatarUrl] = useState(null)

  useEffect(() => {
    if (session) {
      async function getProfile() {
        setLoading(true);
        const { user } = session;

        let { data, error } = await supabase
          .from("profiles")
          .select(`username, link`)
          .eq("id", user.id)
          .single();

        if (error) {
          console.warn(error);
        } else if (data) {
          setUsername(data.username);
          setLink(data.link);
          // setAvatarUrl(data.avatar_url)
        }

        setLoading(false);
      }

      getProfile();
    }
  }, [session]);

  // (event, avatarUrl)
  async function updateProfile(event) {
    event.preventDefault();

    setLoading(true);
    const { user } = session;

    const updates = {
      id: user.id,
      username,
      link,
      // avatar_url: avatarUrl,
      updated_at: new Date(),
    };

    let { error } = await supabase.from("profiles").upsert(updates);

    if (error) {
      alert(error.message);
    } else {
      // setAvatarUrl(avatarUrl)
    }
    setLoading(false);
  }

  return (
    <div className="relative">
      <div className="m-b-20">
        <h1 className="header no-m">{session ? username : "Dashboard"}</h1>
        {session && <div className="description">{session.user.email}</div>}
      </div>

      <div>
        <button
          className="button block"
          type="button"
          onClick={() => supabase.auth.signOut()}
        >
          Sign Out
        </button>
      </div>

      {!session && <div className="blocker"></div>}
    </div>
  );
}
