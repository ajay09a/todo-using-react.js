import React from "react";

const Tasks = ({
  list,
  handleDelete,
  updateTask,
  update,
  HandleTaskCompleted,
}) => {
  // This function is to do delete Tasks
  const Delete = async (id) => {
    handleDelete(id);
  };

//   task edit function send call to update task in it's parent node
  const editT = (id) => {
    list.map((item, ind) => {
      return (
        ind+1===id?updateTask(item.title, ind + 1):null
      )
    });
  };

//   work done or not done function
  const markAsCompleted = (id) => {
    list.map((item, ind) => {
      if (ind + 1 === id) {
        HandleTaskCompleted(ind + 1);
      }
      return item;
    });
  };

  return (
    <>
      <div className="todo_list_inner_container">
        {list.map((item, ind) => {
          return (
            <div className="todo-list" key={ind}>
              <li>{ind + 1}</li>
              {item.completed ? (
                <li className="completedTask">{item.title}</li>
              ) : (
                <li>{item.title}</li>
              )}

              {update ? (
                ""
              ) : (
                <img
                  className="edit-btn"
                  onClick={() => editT(ind + 1)}
                  src="https://cdn-icons-png.flaticon.com/512/6461/6461127.png"
                  alt="edit"
                />
              )}
              {item.completed ? (
                <img
                  className="checkbox"
                  onClick={() => markAsCompleted(ind + 1)}
                  src="https://cdn-icons-png.flaticon.com/512/2954/2954893.png"
                  alt="done"
                />
              ) : (
                <img
                  className="checkbox"
                  onClick={() => markAsCompleted(ind + 1)}
                  src="https://cdn-icons-png.flaticon.com/512/8208/8208902.png"
                  alt="undone"
                />
              )}
              <img
                className="delete-btn"
                onClick={() => Delete(ind + 1)}
                src="https://cdn-icons-png.flaticon.com/512/3405/3405234.png"
                alt="delete"
              />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Tasks;