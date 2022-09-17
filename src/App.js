import { useState, useEffect, createContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { supabase } from "./config/supabaseClient";
import Home from "./pages/Home";
import Create from "./pages/Create";
import Update from "./pages/Update";
import Joke from "./pages/Joke";
import Auth from "./pages/Auth";
import Profile from "./pages/Profile";
const {
  uniqueNamesGenerator,
  adjectives,
  colors,
  animals,
} = require("unique-names-generator");

export const SessionContext = createContext();

const App = () => {
  const [session, setSession] = useState(null);
  const [username, setUsername] = useState(null);
  const [id, setId] = useState(null);
  const [done, isDone] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  useEffect(() => {
    if (session) {
      const updateProfile = async () => {
        const updates = {
          id: session.user.id,
          username: uniqueNamesGenerator({
            dictionaries: [adjectives, colors, animals],
            style: "capital",
          }),
        };

        let { error } = await supabase.from("profiles").insert([updates]);

        if (error) {
          isDone(true);
          throw error;
        } else {
          isDone(true);
        }
      };
      updateProfile();
    }
  }, [session]);

  useEffect(() => {
    if (done) {
      const getProfile = async () => {
        let { data, error, status } = await supabase
          .from("profiles")
          .select(`id, username`)
          .match({ id: session.user.id })
          .single();

        if (error && status !== 406) {
          throw error;
        }

        if (data) {
          setUsername(data.username);
          setId(data.id);
          isDone(false);
        }
      };
      getProfile();
    }
  }, [done]);

  console.log(session, username);

  return (
    <SessionContext.Provider value={{ session, id, username }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<Create />} />
          <Route path="/:id" element={<Joke />} />
          <Route path="/edit/:id" element={<Update />} />
          <Route path="/user/:username" element={<Profile />} />
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </BrowserRouter>
    </SessionContext.Provider>
  );
};

export default App;
