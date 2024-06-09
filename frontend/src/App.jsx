import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css' // Import the CSS file

const App = () => {
  const [posts, setPosts] = useState([])
  const [des, setDes] = useState('')
  const [editId, setEditId] = useState(null)

  const say = () => {
    if (editId) {
      axios.put(`http://localhost:3000/edit/${editId}`, { des })
        .then((response) => {
          console.log(response)
          axios.get("http://localhost:3000/getdes")
            .then((res) => setPosts(res.data))
            .catch((er) => console.log(er))
          setDes('')
          setEditId(null)
        })
        .catch((er) => console.log(er))
    } else {
      axios.post("http://localhost:3000/create", { des })
        .then((response) => {
          console.log(response)
          axios.get("http://localhost:3000/getdes")
            .then((res) => setPosts(res.data))
            .catch((er) => console.log(er))
          setDes('')
        })
        .catch((er) => console.log(er))
    }
  }

  const del = (id) => {
    const element = document.getElementById(`item-${id}`)
    if (element) {
      element.classList.add('fade-out')
      setTimeout(() => {
        axios.delete(`http://localhost:3000/delete/${id}`)
          .then((res) => {
            console.log(res)
            setPosts(posts.filter(post => post._id !== id))
          })
          .catch((er) => console.log(er))
      }, 500)
    }
  }

  const edit = (id, currentDes) => {
    setDes(currentDes)
    setEditId(id)
  }

  useEffect(() => {
    axios.get("http://localhost:3000/getdes")
      .then((res) => setPosts(res.data))
      .catch((er) => console.log(er))
  }, [])

  const handleEditClick = (id, currentDes) => {
    edit(id, currentDes)
  }

  return (
    <div className="container">
      <h1>Make a Day</h1>
      <textarea
        value={des}
        onChange={(e) => setDes(e.target.value)}
        rows={8}
        cols={80}
      />
      <button onClick={say} className="button">{editId ? 'Update' : 'Send To Data Base'}</button>
      {
        posts.length === 0
          ? <h1 style={{ fontFamily: "fantasy", letterSpacing: "2px" }}>No Works ☹</h1>
          : posts.map((val) => (
            <ul key={val._id}>
              <li id={`item-${val._id}`}>
                <p id={`romve-${val._id}`}>{val.des}</p>
                <div>
                  <button
                    onClick={() => handleEditClick(val._id, val.des)}
                    className="button button-edit"
                    id={`edit-${val._id}`}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => del(val._id)}
                    className="button button-delete"
                  >
                    Delete
                  </button>
                </div>
              </li>
            </ul>
          ))
      }
    </div>
  )
}

export default App
