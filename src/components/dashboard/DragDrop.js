import React, { useState, useEffect } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { v4 as uuid } from "uuid";
import { auth, db } from "../../fbConfig";
import Avatar from '@material-ui/core/Avatar';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import Navbar from '../layouts/Navbar';
import M from 'materialize-css';

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

function App(props) {
  console.log("Props here", props);
  const [columns, setColumns] = useState(columnsFromBackend);
  const [name, setName] = useState('');
  const [taskName, setTaskName] = useState('');
  const [people, setPeople] = useState([]);


  const addTask = (e) => {
    console.log(e.target.value)
    setTaskName(e.target.value)
  }

  const handleAdd = () => {
    let id = uuid()
    //let Name = auth.currentUser.displayName;
    let obj = {
      id,
      Name: 'Pratit',
      content: taskName
    }

    let existing = columns
    let newOnes = {
      ...columns,
      "requested": {
        ...(columns['requested']),
        items: [...(columns['requested'].items),obj]
      }
    }

    setColumns(newOnes)
    db.collection('workspace').doc('FY062lw5iQqUKfMCa4dE').set(newOnes, {merge: true})
  }

  const handleDelete = (id, columnId) => {
    let existing = columns[columnId].items;
    let newItems = existing.filter(item => item.id !== id)

    let posDelete = {
      ...columns,
    }

    posDelete[columnId] = {
      ...(columns[columnId]),
      items: newItems
    }
    setColumns(posDelete)

    db.collection('workspace').doc('FY062lw5iQqUKfMCa4dE').set(posDelete, {merge: true})
  }

  useEffect(() => {
    document.addEventListener('DOMContentLoaded', function () {
      var elems = document.querySelectorAll('.sidenav');
      var instances = M.Sidenav.init(elems);
    });
    db.collection('workspace').doc('FY062lw5iQqUKfMCa4dE').get().then((data) => {
      console.log(data.data())

      setName(data.data().Name)
      setPeople(data.data().People)

      var obj = {
        'requested': data.data().requested,
        'todo': data.data().todo,
        'inProgress': data.data().inProgress,
        'done': data.data().done,
      }

      setColumns(obj)

    })
  }, [])

  useEffect(() => {
    window.$(document).ready(function () {
      window.$('.modal').modal();
      window.$('#textarea1').val('');
      window.$('input#input_text, textarea#textarea2').characterCounter();
    });
  }, [])

  return (
    <>
      <Navbar props={props}/>
      <div className="valign-wrapper" style={{ position: "relative", height: "80px", width: "100%", backgroundColor: "#6771E3", borderRadius: "0 0 0 70px" }}>
        <h5 style={{ margin: "0", paddingLeft: "69px", color: "white" }}>Ben's Workspace</h5>
        <div className="white-text" style={{ position: "absolute", right: "40px" }}>
          <AvatarGroup max={4}>
          {
            people && people.map((person, key) => {
              return(
                <Avatar key={key} alt={person.Name}>{person.Name[0]}</Avatar>
              )
            })
          }
          </AvatarGroup>
        </div>
      </div>

      <div style={{ position: "fixed", bottom: "20px", right: "20px" }}>
        <a className="btn-floating btn-large red modal-trigger" href="#modal1"><i className="material-icons">add</i></a>
      </div>
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
                                        <div className="card" style={{ borderRadius: '12px', backgroundColor: '#19202D', margin: '0' }}>
                                          <div className="card-content white-text">
                                            <p>{item.content}</p>
                                          </div>
                                          <div className="card-action valign-wrapper" style={{ borderRadius: '12px', padding: '1px 24px' }}>
                                            <p className="red-text">{item.Name}</p>
                                            <i className="material-icons right-align" onClick={() => handleDelete(item.id, columnId)} style={{flex: 'auto', color: '#FF585F'}}>delete_forever</i>
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
        <div id="modal1" className="modal modal-fixed-footer" style={{ marginTop: '200px' }}>
          <div className="modal-content">
            <h4>Add Task</h4>
            <label for="textarea1">Enter task name</label>
            <textarea id="textarea1" className="materialize-textarea" data-length="120" onChange={(e) => addTask(e)}></textarea>
          </div>
          <div className="modal-footer">
            <a className="modal-close waves-effect waves-green btn-flat" onClick={() => handleAdd()}>Add Task</a>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
