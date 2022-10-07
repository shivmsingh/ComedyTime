import React from "react";
import { Link } from "react-router-dom";

export const PersonDetails = ({ person, rank }) => {
  function getAward(rank) {
    if (rank === 0) {
      return "👑";
    } else if (rank === 1) {
      return "🔥";
    } else if (rank === 2) {
      return "🎉";
    } else {
      return;
    }
  }
  return (
    <tbody>
      <tr>
        <td>{rank + 1} </td>
        <td>
          <div className="font-bold">
            <Link to={`/user/${person.username}`}>
              {person.username}
              {getAward(rank)}
            </Link>
          </div>
        </td>
        <td>{person.post_count}</td>
      </tr>
    </tbody>
  );
};
