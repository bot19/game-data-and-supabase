import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
// import Avatar from './Avatar'

export default function Account({ session }) {
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState(null);
  const [link, setLink] = useState(null);
  // const [avatar_url, setAvatarUrl] = useState(null)

  useEffect(() => {
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
    <form onSubmit={updateProfile} className="form-widget">
      {/* <Avatar
        url={avatar_url}
        size={150}
        onUpload={(event, url) => {
          updateProfile(event, url)
        }}
      /> */}
      <div>
        <label htmlFor="email">Email</label>
        <input id="email" type="text" value={session.user.email} disabled />
      </div>
      <div>
        <label htmlFor="username">Name</label>
        <input
          id="username"
          type="text"
          required
          value={username || ""}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="link">Link</label>
        <input
          id="link"
          type="url"
          value={link || ""}
          onChange={(e) => setLink(e.target.value)}
        />
      </div>

      <div>
        <button
          className="button block primary"
          type="submit"
          disabled={loading}
        >
          {loading ? "Loading ..." : "Update"}
        </button>
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
    </form>
  );
}
