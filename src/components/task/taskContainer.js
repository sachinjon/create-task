import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";


const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  let temp = result[startIndex].priority;
  result[startIndex].priority = result[endIndex].priority;
  result[endIndex].priority = temp;
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const move = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};
const grid = 25;

const getItemStyle = (isDragging, draggableStyle) => ({
  userSelect: "none",
  padding: 20,
  margin: `0 0 ${grid}px 0`,

  background: isDragging ? "lightgreen" : "grey",

  ...draggableStyle
});
const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
  padding: grid,
  width: 350,
  margin: "4px 10px"
});

const TaskContainer = (props) => {

  const [state, setState] = useState([[]]);
  const [isEdit, setIsEdit] = useState();
  const [taskName, setTaskName] = useState("");
  const [newName, setNewName] = useState("");
  console.log(state);
  function onDragEnd(result) {
    const { source, destination } = result;
    // dropped outside the list
    if (!destination) {
      return;
    }
    const sInd = +source.droppableId;
    const dInd = +destination.droppableId;

    if (sInd === dInd) {
      const items = reorder(state[sInd], source.index, destination.index);
      const newState = [...state];
      newState[sInd] = items;
      setState(newState);
    } else {
      const result = move(state[sInd], state[dInd], source, destination);
      const newState = [...state];
      newState[sInd] = result[sInd];
      newState[dInd] = result[dInd];

      // setState(newState.filter(group => group.length));
      setState(newState);
    }
  }
  const editCard = (id, index, value) => {
    setIsEdit(id);
    setNewName(value);
    /*  */

  }
  const updateName = (id, index, value) => {
    let temp = [...state];
    let temp1 = temp[index].map(e => e.id == id ? { ...e, name: value } : e);
    temp[index] = temp1;
    setState(temp);
    setIsEdit(false);
  }
  const updatestatus = (id, index, value) => {
    let temp = [...state];
    let temp1 = temp[index].map(e => e.id == id ? { ...e, complete: !e.complete } : e);
    temp[index] = temp1;
    setState(temp);
    setIsEdit(false);
  }
  const createTask = () => {
    let temp = [...state];
    let task = {
      id: temp[0] ? temp[0].length + 1 : 1,
      name: taskName,
      priority: temp[0] ? temp[0].length + 1 : 1,
      complete: false,
      expiry: null
    }
    temp[0].push(task);
    setState(temp);
    setIsEdit(false);
    setTaskName("");
  }
  return (
    <>
    <header>Task Creation</header>
    <hr />
    <div className="task-container">
      <div style={{ width: "50%", margin: "16px" }}>
        <input type="text" value={taskName} onChange={(e) => { setTaskName(e.target.value) }} /><button onClick={createTask} disabled={taskName.length <= 0}>create Task</button>
      </div><br />
      {state && (state[0] && state[0].length || state[1] && state[1].length) ? <> <button onClick={() => { setState([...state, []]) }}>create Bucket</button>

        <div style={{ display: "flex" }}>
          <DragDropContext onDragEnd={onDragEnd}>

            {state.map((el, ind) => (
              <Droppable key={ind} droppableId={`${ind}`}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    style={getListStyle(snapshot.isDraggingOver)}
                    {...provided.droppableProps}
                  >
                    <label>{ind == 0 ? "Task List" : "Bucket List"}</label>
                    {el.map((item, index) => (
                      <Draggable
                        key={item.id}
                        draggableId={String(item.id)}
                        index={index}
                        style={{ Border: "1px solid grey" }}
                      >
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={getItemStyle(
                              snapshot.isDragging,
                              provided.draggableProps.style
                            )}
                          >
                            <div

                            >
                              {isEdit == item.id ? <div style={{ display: "flex" }}><input type="text" value={newName} onChange={(e) => setNewName(e.target.value)} /><button onClick={() => updateName(item.id, ind, newName)}>save</button></div> : `${item.name}  ====> Priority-${item.priority}`}

                              <div style={{
                                display: "flex",
                                justifyContent: "space-around"
                              }}>
                                <button
                                  type="button"
                                  onClick={() => {
                                    const newState = [...state];
                                    newState[ind].splice(index, 1);
                                    setState(
                                      newState
                                    );
                                  }}
                                >
                                  delete
                            </button>{" "}
                                <button
                                  type="button"
                                  onClick={() => { editCard(item.id, ind, item.name) }}
                                >
                                  Edit
                            </button>{" "}
                                <button
                                  type="button"
                                  onClick={() => { updatestatus(item.id, ind, item.name) }}
                                >
                                  {item.complete ? "InComplete" : "Complete"}
                                </button>
                              </div>
                            </div>
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
        </div></> : null}
    </div>
    </>
  );

}
export default TaskContainer;
