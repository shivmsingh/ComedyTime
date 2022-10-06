import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import JokeCard from "../components/JokeCard";
import Layout from "../components/Layout";
import { supabase } from "../config/supabaseClient";

const Joke = () => {
  const [joke, setJoke] = useState(null);
  const [relatedJokes, setRelatedJokes] = useState(null);
  const [relatedJokesUser, setRelatedJokesUser] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchJoke = async () => {
      const { data, error } = await supabase
        .from("jokes")
        .select(
          `*,
        profiles(
          username
        )`
        )
        .match({ id: id })
        .single();

      if (error) {
        throw error;
      }

      if (data) {
        setJoke(data);
      }
    };
    fetchJoke();
  }, [id]);

  useEffect(() => {
    const fetchRelatedJokes = async () => {
      const { data, error } = await supabase
        .from("jokes")
        .select(
          `*,
        profiles(
          username
        )`
        )
        .match({ category: joke.category })
        .limit(3);

      if (error) {
        throw error;
      }

      if (data) {
        setRelatedJokes(data);
      }
    };
    fetchRelatedJokes();

    const fetchRelatedJokesUser = async () => {
      const { data, error } = await supabase
        .from("jokes")
        .select(
          `*,
        profiles(
          username
        )`
        )
        .match({ user_id: joke.user_id })
        .limit(3);

      if (error) {
        throw error;
      }

      if (data) {
        setRelatedJokesUser(data);
      }
    };
    fetchRelatedJokesUser();
  }, [joke]);

  return (
    <Layout>
      {joke && (
        <main className="my-5 px-5">
          <div className="card bg-base-300 shadow-xl">
            <div className="card-body">
              <div className="flex justify-between py-2">
                <h2 className="card-title font-bold text-4xl leading-10 tracking-wide">
                  {joke.title}
                </h2>
              </div>
              <p className="py-2 text-3xl leading-10 ">{joke.description}</p>
              <div className="flex justify-between">
                <div className="badge badge-accent p-4 badge-outline text-lg">
                  {joke.category}
                </div>
                <h3 className="text-xl">~{joke?.profiles?.username}</h3>
              </div>
            </div>
          </div>
          <h2 className="font-bold text-3xl my-10">
            More jokes on <span className="text-accent">{joke.category}</span>
          </h2>
          <div className="flex flex-wrap">
            {relatedJokes?.map((joke) => (
              <div className="lg:w-1/3 md:w-1/2 w-full flex flex-col p-5">
                <JokeCard key={joke.id} joke={joke} displayControls={false} />
              </div>
            ))}
          </div>
          <h2 className="font-bold text-3xl my-10">
            More jokes by{" "}
            <span className="text-accent">{joke?.profiles?.username}</span>
          </h2>
          <div className="flex flex-wrap">
            {relatedJokesUser?.map((joke) => (
              <div className="lg:w-1/3 md:w-1/2 w-full flex flex-col p-5">
                <JokeCard key={joke.id} joke={joke} displayControls={false} />
              </div>
            ))}
          </div>
        </main>
      )}
    </Layout>
  );
};

export default Joke;
