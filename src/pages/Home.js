import { supabase } from "../config/supabaseClient";
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
        .from("jokes")
        .select(
          `*,
        profiles(
          username
        )`
        )
        .order(orderBy, { ascending: false });

      if (error) {
        setFetchError("Could not fetch the required joke!");
        setJokes(null);
        console.log(error);
      }

      if (data) {
        setJokes(data);
        console.log(data[0].profiles.username);
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

export default Home;
