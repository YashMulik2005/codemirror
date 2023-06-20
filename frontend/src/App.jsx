import { useState } from 'react'
import reactLogo from './assets/react.svg'
import Texteditor from './components/Texteditor'


function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <Texteditor />
    </div>
  )
}

export default App
