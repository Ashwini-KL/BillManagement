import { Link, Route, withRouter } from 'react-router-dom'
import swal from 'sweetalert'
import Register from './Register'
import Login from './Login'
import Account from './Account'
import CustomerContainer from './CustomerContainer'
import ProductContainer from './ProductContainer'
import CartContainer from './CartContainer'
import Home from './Home'
import DashBoard from './DashBoard'
import PrivateRoute from '../helper/PrivateRoute'

const NavBar = (props) => {
    const { handleAuth, userLoggedIn } = props

    return (
        <div>
            {
                userLoggedIn ? (
                    <div className="d-flex bg-primary">
                        <Link className="p-2 ms-5 text-white text-decoration-none" to='/Account'>Account</Link>
                        <Link className="p-2 text-white text-decoration-none" to='/DashBoard'>DashBoard</Link>
                        <Link className="p-2 text-white text-decoration-none" to='/Customer'>Customers</Link>
                        <Link className="p-2 text-white text-decoration-none" to='/products'>Products</Link>
                        <Link className="p-2 text-white w-100 text-decoration-none" to='/MyCart'>Cart</Link>
                        <Link className="p-2 text-white flex-shrink-1 text-decoration-none" to='#' onClick={() => {
                            localStorage.removeItem('token')
                            swal('successfully logged out')
                            handleAuth()
                            props.history.push('/')
                        }}>Logout</Link>
                    </div>
                ) : (
                    <div class="d-flex bg-primary  ">
                        <Link className="p-2 ms-5 text-white text-decoration-none" to='/'>Home</Link>
                        <Link className="p-2 text-white w-100 text-decoration-none" to='/Register'>Register</Link>
                        <Link className="p-2 flex-shrink-1 text-white text-decoration-none" to='/Login'>Login</Link>
                    </div>
                )
            }
            <div class="container">
                <Route path='/' component={Home} exact={true} />
                <Route path='/Register' component={Register} />
                <Route path='/Login' render={(props) => {
                    return <Login {...props} handleAuth={handleAuth} />
                }}
                />
                <PrivateRoute path='/Account' component={Account} />
                <PrivateRoute path='/DashBoard' component={DashBoard} />
                <PrivateRoute path='/Customer' component={CustomerContainer} />
                <PrivateRoute path='/products' component={ProductContainer} />
                <PrivateRoute path='/MyCart' component={CartContainer} />
            </div>
        </div>
    )
}
export default withRouter(NavBar)