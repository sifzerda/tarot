// this lacks a Foundation (to keep code smaller)
// it has dragging of cards from tableau to tableau in groups implemented
// has to be combined with main (Notableau) code

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

// Initial tableau cards with stacks (adjust as needed)
const initialTableau = Array.from({ length: 7 }, (_, index) => ({
  id: `tableau-${index + 1}`,
  cards: [],
}));

const Solitaire = () => {
  const [cards, setCards] = useState(initialCards);
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
  // onDragEnd = logic for dropping cards
  const onDragEnd = (result) => {
    console.log('Drag result:', result); // Log the entire drag result object
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
    // Handle dropping into tableau
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

      // --------------------------DROPPING FROM TABLEAU INTO TABLEAU-----------------------------------------
    } else if (source.droppableId.startsWith('tableau') && destination.droppableId.startsWith('tableau')) {
      // Moving cards between tableau columns
      const sourcePileIndex = tableau.findIndex((pile) => pile.id === source.droppableId);
      const destinationPileIndex = tableau.findIndex((pile) => pile.id === destination.droppableId);
  
      console.log('Source pile index:', sourcePileIndex);
      console.log('Destination pile index:', destinationPileIndex);

      if (sourcePileIndex !== -1 && destinationPileIndex !== -1) {
        const updatedTableau = [...tableau];
        const sourceCards = updatedTableau[sourcePileIndex].cards;
        const draggedIndex = source.index;
        
        console.log('Source cards:', sourceCards);

        // Check if dragging a group from tableau
        let draggedGroup = [sourceCards[draggedIndex]];
        if (draggedIndex < sourceCards.length - 1) {
          draggedGroup = sourceCards.slice(draggedIndex);
        }

        console.log('Dragged group:', draggedGroup);
  
        // Remove cards from source
        updatedTableau[sourcePileIndex].cards = sourceCards.filter((card, index) => !draggedGroup.includes(card));
  
        // Insert cards into destination
        updatedTableau[destinationPileIndex].cards.splice(destination.index, 0, ...draggedGroup);
  
        console.log('Updated tableau:', updatedTableau);

        setTableau(updatedTableau);
      }
    }
    //----------------------------------------------------------------------------------------------------
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
                          {(dragProvided, dragSnapshot) => (
                            <div
                              className={`tableau-card ${dragSnapshot.isDragging ? 'dragging' : ''}`}
                              {...dragProvided.draggableProps}
                              {...dragProvided.dragHandleProps}
                              ref={dragProvided.innerRef}
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