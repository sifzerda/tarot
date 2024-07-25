import { useState, useEffect } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import StartScreen from './StartScreen';
import Highscores from './Highscores';
import FinalScore from './FinalScore';
// facedown card image
import cardBack from '../../public/images/cardBack.jpg';


const Solitaire = () => {
  const [gameStarted, setGameStarted] = useState(false);
  /* for next card display */
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [viewHighscores, setViewHighscores] = useState(false);
  const [timeInSeconds, setTimeInSeconds] = useState(0);
  const [timerActive, setTimerActive] = useState(false);

  const [showFinalScore, setShowFinalScore] = useState(false);


    // Timer logic -------------------------------------------
    useEffect(() => {
      let interval;
  
      if (timerActive) {
        interval = setInterval(() => {
          setTimeInSeconds((prevTime) => prevTime + 1);
        }, 1000);
      } else {
        clearInterval(interval);
      }
  
      return () => clearInterval(interval);
    }, [timerActive]);
  
    // Reset timer when game starts or restarts
    useEffect(() => {
      if (gameStarted) {
        setTimeInSeconds(0);
        setTimerActive(true);
      } else {
        setTimerActive(false);
      }
    }, [gameStarted]);

    // --------- -------------------------------------------

  // from Start to Game
  const handleStartGame = () => {
    setGameStarted(true);
  };

// From Game to Start
const handleExitGame = () => {
  setGameStarted(false);
};

  // from Start to Highscores
  const handleHighscores = () => {
    setViewHighscores(true);
  };

  // from Start to FinalScore
  const handleFinalScore = () => {
    setShowFinalScore(true);
  };










/* -------------------------- check if game won -----------------------------------*/

  // Button click handler to trigger checkGameWon

  const simulateGameWon = () => {
    setTimerActive(false);
    alert (`You won! Time taken: ${formatTime} seconds`);
    setShowFinalScore(true); // Simulate winning the game
  };

/* -------------------------- check if game won -----------------------------------*/
// Helper function to format time in MM:SS format
const formatTime = (timeInSeconds) => {
  const minutes = Math.floor(timeInSeconds / 60).toString().padStart(2, '0');
  const seconds = (timeInSeconds % 60).toString().padStart(2, '0');
  return `${minutes}:${seconds}`;
};

if (viewHighscores) {
  return <Highscores />;
}

if (showFinalScore) {
  return <FinalScore time={formatTime(timeInSeconds)}/>;
}

/* -------------------------- RETURN/RENDERING -----------------------------------*/

  return (
<div className='solitaire-box'>
{ !gameStarted && <StartScreen onStartGame={handleStartGame} onHighScores={handleHighscores}  onFinalScore={handleFinalScore}  /> }

      {gameStarted && (
        <div className='main-game-container'>

{/* --------------- game exit and restart btns ----------------*/}
        <div className="button-wrapper">
     
        <button className="game-button exit-game" onClick={handleExitGame}>Exit</button>
        <button className="game-button win-game" onClick={simulateGameWon}>Win Game</button>
      </div>

      <div className="timer">{formatTime(timeInSeconds)}</div>
 
{/* --------------- --------------------- -----------------------*/}

    <DragDropContext onDragEnd={onDragEnd}>
      <div className="s-container">

        {/* Facedown stockpile section */}
        <div className="facedown-stockpile">

          {cards.slice(currentCardIndex + 1).map((card, index) => (
            <div key={card.id} className="facedown-card">
              <img src={cardBack} alt="Facedown card" />
            </div>
          ))}
        </div>

{/* Visible only on final card ---------------------------------------*/}

        {cards.slice(currentCardIndex + 1).length === 0 && (
          <div className="last-card-container">
            <div className="last-card-content">
              <img className='refresh' src="https://img.icons8.com/matisse/100/rotate.png" alt="rotate" />
            </div>
          </div>
        )}

{/* ------------------------------------------------------------------ */}



{/* Foundation decks section ---------------------------------------------------------------------*/}

        <div className="decks">
          <div className="foundation-decks">
            {decks.map((deck) => (
              <div key={deck.id} className="foundation-deck">
                <Droppable droppableId={deck.id}>
                  {(provided, snapshot) => (
                    <div
                      className={`deck-content ${snapshot.isDraggingOver ? 'dragging-over' : ''}`}
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                    >
                      {deck.cards.length === 0 ? (
                        <div
                          className={`empty-deck-emoji ${deck.id === 'Hearts' || deck.id === 'Diamonds' ? 'emoji-red' : 'emoji-blue'
                            }`}
                        >
                          {suitEmojis[deck.id]}
                        </div>
                      ) : (
                        deck.cards.map((card, index) => (
                          <div key={card.id} className="card-in-deck">
                            <img src={card.image} alt={`${card.rank} of ${card.suit}`} />
                          </div>
                        ))
                      )}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            ))}
          </div>
        </div>

        <div className="card-navigation">
          <button className='next-card-btn' onClick={nextCard}>Next Card</button>
        </div>
        

      </div>
    </DragDropContext>
    </div>
  )}


    </div>
  );
};

export default Solitaire;