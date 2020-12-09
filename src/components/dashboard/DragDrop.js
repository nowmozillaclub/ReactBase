import React, { useState, useEffect } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { v4 as uuid } from "uuid";
import { db } from "../../fbConfig";

const itemsFromBackend = [
];

const columnsFromBackend = {
  [uuid()]: {
    name: "Requested",
    items: itemsFromBackend
  },
  [uuid()]: {
    name: "To do",
    items: []
  },
  [uuid()]: {
    name: "In Progress",
    items: []
  },
  [uuid()]: {
    name: "Done",
    items: []
  }
};

const onDragEnd = (result, columns, setColumns) => {
  if (!result.destination) return;
  const { source, destination } = result;

  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);


    var posChange = {
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems
      }
    }


    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems
      }
    });

    db.collection('workspace').doc('FY062lw5iQqUKfMCa4dE').set(posChange, { merge: true })

  } else {
    const column = columns[source.droppableId];
    const copiedItems = [...column.items];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);

    var anotherName = {
      ...columns,
      [source.droppableId]: {
        ...column,
        items: copiedItems
      }
    }

    setColumns({
      ...columns,
      [source.droppableId]: {
        ...column,
        items: copiedItems
      }
    });
    db.collection('workspace').doc('FY062lw5iQqUKfMCa4dE').set(anotherName, { merge: true })
  }
};

function App() {

  const [columns, setColumns] = useState(columnsFromBackend);
  const [name, setName] = useState('');
  const [taskName, setTaskName] = useState('');

  useEffect(() => {
    db.collection('workspace').doc('FY062lw5iQqUKfMCa4dE').get().then((data) => {
      console.log(data.data())

      var obj = {
        'requested': data.data().requested,
        'todo': data.data().todo,
        'inProgress': data.data().inProgress,
        'done': data.data().done,
      }

      setColumns(obj)

    })
  }, [])

  return (
    <div style={{ display: "flex", justifyContent: "center", height: "100%" }}>
      <DragDropContext
        onDragEnd={result => onDragEnd(result, columns, setColumns)}
      >
        {Object.entries(columns).map(([columnId, column], index) => {
          return (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
              }}
              key={columnId}
            >
              <h5 className="white-text">{column.name}</h5>
              <div style={{ margin: 8 }}>
                <Droppable droppableId={columnId} key={columnId}>
                  {(provided, snapshot) => {
                    return (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        style={{
                          padding: 4,
                          width: 250,
                          minHeight: 500
                        }}
                      >
                        {column.items.map((item, index) => {
                          return (
                            <Draggable
                              key={item.id}
                              draggableId={item.id}
                              index={index}
                            >
                              {(provided, snapshot) => {
                                return (
                                  <div
                                    className="row"
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    style={{
                                      userSelect: "none",
                                      padding: 16,
                                      margin: "0 0 8px 0",
                                      minHeight: "50px",
                                      color: "white",
                                      ...provided.draggableProps.style,
                                    }}
                                  >
                                    <div className="col s12">
                                      <div className="card" style={{borderRadius: '12px', backgroundColor: '#19202D', margin: '0'}}>
                                        <div className="card-content white-text">
                                          <p>{item.content}</p>
                                        </div>
                                        <div className="card-action" style={{borderRadius: '12px', padding: '1px 24px'}}>
                                          <p className="red-text">{item.Name}</p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                );
                              }}
                            </Draggable>
                          );
                        })}
                        {provided.placeholder}
                      </div>
                    );
                  }}
                </Droppable>
              </div>
            </div>
          );
        })}
      </DragDropContext>
    </div>
  );
}

export default App;
