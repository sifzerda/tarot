import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import '../App';

const Profile = () => {
    const { loading, data, error } = useQuery(QUERY_ME);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const user = data?.me;
    const solScores = user?.solScore || [];

    // Sort scores by least time taken 
    const sortedScores = [...solScores].sort((a, b) => {
            return a.mineTimeTaken - b.mineTimeTaken; // Sort by time ascending
    });

    // Limit to 10 scores
    const limitedScores = sortedScores.slice(0, 10);

    return (
        <div className="profile-container">
            <div className="jumbo-bg-dark">
                <h1 className='jumbo-bg-dark-text'>{user.username}'s Profile</h1>
            </div>
            <p className='black-text'>Email: {user.email}</p>
            <p className="email-info">Note: Your email cannot be seen by other users</p>
            <h2 className='profile-text'>Your Solitaire Highscores:</h2>
            
            {limitedScores.length === 0 ? (
                <p className="black-text">No high scores yet!</p>
            ) : (
                <table className="high-scores-table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Time (in Seconds)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {limitedScores.map((score, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{score.solTimeTaken}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default Profile;