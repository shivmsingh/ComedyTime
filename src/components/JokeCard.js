import { Link } from "react-router-dom";
import supabase from "../config/supabaseClient";

const JokeCard = ({ joke, onDelete }) => {
  const handleDelete = async () => {
    const { data, error } = await supabase
      .from("Jokes")
      .delete()
      .eq("id", joke.id);

    if (error) {
      console.log(error);
    }

    if (data) {
      console.log(data);
      onDelete(joke.id);
    }
  };

  return (
    <div className="card bg-base-300 shadow-xl">
      <div className="card-body">
        <div className="flex justify-between py-2">
          <h2 className="card-title font-bold text-2xl">{joke.title}</h2>
          <button className="btn btn-circle btn-outline btn-primary btn-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-suit-heart-fill"
              viewBox="0 0 16 16"
            >
              <path d="M4 1c2.21 0 4 1.755 4 3.92C8 2.755 9.79 1 12 1s4 1.755 4 3.92c0 3.263-3.234 4.414-7.608 9.608a.513.513 0 0 1-.784 0C3.234 9.334 0 8.183 0 4.92 0 2.755 1.79 1 4 1z" />
            </svg>
          </button>
        </div>
        <p className="py-2">{joke.description}</p>
        <div className="flex justify-between">
          <div className="badge badge-accent p-3 badge-outline">
            {joke.category}
          </div>
          <h3>~{joke.name}</h3>
        </div>
        <div className="card-actions justify-end">
          <Link to={"/" + joke.id}>
            <button className="btn btn-circle btn-outline btn-primary btn-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-pencil"
                viewBox="0 0 16 16"
              >
                <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
              </svg>
            </button>
          </Link>
          <button
            className="btn btn-circle btn-outline btn-primary btn-sm"
            onClick={handleDelete}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default JokeCard;
