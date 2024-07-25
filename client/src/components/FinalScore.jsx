import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import Auth from '../utils/auth';
import { QUERY_ME } from '../utils/queries';
import { SAVE_SOL_SCORE } from '../utils/mutations'
import '../App.css';

const FinalScore = ({ time, onHighScores }) => {
  //const [solPoints, setSolPoints] = useState(score);
  const [solTimeTaken, setSolTimeTaken] = useState(time);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const { data } = useQuery(QUERY_ME);
  const userId = data?.me?._id;
  const username = data?.me?.username || 'Anonymous';

  const [saveSolScore, { loading: savingScore }] = useMutation(SAVE_SOL_SCORE);

  const handleSubmit = async () => {
    try {
      console.log('Submitting score with userId:', userId);
      console.log('Submitting score with solTimeTaken:', solTimeTaken);

      const { data } = await saveSolScore({
        variables: {
          userId,
          solTimeTaken,
        },
      });

      console.log('Score saved:', data.saveSolScore);
      setShowSuccessMessage(true);
    } catch (error) {
      console.error('Error saving score:', error);
      alert('There was an error saving your score');
    }
  };
  
    return (
        <div className="grid-container">
          <h1 className='start'>Congratulations</h1>

          <p>♢ ♢ ♢ ♢ </p>
 
          <p className='black-text'>Time taken: <span className='red'>{time} seconds</span></p>
    
          {/* Conditional rendering based on success message state */}
      {showSuccessMessage ? (
        <p className="success"> ☆ Your score has been submitted ☆ </p>
      ) : (
          Auth.loggedIn() ? (
            <button className="submit-button-s" onClick={handleSubmit} disabled={savingScore}>
              {savingScore ? 'Submitting...' : 'Submit Score'}
            </button>
          ) : (
            <p className='black-text'>
              You must <Link to="/login">LOG IN</Link> or <Link to="/signup">SIGNUP</Link> to Submit a Score.
            </p>
          )
      )}

      <button className="submit-button-h" onClick={onHighScores}>
        High Scores
      </button>

      <button className="submit-button-p" onClick={() => window.location.reload()}>
        Play Again
      </button>
    </div>
  );
};

export default FinalScore;