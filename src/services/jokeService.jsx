export const getAllJokes = async () => {
  const responce = await fetch('http://localhost:8088/jokes')
  return await responce.json()
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
    return await responce.json()
}