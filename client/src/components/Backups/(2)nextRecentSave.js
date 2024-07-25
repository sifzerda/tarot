// // this allows:
// + dnd from stockpile to foundation
// + dnd from tableau to foundation
// NO tableau to tableau
// + stockpile to tableau
// no solitaire rules ?

import { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

// Define initial squares and boxes data
const initialCards = [
  // HEARTS 
  { id: 'card-1', suit: 'Hearts', rank: 'Ace', color: 'Red' },
  { id: 'card-2', suit: 'Hearts', rank: '2', color: 'Red' },
  { id: 'card-3', suit: 'Hearts', rank: '3', color: 'Red' },
  { id: 'card-4', suit: 'Hearts', rank: '4', color: 'Red' },
  { id: 'card-5', suit: 'Hearts', rank: '5', color: 'Red' },
  { id: 'card-6', suit: 'Hearts', rank: '6', color: 'Red' },
  { id: 'card-7', suit: 'Hearts', rank: '7', color: 'Red' },
  { id: 'card-8', suit: 'Hearts', rank: '8', color: 'Red' },
  { id: 'card-9', suit: 'Hearts', rank: '9', color: 'Red' },
  { id: 'card-10', suit: 'Hearts', rank: '10', color: 'Red' },
  { id: 'card-11', suit: 'Hearts', rank: 'Jack', color: 'Red' },
  { id: 'card-12', suit: 'Hearts', rank: 'Queen', color: 'Red' },
  { id: 'card-13', suit: 'Hearts', rank: 'King', color: 'Red' },

  // DIAMONDS
  { id: 'card-14', suit: 'Diamonds', rank: 'Ace', color: 'Red' },
  { id: 'card-15', suit: 'Diamonds', rank: '2', color: 'Red' },
  { id: 'card-16', suit: 'Diamonds', rank: '3', color: 'Red' },
  { id: 'card-17', suit: 'Diamonds', rank: '4', color: 'Red' },
  { id: 'card-18', suit: 'Diamonds', rank: '5', color: 'Red' },
  { id: 'card-19', suit: 'Diamonds', rank: '6', color: 'Red' },
  { id: 'card-20', suit: 'Diamonds', rank: '7', color: 'Red' },
  { id: 'card-21', suit: 'Diamonds', rank: '8', color: 'Red' },
  { id: 'card-22', suit: 'Diamonds', rank: '9', color: 'Red' },
  { id: 'card-23', suit: 'Diamonds', rank: '10', color: 'Red' },
  { id: 'card-24', suit: 'Diamonds', rank: 'Jack', color: 'Red' },
  { id: 'card-25', suit: 'Diamonds', rank: 'Queen', color: 'Red' },
  { id: 'card-26', suit: 'Diamonds', rank: 'King', color: 'Red' },

  // CLUBS
  { id: 'card-27', suit: 'Clubs', rank: 'Ace', color: 'Black' },
  { id: 'card-28', suit: 'Clubs', rank: '2', color: 'Black' },
  { id: 'card-29', suit: 'Clubs', rank: '3', color: 'Black' },
  { id: 'card-30', suit: 'Clubs', rank: '4', color: 'Black' },
  { id: 'card-31', suit: 'Clubs', rank: '5', color: 'Black' },
  { id: 'card-32', suit: 'Clubs', rank: '6', color: 'Black' },
  { id: 'card-33', suit: 'Clubs', rank: '7', color: 'Black' },
  { id: 'card-34', suit: 'Clubs', rank: '8', color: 'Black' },
  { id: 'card-35', suit: 'Clubs', rank: '9', color: 'Black' },
  { id: 'card-36', suit: 'Clubs', rank: '10', color: 'Black' },
  { id: 'card-37', suit: 'Clubs', rank: 'Jack', color: 'Black' },
  { id: 'card-38', suit: 'Clubs', rank: 'Queen', color: 'Black' },
  { id: 'card-39', suit: 'Clubs', rank: 'King', color: 'Black' },

  // SPADES
  { id: 'card-40', suit: 'Spades', rank: 'Ace', color: 'Black' },
  { id: 'card-41', suit: 'Spades', rank: '2', color: 'Black' },
  { id: 'card-42', suit: 'Spades', rank: '3', color: 'Black' },
  { id: 'card-43', suit: 'Spades', rank: '4', color: 'Black' },
  { id: 'card-44', suit: 'Spades', rank: '5', color: 'Black' },
  { id: 'card-45', suit: 'Spades', rank: '6', color: 'Black' },
  { id: 'card-46', suit: 'Spades', rank: '7', color: 'Black' },
  { id: 'card-47', suit: 'Spades', rank: '8', color: 'Black' },
  { id: 'card-48', suit: 'Spades', rank: '9', color: 'Black' },
  { id: 'card-49', suit: 'Spades', rank: '10', color: 'Black' },
  { id: 'card-50', suit: 'Spades', rank: 'Jack', color: 'Black' },
  { id: 'card-51', suit: 'Spades', rank: 'Queen', color: 'Black' },
  { id: 'card-52', suit: 'Spades', rank: 'King', color: 'Black' },
];

// create and initialize Foundation decks with suit id, and empty 
const initialDecks = [
  { id: 'Hearts', cards: [] }, 
  { id: 'Diamonds', cards: [] },
  { id: 'Clubs', cards: [] },
  { id: 'Spades', cards: [] },
];

// Emoji on empty foundation decks
const suitEmojis = {
  Hearts: '♡',
  Diamonds: '♢',
  Clubs: '♧',
  Spades: '♤',
};

// Initial tableau cards with stacks (adjust as needed)
const initialTableau = Array.from({ length: 7 }, (_, index) => ({
    id: tableau-${index + 1},
    cards: [],
  }));

const Solitaire = () => {
  const [cards, setCards] = useState(initialCards);
  const [decks, setDecks] = useState(initialDecks);
  /* for next card display */
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [tableau, setTableau] = useState(initialTableau); // State for tableau cards

  useEffect(() => {
    const shuffledCards = shuffleArray([...initialCards]);

    // Distribute cards between tableau and stockpile
    let tableauCopy = initialTableau.map((pile) => ({ ...pile, cards: [] }));
    let stockpile = [];

    for (let i = 0; i < tableauCopy.length; i++) {
      for (let j = 0; j <= i; j++) {
        tableauCopy[i].cards.push(shuffledCards.shift());
      }
    }

    stockpile = shuffledCards;

    setTableau(tableauCopy);
    setCards(stockpile);
  }, []);

// Empty dependency array ensures this runs only once on component mount

 // Function to shuffle array (Fisher-Yates algorithm)
 const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const nextCard = () => {
    setCurrentCardIndex((prevIndex) => (prevIndex + 1) % cards.length);
  };

  // ON DRAG END ------------------------------------------------------>
  // onDragEnd = logic for dropping cards into foundation decks
  const onDragEnd = (result) => {
    const { source, destination } = result;
  
    // Dropped outside the list
    if (!destination) {
      return;
    }
    
  // Retrieve the dragged card
  let draggedCard;

  if (source.droppableId === 'revealed-cards') {
    draggedCard = cards[currentCardIndex];
  } else {
    const sourcePile = tableau.find((pile) => pile.id === source.droppableId);
    draggedCard = sourcePile?.cards[source.index];
  }
//--------------------------DROPPING FROM STOCKPILE INTO TABLEAU-----------------------------------------

if (source.droppableId === 'revealed-cards') {
  const updatedCards = cards.filter((card) => card.id !== draggedCard.id);
  setCards(updatedCards);

  if (destination.droppableId.startsWith('tableau')) {
    const targetPileId = destination.droppableId;
    const updatedTableau = tableau.map((pile) => {
      if (pile.id === targetPileId) {
        return {
          ...pile,
          cards: [...pile.cards, draggedCard],
        };
      }
      return pile;
    });
    setTableau(updatedTableau);
  }
} else {
 // Handle drag from tableau if needed  
}

//-------------------------------------------------------------------------

    // Check if the move is valid to the foundation
    const targetFoundation = decks.find((deck) => deck.id === destination.droppableId);
    const isMoveValid = isMoveAllowed(draggedCard, targetFoundation);
  
    if (!isMoveValid) {
        // Invalid move, return card to its original position
        return;
      }

  // Remove dragged card from its original location
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

    // ------------- (+) FOUNDATION ARE (-) FROM OTHER DECKS --------------->
// check card rank/suit was added to foundation and remove it from stockpile and tableau

  // Update Stockpile: remove dropped card from stockpile
  const updatedCards = cards.filter((card) => card.id !== draggedCard.id);
  setCards(updatedCards);

  // Update Foundations state: add dropped card to foundation decks 
  // Add dragged card to the foundation deck
  const updatedDecks = decks.map((deck) => ({
    ...deck,
    cards: deck.id === destination.droppableId ? [...deck.cards, draggedCard] : deck.cards,
  }));

  setDecks(updatedDecks);
};

// Function to validate if card can be moved to foundation
const isMoveAllowed = (card, foundationDeck) => {
    if (foundationDeck.cards.length === 0) {
      // Only Ace can be placed on an empty foundation
      return card.rank === 'Ace' && card.suit === foundationDeck.id;
    } else {
      const lastCard = foundationDeck.cards[foundationDeck.cards.length - 1];
      // Allow rank 2 of the same suit to be placed on Ace
      if (lastCard.rank === 'Ace' && card.rank === '2' && card.suit === foundationDeck.id) {
        return true;
      }
      // Check if ranks are in ascending order and same suit
      if (card.suit === foundationDeck.id && getNextRank(lastCard.rank) === card.rank) {
        return true;
      }
  
      // Allow cards to drop in sequence using parseInt
      const lastRankInt = parseInt(lastCard.rank, 10); // Parse the rank of the last card as an integer
      const currentRankInt = parseInt(card.rank, 10); // Parse the rank of the current card as an integer
  
      if (!isNaN(lastRankInt) && !isNaN(currentRankInt) && currentRankInt === lastRankInt + 1 && card.suit === foundationDeck.id) {
        return true;
      }
  
      return false;
    }
  };

  // Function to get the next rank in sequence
const getNextRank = (rank) => {
    const ranks = ['Ace', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King'];
    const currentIndex = ranks.indexOf(rank);
    return ranks[currentIndex + 1];
  };

/* -------------------------------------------------------------*/

return (
<DragDropContext onDragEnd={onDragEnd}>
      <div className="s-container">
        {/* Stockpile Cards section */}
        <div className="cards">
          <h2>Stockpile</h2>
          <div className="card-navigation">
            <button onClick={nextCard}>Next Card</button>
          </div>
          <Droppable droppableId="revealed-cards">
            {(provided) => (
              <div className="card-list" {...provided.droppableProps} ref={provided.innerRef}>
                {currentCardIndex < cards.length && (
                  <Draggable draggableId={cards[currentCardIndex].id} index={currentCardIndex}>
                    {(provided) => (
                      <div
                        className="card"
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                      >
                        {cards[currentCardIndex].rank} of {cards[currentCardIndex].suit} - ({cards[currentCardIndex].color})
                      </div>
                    )}
                  </Draggable>
                )}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>

         {/* Foundation decks section */}
         <div className="decks">
          <h2>Foundations</h2>
          <div className="foundation-decks">
            {decks.map((deck) => (
              <div key={deck.id} className="foundation-deck">
                <Droppable droppableId={deck.id}>
                  {(provided, snapshot) => (
                    <div
                      className={deck-content ${snapshot.isDraggingOver ? 'dragging-over' : ''}}
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                    >
                      {deck.cards.length === 0 ? (
                        <div className="empty-deck-emoji">{suitEmojis[deck.id]}</div>
                      ) : (
                        deck.cards.map((card, index) => (
                          <div key={card.id} className="card-in-deck">
                            {card.rank} of {card.suit} - ({card.color})
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

       {/* Tableau section */}
       <div className="tableau">
          <h2>Tableau</h2>
          <div className="tableau-cards">
            {tableau.map((pile) => (
              <div key={pile.id} className="tableau-pile">
                <Droppable droppableId={pile.id}>
                  {(provided, snapshot) => (
                    <div
                      className={tableau-inner ${snapshot.isDraggingOver ? 'dragging-over' : ''}}
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                    >
                      {pile.cards.map((card, index) => (
                        <Draggable key={card.id} draggableId={card.id} index={index}>
                          {(provided) => (
                            <div
                              className="tableau-card"
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              ref={provided.innerRef}
                            >
                              {card.rank} of {card.suit} - ({card.color})
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DragDropContext>
  );
};

export default Solitaire;