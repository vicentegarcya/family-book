import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

function App() {
  const [count, setCount] = useState(0);

  const startStory = function() {
    console.log('hola');
  }

  return (
    <>
      <section id="center">
        <div className="hero">
          <h1>Bienvenida a nuestra historia</h1>
        </div>
        <button
          type="button"
          className="startStoryBtn"
          onClick={() => startStory()}
        >
          Empezar
        </button>
      </section>
    </>
  )
}

export default App
