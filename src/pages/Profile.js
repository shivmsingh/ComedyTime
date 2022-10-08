import { useState, useEffect, useContext } from "react";
import { supabase } from "../config/supabaseClient";
import { useParams } from "react-router-dom";
import Layout from "../components/Layout";
import JokeCard from "../components/JokeCard";
import { SessionContext } from "../App";

const Profile = () => {
  const [jokes, setJokes] = useState(null);
  const [orderBy, setOrderBy] = useState("created_at");
  const { username: user } = useParams();
  const [username, setUsername] = useState(user);
  const { id, username: check } = useContext(SessionContext);

  useEffect(() => {
    const fetchJokes = async () => {
      const { data, error } = await supabase
        .from("jokes")
        .select("*, profiles!inner(*)")
        .eq("profiles.username", user)
        .order(orderBy, { ascending: false });

      if (error) {
        setJokes(null);
      }
      if (data) {
        setJokes(data);
      }
    };
    fetchJokes();
  }, [orderBy, user]);

  const handleDelete = (id) => {
    setJokes((prevJokes) => {
      return prevJokes.filter((jk) => jk.id !== id);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase
      .from("profiles")
      .update({ username: username })
      .eq("id", id)
      .select("username");

    if (error) {
      console.log(error);
    }

    if (data) {
      console.log(data);
    }
  };

  return (
    <Layout>
      {jokes && (
        <main>
          <h1 className="font-bold text-3xl my-10">
            <span className="text-accent">{user}</span>'s Jokes
          </h1>
          {check === user && (
            <form
              onSubmit={(e) => handleSubmit(e)}
              className="flex flex-col items-end justify-end"
            >
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-lg">Change Username: </span>
                </label>
                <div className="input-group sm:mx-3">
                  <input
                    type="text"
                    placeholder="username"
                    value={username}
                    className="input input-bordered"
                    onChange={(e) => {
                      setUsername(e.target.value);
                    }}
                  />
                  <a href="https://comedytime.netlify.app/">
                    <button className="btn btn-secondary">Go</button>
                  </a>
                </div>
              </div>
            </form>
          )}

          <div className="flex flex-col items-center justify-center">
            <h2 className="text-xl font-bold py-3">Order By:</h2>
            <div className="btn-group">
              <button
                className="btn btn-sm md:btn-md"
                onClick={() => setOrderBy("created_at")}
              >
                Time Created
              </button>
              <button
                className="btn btn-sm md:btn-md"
                onClick={() => setOrderBy("title")}
              >
                Title
              </button>
              <button
                className="btn btn-sm md:btn-md"
                onClick={() => setOrderBy("category")}
              >
                Category
              </button>
            </div>
          </div>
          <div className="flex flex-wrap">
            {jokes.map((joke) => (
              <div className="lg:w-1/3 md:w-1/2 w-full flex flex-col p-5">
                <JokeCard
                  key={joke.id}
                  joke={joke}
                  onDelete={handleDelete}
                  displayControls={true}
                />
              </div>
            ))}
          </div>
        </main>
      )}
    </Layout>
  );
};

export default Profile;
