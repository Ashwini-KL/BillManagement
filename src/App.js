import { useState,useEffect} from "react"
import NavBar from "./components/NavBar"

const App = (props) => {

  const [userLoggedIn, setUserLoggedIn] = useState(false)

  const handleAuth = () => {
    setUserLoggedIn(!userLoggedIn)
  }

  useEffect(() => {
    if (localStorage.getItem('token')) {
      handleAuth()
    }
  }, [])

  return (
    <NavBar handleAuth={handleAuth} userLoggedIn={userLoggedIn} />
  )
}
export default App