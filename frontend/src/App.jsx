
import { Outlet } from 'react-router'
import './App.css'
import MenuBar from './views/MenuBar'

function App() {

  return (
    <>
      <MenuBar />
      <Outlet />
    </>
  )
}

export default App
