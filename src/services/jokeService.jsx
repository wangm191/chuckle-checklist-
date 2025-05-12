export const getAllJokes = async () => {
  const response = await fetch('http://localhost:8088/jokes')
  return await response.json()
}

export const addJoke = async (newJokeText) => {
    const allJokes = await getAllJokes()
    const nextId = allJokes.length ? allJokes.length + 1 : 1;

    const newJoke = {
        id: nextId.toString(),
        text: newJokeText,
        told: false,
    }

    const postOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newJoke),
    }

    const responce = await fetch('http://localhost:8088/jokes', postOptions)
    if (responce) {
        console.log("Added Joke!")
    }
}

export const updateJokeStatus = async (jokeId) => {
    const joke = await fetch(`http://localhost:8088/jokes/${jokeId}`)
    .then((res) => res.json())

    joke.told ? joke.told = false : joke.told = true

    const putOptions = {
        method: 'PUT', 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(joke)
    }

    const response = await fetch(`http://localhost:8088/jokes/${jokeId}`, putOptions)
    if (response) {
        console.log(`Joke Status Updated: ${joke.told}`)
    }
}

export const deleteJoke = async (jokeId) => {
    const joke = await fetch(`http://localhost:8088/jokes/${jokeId}`)
    .then((res) => res.json())

    const response = await fetch(`http://localhost:8088/jokes/${jokeId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(joke)
      });

    if (response) {
        console.log(`Joke Deleted.`)
    }
}