// CelticCrossLayout.js
import { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const initialCards = Array.from({ length: 21 }, (_, index) => ({
  id: `card-${index}`,
  content: `Card ${index + 1}`,
}));

const CelticCrossLayout = () => {
  const [cards, setCards] = useState(initialCards);
  const [droppedCards, setDroppedCards] = useState(Array(10).fill(null));

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination } = result;

    // Dropping in the Celtic Cross formation
    if (destination.droppableId.startsWith('drop-zone-')) {
      const newDroppedCards = [...droppedCards];
      newDroppedCards[destination.index] = cards[source.index];
      setDroppedCards(newDroppedCards);
    } else {
      // Reordering cards in the original list
      const reorderedCards = Array.from(cards);
      const [removed] = reorderedCards.splice(source.index, 1);
      reorderedCards.splice(destination.index, 0, removed);
      setCards(reorderedCards);
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="container">
        <Droppable droppableId="cards" direction="horizontal">
          {(provided) => (
            <div className="cards" {...provided.droppableProps} ref={provided.innerRef}>
              {cards.map((card, index) => (
                <Draggable key={card.id} draggableId={card.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="card"
                    >
                      {card.content}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>

        <div className="celtic-cross">
          {droppedCards.map((card, index) => (
            <Droppable key={`drop-zone-${index}`} droppableId={`drop-zone-${index}`}>
              {(provided) => (
                <div className="drop-zone" ref={provided.innerRef} {...provided.droppableProps}>
                  {card ? (
                    <div className="card">{card.content}</div>
                  ) : (
                    <div className="placeholder">Drop here</div>
                  )}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </div>
    </DragDropContext>
  );
};

export default CelticCrossLayout;