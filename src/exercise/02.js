// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import * as React from 'react'


function useLocalStorageState (key, defaultValue = '') {

  const getLocalStorageItem = (item) => window.localStorage.getItem(item) || defaultValue;
  const setLocalStorageItem = (key,item) => window.localStorage.setItem(key, JSON.stringify(item));
  const [state, setState] = React.useState(getLocalStorageItem(key))
  
  React.useEffect(() => {
    setLocalStorageItem(key, state);
  },[state, key])
  
  return [state, setState]
}

function Greeting({initialName = ''}) {

  const [name, setName] = useLocalStorageState('name',initialName);

  function handleChange(event) {
    setName(event.target.value)
  }
  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input value={name} onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
  return <Greeting />
}

export default App
