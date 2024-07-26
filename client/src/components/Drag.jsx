import { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

// Define initial squares and boxes data
const initialCards = [
  // rightside
  { id: 'card-1', direction: 'Rightside', rank: 'The Fool' },
  { id: 'card-2', direction: 'Rightside', rank: 'The Magician' },
  { id: 'card-3', direction: 'Rightside', rank: 'The High Priestess' },
  { id: 'card-4', direction: 'Rightside', rank: 'The Empress' },
  { id: 'card-5', direction: 'Rightside', rank: 'The Emperor' },
  { id: 'card-6', direction: 'Rightside', rank: 'The Hierophant' },
  { id: 'card-7', direction: 'Rightside', rank: 'The Lovers' },
  { id: 'card-8', direction: 'Rightside', rank: 'The Chariot' },
  { id: 'card-9', direction: 'Rightside', rank: 'Justice' },
  { id: 'card-10', direction: 'Rightside', rank: 'The Hermit' },
  { id: 'card-11', direction: 'Rightside', rank: 'Wheel Of Fortune' },
  { id: 'card-12', direction: 'Rightside', rank: 'Strength' },
  { id: 'card-13', direction: 'Rightside', rank: 'The Hanged Man' },
  { id: 'card-14', direction: 'Rightside', rank: 'Death' },
  { id: 'card-15', direction: 'Rightside', rank: 'Temperance' },
  { id: 'card-16', direction: 'Rightside', rank: 'The Devil' },
  { id: 'card-17', direction: 'Rightside', rank: 'The Tower' },
  { id: 'card-18', direction: 'Rightside', rank: 'The Star' },
  { id: 'card-19', direction: 'Rightside', rank: 'The Moon' },
  { id: 'card-20', direction: 'Rightside', rank: 'The Sun' },
  { id: 'card-21', direction: 'Rightside', rank: 'Judgement' },
  { id: 'card-22', direction: 'Rightside', rank: 'The World' },
  // inverted
  { id: 'card-23', suit: 'Inverted', rank: '10' },
  { id: 'card-24', suit: 'Inverted', rank: 'Jack' },
  { id: 'card-25', suit: 'Inverted', rank: 'Queen' },
  { id: 'card-26', suit: 'Inverted', rank: 'King' },
  { id: 'card-27', suit: 'Inverted', rank: 'Ace' },
  { id: 'card-28', suit: 'Inverted', rank: '2' },
  { id: 'card-29', suit: 'Inverted', rank: '3' },
  { id: 'card-30', suit: 'Inverted', rank: '4' },
  { id: 'card-31', suit: 'Inverted', rank: '5' },
  { id: 'card-32', suit: 'Inverted', rank: '6' },
  { id: 'card-33', suit: 'Inverted', rank: '7' },
  { id: 'card-34', suit: 'Inverted', rank: '8' },
  { id: 'card-35', suit: 'Inverted', rank: '9' },
  { id: 'card-36', suit: 'Inverted', rank: '10' },
  { id: 'card-37', suit: 'Inverted', rank: 'Jack' },
  { id: 'card-38', suit: 'Inverted', rank: 'Queen' },
  { id: 'card-39', suit: 'Inverted', rank: 'King' },
  { id: 'card-40', suit: 'Inverted', rank: 'Ace' },
  { id: 'card-41', suit: 'Inverted', rank: '2' },
  { id: 'card-42', suit: 'Inverted', rank: '3' },
  { id: 'card-43', suit: 'Inverted', rank: '4' },
  { id: 'card-44', suit: 'Inverted', rank: '5' },

];

const initialDecks = [
  { id: 'opportunity', cards: [] },
  { id: 'past', cards: [] },
  { id: 'present', cards: [] },
  { id: 'future', cards: [] },
  { id: 'obstacle', cards: [] },
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
                        {cards[currentCardIndex].rank}
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
                          {card.rank}
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