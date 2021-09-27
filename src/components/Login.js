import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { startLoginData } from '../action/usersAction'
import { Link } from 'react-router-dom'

const Login = (props) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [formErrors, setFormErrors] = useState({})
    const errors = {}

    const { handleAuth } = props
    const dispatch = useDispatch()

    const handleChange = (e) => {
        const attr = e.target.name
        if (attr == 'email') {
            setEmail(e.target.value)
        }
        else if (attr == 'password') {
            setPassword(e.target.value)
        }
    }

    const togglePassword = () => {
        setShowPassword(!showPassword)
    }

    const validation = () => {
        if (email.trim().length == 0) {
            errors.email = 'email cannot be empty'
        }
        if (password.trim().length == 0) {
            errors.password = 'password cannot be empty'
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        validation()
        if (Object.keys(errors).length == 0) {
            setFormErrors({})
            const loginData = {
                email: email,
                password: password
            }
            console.log(loginData)

            const redirect = () => {
                props.history.push('/DashBoard')
                //handleAuth()
            }
            dispatch(startLoginData(loginData, handleAuth, redirect))
        }
        else {
            console.log(errors)
            setFormErrors(errors)
        }
    }

    return (

        <div>
            <center>
                <h1>Login</h1>
                <form onSubmit={handleSubmit}>
                    <input className="form-control w-25" type='text' name='email' value={email} onChange={handleChange} />
                    {
                        formErrors.email && <span className='text-danger'>{formErrors.email}</span>
                    }
                    <br />
                    <input className="form-control w-25" type={showPassword ? 'text' : 'password'} name='password' value={password} onChange={handleChange} /><Link to='#' className="inline-block"><img src='eye-4-64.ico' onClick={togglePassword} width='20px' height='22px' /></Link>
                    {
                        formErrors.password && <span className='text-danger'>{formErrors.password}</span>
                    }
                    <br />
                    <input className="btn btn-primary w-25 h-25" type='submit' value='login' />
                    <br />
                    Dont have an account <Link to='/Register'>Register</Link>
                </form>
            </center>
        </div>

    )
}
export default Login