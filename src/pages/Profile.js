import { useState, useEffect, useContext } from "react";
import { supabase } from "../config/supabaseClient";
import { useParams } from "react-router-dom";
import Layout from "../components/Layout";
import JokeCard from "../components/JokeCard";
import { SessionContext } from "../App";

const Profile = () => {
  const [jokes, setJokes] = useState(null);
  const [fetchError, setFetchError] = useState(null);
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
        setFetchError("Server Error!");
        setJokes(null);
      }
      if (data) {
        setJokes(data);
        setFetchError(null);
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
    if (!username) {
      setFetchError("The username field cant be blank!");
      return;
    }
    const { data, error } = await supabase
      .from("profiles")
      .update({ username: username })
      .eq("id", id)
      .select("username");

    if (error) {
      setFetchError("Server Error!");
    }

    if (data) {
      setFetchError(null);
      window.location.href = "https://comedytime.netlify.app/";
    }
  };

  return (
    <Layout>
      {fetchError && (
        <div className="alert alert-error shadow-lg">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current flex-shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{fetchError}</span>
          </div>
        </div>
      )}
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
                  <button className="btn btn-secondary">Go</button>
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
              <div
                key={joke.id}
                className="lg:w-1/3 md:w-1/2 w-full flex flex-col p-5"
              >
                <JokeCard
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
