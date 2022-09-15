import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import supabase from "../config/supabaseClient";
import Layout from "../components/Layout";

const Update = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [category, setCategory] = useState("kids");
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description || !name) {
      setFormError("Please fill all the fields correctly");
      return;
    }

    const { data, error } = await supabase
      .from("Jokes")
      .update([{ title, description, name, category }])
      .eq("id", id);

    if (error) {
      setFormError("Please fill all the fields correctly");
    }

    if (data) {
      setFormError(null);
      navigate("/");
    }
  };

  useEffect(() => {
    const fetchJoke = async () => {
      const { data, error } = await supabase
        .from("Jokes")
        .select()
        .eq("id", id)
        .single();

      if (error) {
        navigate("/", { replace: true });
      }

      if (data) {
        setTitle(data.title);
        setDescription(data.description);
        setName(data.name);
        setCategory(data.category);
      }
    };
    fetchJoke();
  }, [id, navigate]);

  return (
    <Layout>
      <main className="max-w-2xl mx-auto">
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
            <option value="kids">Kids</option>
            <option value="dark">Dark</option>
            <option value="pun">Pun</option>
            <option value="programming">Programming</option>
          </select>
          <label className="label">
            <span className="label-text text-lg">Name</span>
          </label>
          <input
            type="text"
            id="name"
            value={name}
            className="input input-bordered input-primary w-full"
            onChange={(e) => setName(e.target.value)}
          />
          <button className="btn btn-primary my-5">Update Joke</button>
        </form>
      </main>
    </Layout>
  );
};

export default Update;
