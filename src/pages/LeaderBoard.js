import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { PersonDetails } from "../components/PersonDetails";
import { supabase } from "../config/supabaseClient";

const LeaderBoard = () => {
  const [list, setList] = useState([]);
  const [fetchError, setFetchError] = useState(null);
  useEffect(() => {
    const fetchList = async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("id,username, post_count")
        .order("post_count", { ascending: false })
        .gt("post_count", 0);

      if (error) {
        setFetchError("Leaderboards not available please try later.");
      }

      if (data) {
        setList(data);
        setFetchError(null);
      }
    };
    fetchList();
  }, []);

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
      <main>
        {list && (
          <div className="flex flex-col items-center justify-center">
            <h1 className="font-bold text-3xl my-5">🏆Leaderboard🏆</h1>
            <div className="overflow-x-auto w-full px-2">
              <table className="table w-full">
                <thead>
                  <tr>
                    <th>Rank</th>
                    <th className="text">Name</th>
                    <th>Posts</th>
                  </tr>
                </thead>
                {list.map((person, rank) => (
                  <PersonDetails key={person.id} person={person} rank={rank} />
                ))}
                <tfoot>
                  <tr>
                    <th>Rank</th>
                    <th className="text">Name</th>
                    <th>Posts</th>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        )}
      </main>
    </Layout>
  );
};

export default LeaderBoard;
