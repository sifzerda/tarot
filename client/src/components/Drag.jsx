import { useState } from 'react';
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

const initialDecks = [
  { id: 'hearts', cards: [] },
  { id: 'diamonds', cards: [] },
  { id: 'clubs', cards: [] },
  { id: 'spades', cards: [] },
];

const Drag = () => {
  const [cards, setCards] = useState(initialCards);
  const [decks, setDecks] = useState(initialDecks);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  const nextCard = () => {
    setCurrentCardIndex((prevIndex) => (prevIndex + 1) % cards.length);
  };

  const onDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) {
      return;
    }

    const updatedDecks = decks.map((deck) => {
      if (deck.id === destination.droppableId) {
        const draggedCard = cards[currentCardIndex];
        setCards((prevCards) => {
          const updated = [...prevCards];
          updated.splice(currentCardIndex, 1);
          return updated;
        });
        return {
          ...deck,
          cards: [...deck.cards, draggedCard],
        };
      }
      return deck;
    });

    setDecks(updatedDecks);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="container">
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
              </div>
            )}
          </Droppable>
        </div>

        <div className="decks">
          <h2>Foundation Decks</h2>
          <div className="foundation-decks">
            {decks.map((deck) => (
              <div key={deck.id} className={`foundation-deck ${deck.id}`}>
                <Droppable droppableId={deck.id}>
                  {(provided, snapshot) => (
                    <div
                      className={`deck-content ${snapshot.isDraggingOver ? 'dragging-over' : ''}`}
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                    >
                      {deck.cards.map((card, index) => (
                        <div key={card.id} className="card-in-deck">
                          {card.rank} of {card.suit}
                        </div>
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

export default Drag;