import { useState, useEffect } from "react"
import { startGetAllCustomers } from "./action/customersAction"
import { startGetAllProducts } from "./action/productAction"
import { startGetAllBill } from "./action/billAction"
import { useDispatch } from "react-redux"
import NavBar from "./components/NavBar"

const App = (props) => {

  const [userLoggedIn, setUserLoggedIn] = useState(false)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(startGetAllCustomers())
  }, [])

  useEffect(() => {
    dispatch(startGetAllProducts())
  }, [])

  useEffect(() => {
    dispatch(startGetAllBill())
  }, [])

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