import supabase from "../config/supabaseClient";
import { useState, useEffect } from "react";
import JokeCard from "../components/JokeCard";
import Layout from "../components/Layout";

const Home = () => {
  const [fetchError, setFetchError] = useState(null);
  const [jokes, setJokes] = useState(null);
  const [orderBy, setOrderBy] = useState("created_at");

  const handleDelete = (id) => {
    setJokes((prevJokes) => {
      return prevJokes.filter((jk) => jk.id !== id);
    });
  };

  useEffect(() => {
    const fetchJokes = async () => {
      const { data, error } = await supabase
        .from("Jokes")
        .select()
        .order(orderBy, { ascending: false });

      if (error) {
        setFetchError("Could not fetch the required joke!");
        setJokes(null);
        console.log(error);
      }

      if (data) {
        setJokes(data);
        setFetchError(null);
      }
    };

    fetchJokes();
  }, [orderBy]);
  return (
    <Layout>
      {fetchError && <p>{fetchError}</p>}
      {jokes && (
        <main>
          <div className="flex">
            <h2 className="px-3">Order By:</h2>
            <div className="btn-group">
              <button
                className="btn btn-sm"
                onClick={() => setOrderBy("created_at")}
              >
                Time Created
              </button>
              <button
                className="btn btn-sm"
                onClick={() => setOrderBy("title")}
              >
                Title
              </button>
              <button
                className="btn btn-sm"
                onClick={() => setOrderBy("category")}
              >
                Category
              </button>
            </div>
          </div>
          <div className="flex flex-wrap">
            {jokes.map((joke) => (
              <div className="lg:w-1/3 md:w-1/2 flex flex-col p-5">
                <JokeCard key={joke.id} joke={joke} onDelete={handleDelete} />
              </div>
            ))}
          </div>
        </main>
      )}
    </Layout>
  );
};

export default Home;
