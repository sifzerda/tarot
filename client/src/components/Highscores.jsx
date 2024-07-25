import '../App.css';  
import { useQuery } from '@apollo/client';
import { QUERY_USERS } from '../utils/queries';

const Highscores = () => {
  const { loading, data, error } = useQuery(QUERY_USERS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const users = data.users; // Extracting users from query data

  // Aggregate all mineScore entries with associated usernames
  let allScores = [];
  users.forEach(user => {
    user.solScore.forEach(score => {
      allScores.push({
        username: user.username,
        solTimeTaken: score.solTimeTaken,
      });
    });
  });

  // Sort combined scores by minePoints in descending order
  // If points are the same, then sort by mineTimeTaken in ascending order
  allScores.sort((a, b) => {
      return a.solTimeTaken - b.solTimeTaken; // Sort by time ascending if points are tied
});

// Limit to top 20 scores
const top20Scores = allScores.slice(0, 20);

return (
  <div className="grid-container">
    <h1 className='end'>High scores </h1>
    <p className='yellow'>★ ★ ★ ★</p>
    <table className="high-scores-table">
      <thead>
        <tr>
          <th>#</th>
          <th>Seconds</th>
          <th>Username</th>
        </tr>
      </thead>
      <tbody>
        {top20Scores.map((score, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{score.solTimeTaken}</td>
            <td>{score.username}</td>
          </tr>
        ))}
      </tbody>
    </table>

<div className="button-container-2">
        <button className="p-btn-2" onClick={() => window.location.reload()}>⏪ Back</button>
        </div>

      </div>
    );
  };
  
  export default Highscores;