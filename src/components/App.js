import React, { useEffect, useState } from "react";
const url = "https://jsonplaceholder.typicode.com/todos";

function App() {
  const [user, setUser] = useState([]);
  useEffect(() => {
    const fetchData = async()=>{
      try {
        return fetch(url)
          .then((response) => response.json())
          .then((data) => setUser(data));
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, [])
  
  return (
    <div className="App">
      {user.map((use)=>{
        return (
          <div className="items">
            <div className="id">{use.id}</div>
            <div className="title">{use.title}</div>
            <div className="complete"><input type="checkbox" checked={use.completed}></input></div>
        </div>
        )
      })}
    </div>
  );
}

export default App;
