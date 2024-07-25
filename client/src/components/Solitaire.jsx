import { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import StartScreen from './StartScreen';

// facedown card image
import cardBack from '../../public/images/0zcardback.jpg';
// 
import xFool from '../../public/images/01fool.jpg';
import xMagician from '../../public/images/02magician.jpg';
import xHighPriestess from '../../public/images/03highpriestess.jpg';
import xEmpress from '../../public/images/04empress.jpg';
import xHierophant from '../../public/images/06hierophant.jpg';
import xLovers from '../../public/images/07lovers.jpg';
import xChariot from '../../public/images/08chariot.jpg';
import xJustice from '../../public/images/09justice.jpg';
import xHermit from '../../public/images/10hermit.jpg';
import xWheel from '../../public/images/11wheel.jpg';
import xStrength from '../../public/images/12strength.jpg';
import xHanged from '../../public/images/13hanged.jpg';
import xDeath from '../../public/images/14death.jpg';
import xTemperance from '../../public/images/15temperance.jpg';
import xDevil from '../../public/images/16devil.jpg';
import xTower from '../../public/images/17tower.jpg';
import xStar from '../../public/images/18star.jpg';
import xMoon from '../../public/images/19moon.jpg';
import xSun from '../../public/images/20sun.jpg';
import xJudgement from '../../public/images/21judgement.jpg';
import xWorld from '../../public/images/22world.jpg';





import spadeA from '../../public/images/spadeA.jpg';
import spade2 from '../../public/images/spade2.jpg';
import spade3 from '../../public/images/spade3.jpg';
import spade4 from '../../public/images/spade4.jpg';
import spade5 from '../../public/images/spade5.jpg';
import spade6 from '../../public/images/spade6.jpg';
import spade7 from '../../public/images/spade7.jpg';



// Define initial squares and boxes data
const initialCards = [
  // HEARTS 
  { id: 'card-1', suit: 'Hearts', rank: 'Ace', color: 'Red', image: xFool },
  { id: 'card-2', suit: 'Hearts', rank: '2', color: 'Red', image: xMagician },
  { id: 'card-3', suit: 'Hearts', rank: '3', color: 'Red', image: xHighPriestess },
  { id: 'card-4', suit: 'Hearts', rank: '4', color: 'Red', image: xEmpress },
  { id: 'card-5', suit: 'Hearts', rank: '5', color: 'Red', image: xHierophant },
  { id: 'card-6', suit: 'Hearts', rank: '6', color: 'Red', image: xLovers },
  { id: 'card-7', suit: 'Hearts', rank: '7', color: 'Red', image: xChariot },
  { id: 'card-8', suit: 'Hearts', rank: '8', color: 'Red', image: xJustice },
  { id: 'card-9', suit: 'Hearts', rank: '9', color: 'Red', image: xHermit },
  { id: 'card-10', suit: 'Hearts', rank: '10', color: 'Red', image: xWheel },
  { id: 'card-11', suit: 'Hearts', rank: 'Jack', color: 'Red', image: xStrength },
  { id: 'card-12', suit: 'Hearts', rank: 'Queen', color: 'Red', image: xHanged },
  { id: 'card-13', suit: 'Hearts', rank: 'King', color: 'Red', image: xDeath },

  // DIAMONDS
  { id: 'card-14', suit: 'Diamonds', rank: 'Ace', color: 'Red', image: xTemperance },
  { id: 'card-15', suit: 'Diamonds', rank: '2', color: 'Red', image: xDevil },
  { id: 'card-16', suit: 'Diamonds', rank: '3', color: 'Red', image: xTower },
  { id: 'card-17', suit: 'Diamonds', rank: '4', color: 'Red', image: xStar },
  { id: 'card-18', suit: 'Diamonds', rank: '5', color: 'Red', image: xMoon },
  { id: 'card-19', suit: 'Diamonds', rank: '6', color: 'Red', image: xSun },
  { id: 'card-20', suit: 'Diamonds', rank: '7', color: 'Red', image: xJudgement },
  { id: 'card-21', suit: 'Diamonds', rank: '8', color: 'Red', image: xWorld },

  // SPADES
  { id: 'card-40', suit: 'Spades', rank: 'Ace', color: 'Black', image: spadeA },
  { id: 'card-41', suit: 'Spades', rank: '2', color: 'Black', image: spade2 },
  { id: 'card-42', suit: 'Spades', rank: '3', color: 'Black', image: spade3 },
  { id: 'card-43', suit: 'Spades', rank: '4', color: 'Black', image: spade4 },
  { id: 'card-44', suit: 'Spades', rank: '5', color: 'Black', image: spade5 },
  { id: 'card-45', suit: 'Spades', rank: '6', color: 'Black', image: spade6 },
  { id: 'card-46', suit: 'Spades', rank: '7', color: 'Black', image: spade7 },
];

// create and initialize Foundation decks with suit id, and empty 
const initialDecks = [
  { id: 'Spades', cards: [] },
  { id: 'Diamonds', cards: [] },
  { id: 'Clubs', cards: [] },
  { id: 'Hearts', cards: [] },
  { id: 'Hearts', cards: [] },
  { id: 'Hearts', cards: [] },
];

 

// Initial tableau cards with stacks (adjust as needed)
const initialTableau = Array.from({ length: 0 }, (_, index) => ({
  id: `tableau-${index + 1}`,
  cards: [],
  faceUp: [], // Array to track faceup cards
}));

const Solitaire = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [cards, setCards] = useState(initialCards);
  const [decks, setDecks] = useState(initialDecks);
  /* for next card display */
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [tableau, setTableau] = useState(initialTableau); // State for tableau cards

    // --------- -------------------------------------------

  useEffect(() => {
    const shuffledCards = shuffleArray([...initialCards]);

    // Distribute cards between tableau and stockpile
    let tableauCopy = initialTableau.map((pile) => ({ ...pile, cards: [] }));
    let stockpile = [];

    for (let i = 0; i < tableauCopy.length; i++) {
      for (let j = 0; j <= i; j++) {
        const card = shuffledCards.shift();
        tableauCopy[i].cards.push(card);
        tableauCopy[i].faceUp.push(j === i); // Set face-up only for the top card in each pile
      }
    }
    stockpile = shuffledCards;
    setTableau(tableauCopy);
    setCards(stockpile);
  }, []);

  // Function to shuffle array (Fisher-Yates algorithm)
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  // cycling through cards in stockpile
  const nextCard = () => {
    setCurrentCardIndex((prevIndex) => (prevIndex + 1) % cards.length);
  };

  // from Start to Game
  const handleStartGame = () => {
    setGameStarted(true);
  };

// From Game to Start
const handleExitGame = () => {
  setGameStarted(false);
};

// reiterates the initial game state

const handleRestartGame = () => {
  // Reset cards
  const shuffledCards = shuffleArray([...initialCards]);
  let tableauCopy = initialTableau.map((pile) => ({ ...pile, cards: [], faceUp: pile.faceUp.map(() => false) }));
  let stockpile = [];
  for (let i = 0; i < tableauCopy.length; i++) {
    for (let j = 0; j <= i; j++) {
      const card = shuffledCards.shift();
      tableauCopy[i].cards.push(card);
      tableauCopy[i].faceUp[j] = (j === i); // Set face-up only for the top card in each pile
    }
  }
  stockpile = shuffledCards;
  setTableau(tableauCopy);
  setCards(stockpile);
  setDecks(initialDecks);
};

  //-----------------------------------(F1) drag ANY TO FOUNDATION RULES -------------------------------------------------

  // Check if the move is valid to the foundation
  const handleFoundationDrop = (source, destination, draggedCard) => {
    const targetFoundation = decks.find((deck) => deck.id === destination.droppableId);

    if (!targetFoundation) return;

    if (source.droppableId === 'revealed-cards') {
      const updatedCards = cards.filter((card) => card.id !== draggedCard.id);
      setCards(updatedCards);
    } else {
      let updatedTableau = tableau.map((pile) => ({
        ...pile,
        cards: pile.id === source.droppableId ? pile.cards.filter((_, index) => index !== source.index) : pile.cards,
      }));
      setTableau(updatedTableau);
    }

    const updatedDecks = decks.map((deck) => ({
      ...deck,
      cards: deck.id === destination.droppableId ? [...deck.cards, draggedCard] : deck.cards,
    }));

    setDecks(updatedDecks);
  };

  //----------------------------------- (T1) drag TABLEAU TO TABLEAU RULES -------------------------------------------------

  const handleTableauToTableauDrop = (source, destination) => {
    // Find indices of source and destination piles in the tableau
    const sourcePileIndex = tableau.findIndex((pile) => pile.id === source.droppableId);
    const destinationPileIndex = tableau.findIndex((pile) => pile.id === destination.droppableId);

    if (sourcePileIndex !== -1 && destinationPileIndex !== -1) {
      // Clone tableau to avoid mutating state directly
      const updatedTableau = [...tableau];
      const sourcePile = updatedTableau[sourcePileIndex];
      const destinationPile = updatedTableau[destinationPileIndex];

      // Extract dragged group of cards from source pile
      const draggedGroup = sourcePile.cards.slice(source.index);

      // Remove cards from source pile
      sourcePile.cards = sourcePile.cards.filter((_, index) => index < source.index);

      // Validate if the dragged cards can be placed on the destination pile
      const isTableauValidMove = () => {
        const topCard = destinationPile.cards.length > 0 ? destinationPile.cards[destinationPile.cards.length - 1] : null;
        const draggedCard = draggedGroup[0]; // We only validate the top card of the dragged group

        // Check if dragged card rank is valid
        const isValidRank = () => {
          const ranks = ['King', 'Queen', 'Jack', '10', '9', '8', '7', '6', '5', '4', '3', '2', 'Ace'];
          const draggedCardIndex = ranks.indexOf(draggedCard.rank);
          if (!topCard) {
            // If the pile is empty, only a King can be dropped
            return draggedCard.rank === 'King';
          } else {
            const topCardIndex = ranks.indexOf(topCard.rank);
            return draggedCardIndex === topCardIndex + 1;
          }
        };

        // Check if dragged card color is valid (opposite color)
        const isValidColor = () => {
          if (!topCard) return true; // If no top card, any color is valid
          return (topCard.color === 'Red' && draggedCard.color === 'Black') || (topCard.color === 'Black' && draggedCard.color === 'Red');
        };

        return isValidRank() && isValidColor();
      };

      if (isTableauValidMove()) {
        // Remember current faceUp state
        const currentFaceUpState = [...destinationPile.faceUp];

        // Insert cards into destination pile
        destinationPile.cards.splice(destination.index, 0, ...draggedGroup);

        // Update face-up state for all cards in the destination pile
        destinationPile.faceUp = destinationPile.cards.map((_, index) => {
          // Preserve existing face-up state if it was true before the drop
          if (index < currentFaceUpState.length && currentFaceUpState[index]) {
            return true;
          }
          // Otherwise, set face-up state for newly added cards
          return index >= destination.index;
        });

        // Log added card and new faceup state
        console.log(`Card ${draggedGroup[0].rank} of ${draggedGroup[0].suit} added to tableau ${destinationPile.id}.`);
        console.log(`New faceup state: ${destinationPile.faceUp}`);

        // Update tableau state only on valid move
        setTableau(updatedTableau);
      } else {
        // Restore cards to the source pile on invalid move
        sourcePile.cards.splice(source.index, 0, ...draggedGroup);

        // Update tableau state regardless to reflect the restored cards
        setTableau(updatedTableau);

        console.log('Invalid move: Cannot drop this card on top of the current tableau pile.');
      }
    }
  };

  // --------------------------- ON DRAG END (collective index for separate DnD functions) ------------------->

  const onDragEnd = (result) => {
    console.log('Drag result:', result); // Log the entire drag result object
    const { source, destination } = result;

    // Dropped outside the list
    if (!destination) return;

    // Retrieve the dragged card
    let draggedCard;

    if (source.droppableId === 'revealed-cards') {
      draggedCard = cards[currentCardIndex];
    } else {
      const sourcePile = tableau.find((pile) => pile.id === source.droppableId);
      draggedCard = sourcePile?.cards[source.index];
    }

    // (S1.1) DROPPING FROM STOCKPILE INTO TABLEAU -----------------------------------------

    if (source.droppableId === 'revealed-cards') {
      const updatedCards = cards.filter((card) => card.id !== draggedCard.id);
      setCards(updatedCards);

      // (T1.1) DROPPING FROM TABLEAU INTO TABLEAU -----------------------------------------

    } else if (source.droppableId.startsWith('tableau') && destination.droppableId.startsWith('tableau')) {
      handleTableauToTableauDrop(source, destination);
    }
    // (F.1) DROPPING FROM ANY INTO FOUNDATION ------------------------------------------

    handleFoundationDrop(source, destination, draggedCard);
  };

/* -------------------------- RETURN/RENDERING -----------------------------------*/

  return (
<div className="s-container">
{ !gameStarted && <StartScreen onStartGame={handleStartGame}  /> }

      {gameStarted && (
 
    <DragDropContext onDragEnd={onDragEnd}>

        {/* --------------- game exit and restart btns ----------------*/}
        <div className="button-wrapper">
  <div className="timer">Time: __:__</div>
  <div className="button-container">
    <button className="game-button restart-game" onClick={handleRestartGame}>Restart</button>
    <button className="game-button exit-game" onClick={handleExitGame}>Exit</button>
  </div>
</div>

{/* Foundation decks section ---------------------------------------------------------------------*/}

        <div className="decks">
        <div className="cards">
{/* --------------- --------------------- -----------------------*/}

        {/* Facedown stockpile section */}
        <div className="facedown-stockpile">

          {cards.slice(currentCardIndex + 1).map((card, index) => (
            <div key={card.id} className="facedown-card">
              <img src={cardBack} alt="Facedown card" />
            </div>
          ))}
        </div>

        <Droppable droppableId="revealed-cards">
            {(provided) => (
              <div className="card-list" {...provided.droppableProps} ref={provided.innerRef}>
                {currentCardIndex < cards.length && (
                  <Draggable draggableId={cards[currentCardIndex].id} index={currentCardIndex}>
                    {(dragProvided) => (
                      <div
                        className="card"
                        {...dragProvided.draggableProps}
                        {...dragProvided.dragHandleProps}
                        ref={dragProvided.innerRef}
                      >
                        <img
                          src={cards[currentCardIndex].image}
                          alt={`${cards[currentCardIndex].rank} of ${cards[currentCardIndex].suit}`}
                        />
                      </div>
                    )}
                  </Draggable>
                )}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>

{/* Visible only on final card ---------------------------------------*/}
<div className="last-card-container">
        {cards.slice(currentCardIndex + 1).length === 0 && (

            <p className="last-card-content">
              🔄
            </p>
        )}

<button className='next-card-btn' onClick={nextCard}>Next Card</button>

{/* ----------------------------------------------------------------*/}
</div>

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

        
    </DragDropContext>
 
  )}


    </div>
  );
};


export default Solitaire;