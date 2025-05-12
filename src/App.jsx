import { use, useEffect, useState } from "react";
import { addJoke, getAllJokes } from "./services/jokeService";
import "./App.css"

export const App = () => {

  const [newJokeText, setNewJokeText] = useState("")

  const [allJokes, setAllJokes] = useState([])

  const [untoldJokes, setUntoldJokes] = useState([])

  const [toldJokes, setToldJokes] = useState([])

  function fetchAllJokes() { 
    useEffect(() => {
      async function fetchData() {
        const allJokes = await getAllJokes()
        setAllJokes(allJokes)
      }

      fetchData()
    }, [allJokes])
  }

  fetchAllJokes()

  useEffect(() => {
    const filteredJokes = allJokes.filter((joke => joke.told === false))
    setUntoldJokes(filteredJokes)
  }, [allJokes])

  useEffect(() => {
    const filteredJokes = allJokes.filter((joke => joke.told === true))
    setToldJokes(filteredJokes)
  }, [allJokes])

  const handleAddJoke = async () => {
    await addJoke(newJokeText)
    setNewJokeText('')
  }

  return <div className="app-container">
    <div className="app-heading"> 
      {/* Header */}
      <h1 className="app-heading-text">Chuckle Checklist</h1>
    </div>
    <div>
      <h2>Add Joke</h2>
    </div>
    {/* Add Joke Form */}
    <div className="joke-add-form">
        <input
          className="joke-input"
          type="text"
          placeholder="New One Liner"
          onChange={(event) => {
            setNewJokeText(event.target.value)
            console.log("Input value:", event.target.value)
          }}
        />
        <button className="joke-input-submit"
          onClick={() => {
            handleAddJoke()
            console.log("Clicked Button!")
          }}
          >Add 
        </button>
      </div>
      <div className="joke-lists-container">
        <div className="joke-list-container">
          <h2>
            <span className="untold-count">
            {untoldJokes.length}
            </span>
            Untold</h2>
          <article>
            {untoldJokes.map(joke => {
              return (
                <li className="joke-list-item" key={joke.id}>
                  <p className="joke-list-item-text">{joke.text}</p>
                </li>
              )  
            })}
          </article>
        </div>
        <div className="joke-list-container">
          <h2>
          <span className="told-count">
            {toldJokes.length}
          </span>Told</h2>
          <article>
            {toldJokes.map(joke => {
              return (
                <li className="joke-list-item" key={joke.id}>
                  <p className="joke-list-item-text">{joke.text}</p>
                </li>
              )  
            })}
          </article>
        </div>
      </div>
  </div>
}
