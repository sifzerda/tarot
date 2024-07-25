import { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

// Define initial squares and boxes data
const initialCards = [
  // HEARTS 
  { id: 'card-1', suit: 'Hearts', rank: 'Ace' },
  { id: 'card-2', suit: 'Hearts', rank: '2' },
  { id: 'card-3', suit: 'Hearts', rank: '3' },
  { id: 'card-4', suit: 'Hearts', rank: '4' },
  { id: 'card-5', suit: 'Hearts', rank: '5' },
  { id: 'card-6', suit: 'Hearts', rank: '6' },
  { id: 'card-7', suit: 'Hearts', rank: '7' },
  { id: 'card-8', suit: 'Hearts', rank: '8' },
  { id: 'card-9', suit: 'Hearts', rank: '9' },
  { id: 'card-10', suit: 'Hearts', rank: '10' },
  { id: 'card-11', suit: 'Hearts', rank: 'Jack' },
  { id: 'card-12', suit: 'Hearts', rank: 'Queen' },
  { id: 'card-13', suit: 'Hearts', rank: 'King' },

  // DIAMONDS
  { id: 'card-14', suit: 'Diamonds', rank: 'Ace' },
  { id: 'card-15', suit: 'Diamonds', rank: '2' },
  { id: 'card-16', suit: 'Diamonds', rank: '3' },
  { id: 'card-17', suit: 'Diamonds', rank: '4' },
  { id: 'card-18', suit: 'Diamonds', rank: '5' },
  { id: 'card-19', suit: 'Diamonds', rank: '6' },
  { id: 'card-20', suit: 'Diamonds', rank: '7' },
  { id: 'card-21', suit: 'Diamonds', rank: '8' },
  { id: 'card-22', suit: 'Diamonds', rank: '9' },
  { id: 'card-23', suit: 'Diamonds', rank: '10' },
  { id: 'card-24', suit: 'Diamonds', rank: 'Jack' },
  { id: 'card-25', suit: 'Diamonds', rank: 'Queen' },
  { id: 'card-26', suit: 'Diamonds', rank: 'King' },

  // CLUBS
  { id: 'card-27', suit: 'Clubs', rank: 'Ace' },
  { id: 'card-28', suit: 'Clubs', rank: '2' },
  { id: 'card-29', suit: 'Clubs', rank: '3' },
  { id: 'card-30', suit: 'Clubs', rank: '4' },
  { id: 'card-31', suit: 'Clubs', rank: '5' },
  { id: 'card-32', suit: 'Clubs', rank: '6' },
  { id: 'card-33', suit: 'Clubs', rank: '7' },
  { id: 'card-34', suit: 'Clubs', rank: '8' },
  { id: 'card-35', suit: 'Clubs', rank: '9' },
  { id: 'card-36', suit: 'Clubs', rank: '10' },
  { id: 'card-37', suit: 'Clubs', rank: 'Jack' },
  { id: 'card-38', suit: 'Clubs', rank: 'Queen' },
  { id: 'card-39', suit: 'Clubs', rank: 'King' },

  // SPADES
  { id: 'card-40', suit: 'Spades', rank: 'Ace' },
  { id: 'card-41', suit: 'Spades', rank: '2' },
  { id: 'card-42', suit: 'Spades', rank: '3' },
  { id: 'card-43', suit: 'Spades', rank: '4' },
  { id: 'card-44', suit: 'Spades', rank: '5' },
  { id: 'card-45', suit: 'Spades', rank: '6' },
  { id: 'card-46', suit: 'Spades', rank: '7' },
  { id: 'card-47', suit: 'Spades', rank: '8' },
  { id: 'card-48', suit: 'Spades', rank: '9' },
  { id: 'card-49', suit: 'Spades', rank: '10' },
  { id: 'card-50', suit: 'Spades', rank: 'Jack' },
  { id: 'card-51', suit: 'Spades', rank: 'Queen' },
  { id: 'card-52', suit: 'Spades', rank: 'King' },
];

// create and initialize Foundation decks with suit id, and empty 
const initialDecks = [
  { id: 'hearts', cards: [] },    // Hearts foundation deck
  { id: 'diamonds', cards: [] },
  { id: 'clubs', cards: [] },
  { id: 'spades', cards: [] },
];

// Emoji on empty foundation decks
const suitEmojis = {
  hearts: '♡',
  diamonds: '♢',
  clubs: '♧',
  spades: '♤',
};

// Initial tableau cards with stacks (adjust as needed)
const initialTableau = [
    { id: 'tableau-1', cards: [] },   // 1 card in tableau 1
    { id: 'tableau-2', cards: [] },   // 2 cards in tableau 2
    { id: 'tableau-3', cards: [] },   // 3 cards in tableau 3
    { id: 'tableau-4', cards: [] },  // 4 cards in tableau 4
    { id: 'tableau-5', cards: [] }, // 5 cards in tableau 5
    { id: 'tableau-6', cards: [] }, // 6 cards in tableau 6
    { id: 'tableau-7', cards: [] }, // 7 cards in tableau 7
  ];

const Solitaire = () => {
  const [cards, setCards] = useState(initialCards);
  const [decks, setDecks] = useState(initialDecks);
  /* for next card display */
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [tableau, setTableau] = useState(initialTableau); // State for tableau cards

  useEffect(() => {
    const shuffledCards = shuffleArray([...initialCards]);
    const tableauCards = shuffledCards.slice(0, 28);
    const deckCards = shuffledCards.slice(28);

    setTableau(
      initialTableau.map((pile, index) => ({
        ...pile,
        cards: tableauCards.slice(index * 4, (index + 1) * 4),
      }))
    );

    setCards(deckCards);
  }, []); // Empty dependency array ensures this runs only once on component mount

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
  
    // Handle dropping logic based on destination
    switch (destination.droppableId) {
      case 'hearts':
      case 'diamonds':
      case 'clubs':
      case 'spades':
        const destDeck = decks.find((deck) => deck.id === destination.droppableId);
        const topCard = destDeck.cards.slice(-1)[0];
  
        // Validate if the card can be placed on the foundation deck
        if (
          (draggedCard.rank === 'Ace' && draggedCard.suit.toLowerCase() === destination.droppableId) ||
          (topCard &&
            ((draggedCard.rank === '2' && topCard.rank === 'Ace' && draggedCard.suit === topCard.suit) ||
            (draggedCard.rank === 'Jack' && topCard.rank === '10' && draggedCard.suit === topCard.suit) ||
            (draggedCard.rank === 'Queen' && topCard.rank === 'Jack' && draggedCard.suit === topCard.suit) ||
            (draggedCard.rank === 'King' && topCard.rank === 'Queen' && draggedCard.suit === topCard.suit) ||
            (parseInt(draggedCard.rank) === parseInt(topCard.rank) + 1 && draggedCard.suit === topCard.suit)))
        ) {
          // Remove the card from tableau or stockpile
          let updatedTableau;
          if (source.droppableId === 'revealed-cards') {
            const updatedCards = cards.filter((card) => card.id !== draggedCard.id);
            setCards(updatedCards);
          } else {
            updatedTableau = tableau.map((pile) => ({
              ...pile,
              cards: pile.id === source.droppableId ? pile.cards.filter((card, index) => index !== source.index) : pile.cards,
            }));
            setTableau(updatedTableau);
          }
  
          // Update the foundation deck
          const updatedDecks = decks.map((deck) => ({
            ...deck,
            cards: deck.id === destination.droppableId ? [...deck.cards, draggedCard] : deck.cards,
          }));
  
          setDecks(updatedDecks);
        }
        break;
  
      // Handle other cases as needed
      default:
        break;
  }

    // ------------- (+) FOUNDATION ARE (-) FROM OTHER DECKS --------------->
// check card rank/suit was added to foundation and remove it from stockpile and tableau

  // Update Stockpile: remove dropped card from stockpile
  const updatedCards = cards.filter((card) => card.id !== draggedCard.id);
  setCards(updatedCards);

  // Update Foundations state: add dropped card to foundation decks 
  const updatedDecks = decks.map((deck) => {
    if (deck.id === destination.droppableId) {
      return {
        ...deck,
        cards: [...deck.cards, draggedCard],
      };
    }
    return deck;
  });
  setDecks(updatedDecks);
};

/* -------------------------------------------------------------*/

return (
    <DragDropContext onDragEnd={onDragEnd}>
      {/* Cards section */}
      <div className="s-container">
        <div className="cards">
          <h2>Cards</h2>
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
                        {cards[currentCardIndex].rank} of {cards[currentCardIndex].suit}
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
          <h2>Foundation Decks</h2>
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
                        <div className="empty-deck-emoji">{suitEmojis[deck.id]}</div>
                      ) : (
                        deck.cards.map((card, index) => (
                          <div key={card.id} className="card-in-deck">
                            {card.rank} of {card.suit}
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
                      className={`tableau-inner ${snapshot.isDraggingOver ? 'dragging-over' : ''}`}
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
                              {card.rank} of {card.suit}
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