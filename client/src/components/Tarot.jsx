import { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const DraggableCards = () => {
    const initialRows = {
      row1: Array.from({ length: 7 }, (_, index) => ({
        id: `card-${index + 1}`,
        content: `Card ${index + 1}`,
      })),
      row2: Array.from({ length: 7 }, (_, index) => ({
        id: `card-${index + 8}`,
        content: `Card ${index + 8}`,
      })),
      row3: Array.from({ length: 7 }, (_, index) => ({
        id: `card-${index + 15}`,
        content: `Card ${index + 15}`,
      })),
    };
  
    const [rows, setRows] = useState(initialRows);
  
    const onDragEnd = (result) => {
      if (!result.destination) return;
  
      const { source, destination } = result;
      const sourceRow = source.droppableId;
      const destRow = destination.droppableId;
  
      if (sourceRow === destRow) {
        const newCards = Array.from(rows[sourceRow]);
        const [movedCard] = newCards.splice(source.index, 1);
        newCards.splice(destination.index, 0, movedCard);
  
        setRows((prevRows) => ({
          ...prevRows,
          [sourceRow]: newCards,
        }));
      } else {
        const sourceCards = Array.from(rows[sourceRow]);
        const destCards = Array.from(rows[destRow]);
        const [movedCard] = sourceCards.splice(source.index, 1);
        destCards.splice(destination.index, 0, movedCard);
  
        setRows((prevRows) => ({
          ...prevRows,
          [sourceRow]: sourceCards,
          [destRow]: destCards,
        }));
      }
    };
  
    return (
      <DragDropContext onDragEnd={onDragEnd}>
        {Object.keys(rows).map((rowId, rowIndex) => (
          <Droppable key={rowId} droppableId={rowId} direction="horizontal">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="card-row"
              >
                {rows[rowId].map((card, index) => (
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
        ))}
      </DragDropContext>
    );
  };
  
  export default DraggableCards;