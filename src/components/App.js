import React, { useEffect, useState } from "react";
import Tasks from "./Tasks";


const App = () => {
  // UseState Hooks
  const [update, setUpdate] = useState(false);
  const [toUpdateTaskbyId, setToUpdateTaskbyId] = useState(0);
  const [task, setTask] = useState("");
  const [list, setList] = useState([]);

  useEffect(() => {
    // used useEffect to call Api function before Rendering
    callApi();
  }, []);

  // Calling to Api for todo list
  const callApi = async () => {
    await fetch("https://jsonplaceholder.typicode.com/todos/?userId=1")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setList(data);
      })
      .catch((err) => {
        console.log("error:", err);
      });
  };

  // This function is used to add task to the list
  const addTasksToList = async () => {
    if (task === "") {
      return;
    }
    await fetch("https://jsonplaceholder.typicode.com/todos/?userId=1", {
      method: "POST",
      body: JSON.stringify({
        title: task,
        userId: 1,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setList([{ userId: 1, title: task, completed: false }, ...list]);
    
      });
    setTask("");
  };

  // delete item from the task list
  const handleDelete = (id) => {
    fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        const afterFilter = list.filter((item, ind) => {
          return ind + 1 !== id;
        });
        setList(afterFilter);
      });
  };

  //  here you can update Tasks
  const updateTask = (data, id) => {
    setUpdate(true);
    setTask(data);
    setToUpdateTaskbyId(id - 1);
  };

  // updating task list
  const updatingTask = async () => {
    if (task === "") {
      return;
    }
    await fetch("https://jsonplaceholder.typicode.com/todos/?userId=1", {
      method: "PUT",
      body: JSON.stringify({
        title: task,
        userId: 1,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setUpdate(false);
      
        list.map((item, ind) => {
          return(
            ind===toUpdateTaskbyId?(item.title=task):("")
          )
        });
      });
    setList([...list]);
    setTask("");
  };

  //  THis function is for handle tasks
  const HandleTaskCompleted = (id) => {
    list.map((item, ind) => {
      return(
        ind+1===id?(item.completed?(item.completed=false):(item.completed=true)):("")
      )
    });
    setList([...list]);
  };

  return (
    <div className="todo_list_container">
      <div className="heading"><h1 className="todo_title">To Do App</h1></div>
      <input
        type="text"
        className="addtoTask"
        placeholder="Write Something....."
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      {update ? (
        <img
          className="addtoTaskBtn"
          onClick={() => updatingTask()}
          src="https://cdn-icons-png.flaticon.com/512/3114/3114824.png"
          alt="update list"
        />
      ) : (
        <img
          className="addtoTaskBtn"
          onClick={() => addTasksToList()}
          src="https://cdn-icons-png.flaticon.com/512/10257/10257707.png"
          alt="add to list"
        />
      )}

      

     
      <Tasks
        list={list}
        handleDelete={handleDelete}
        updateTask={updateTask}
        HandleTaskCompleted={HandleTaskCompleted}
        update={update}
      />
    </div>
  );
};
export default App;
