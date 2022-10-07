import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { PersonDetails } from "../components/PersonDetails";
import { supabase } from "../config/supabaseClient";

const LeaderBoard = () => {
  const [list, setList] = useState([]);
  useEffect(() => {
    const fetchList = async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("id,username, post_count")
        .order("post_count", { ascending: false })
        .gt("post_count", 0);

      if (error) {
        console.log(error);
      }

      if (data) {
        setList(data);
        console.log(data);
      }
    };
    fetchList();
  }, []);

  return (
    <Layout>
      <main>
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
      </main>
    </Layout>
  );
};

export default LeaderBoard;
