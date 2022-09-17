import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../config/supabaseClient";
import { SessionContext } from "../App";
import Layout from "../components/Layout";

const Update = () => {
  const { session, username } = useContext(SessionContext);
  const navigate = useNavigate();
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("kids");
  const [userId, setUserId] = useState(null);
  const [formError, setFormError] = useState(null);

  useEffect(() => {
    const fetchJoke = async () => {
      const { data, error } = await supabase
        .from("jokes")
        .select()
        .match({ id: id })
        .single();

      if (error) {
        navigate("/", { replace: true });
      }

      if (data) {
        setTitle(data.title);
        setDescription(data.description);
        setCategory(data.category);
        setUserId(data.user_id);
      }
    };
    fetchJoke();
  }, [id, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (session) {
      if (!title || !description) {
        setFormError("Please fill all the fields correctly");
        return;
      }

      const { data, error } = await supabase
        .from("jokes")
        .update({
          title,
          description,
          name: username,
          category,
          user_id: session.user.id,
        })
        .match({ id: id })
        .select();

      if (error) {
        setFormError("Server Error! Please contact the administrator.");
      }

      if (data) {
        setFormError(null);
        navigate("/");
      }
    }
  };

  return (
    <Layout>
      <main className="max-w-2xl mx-auto px-5">
        <h1 className="text-4xl font-extrabold py-5">Update joke!</h1>
        <form onSubmit={handleSubmit} className="flex flex-col">
          {formError && (
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
                <span>{formError}</span>
              </div>
            </div>
          )}
          <label className="label">
            <span className="label-text text-lg">Title</span>
          </label>
          <input
            type="text"
            id="title"
            value={title}
            className="input input-bordered input-primary w-full"
            onChange={(e) => setTitle(e.target.value)}
          />
          <label className="label">
            <span className="label-text text-lg">Description</span>
          </label>
          <textarea
            className="textarea textarea-primary"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          <label className="label">
            <span className="label-text text-lg">Category</span>
          </label>
          <select
            className="select select-primary w-full"
            name="category"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="programming">Programming</option>
            <option value="science">Science</option>
            <option value="food">Food</option>
            <option value="sports">Sports</option>
            <option value="gaming">Gaming</option>
            <option value="animal">Animal</option>
            <option value="school">School</option>
          </select>
          {session?.user.id === userId ? (
            <button className="btn btn-primary my-5">Update Joke</button>
          ) : (
            <button className="btn btn-primary my-5" disabled="disabled">
              You do not have the permission to edit this
            </button>
          )}
        </form>
      </main>
    </Layout>
  );
};

export default Update;
