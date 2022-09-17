import { useState, useEffect } from "react";
import { supabase } from "../config/supabaseClient";
import { useParams } from "react-router-dom";
import Layout from "../components/Layout";
import JokeCard from "../components/JokeCard";

const Profile = () => {
  const [jokes, setJokes] = useState(null);
  const [orderBy, setOrderBy] = useState("created_at");
  const { username: user } = useParams();

  useEffect(() => {
    const fetchJokes = async () => {
      const { data, error } = await supabase
        .from("jokes")
        .select()
        .order(orderBy, { ascending: false })
        .match({ name: user });
      if (error) {
        setJokes(null);
      }
      if (data) {
        setJokes(data);
      }
    };
    fetchJokes();
  }, [orderBy, user]);

  console.log(jokes);

  const handleDelete = (id) => {
    setJokes((prevJokes) => {
      return prevJokes.filter((jk) => jk.id !== id);
    });
  };

  return (
    <Layout>
      {jokes && (
        <main>
          <h1 className="font-bold text-3xl my-10">
            <span className="text-accent">{user}</span>'s Jokes
          </h1>
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
