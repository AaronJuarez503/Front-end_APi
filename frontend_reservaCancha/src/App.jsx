import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { FormLogin } from './Form';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <FormLogin></FormLogin>
    </>
  )
}

export default App
