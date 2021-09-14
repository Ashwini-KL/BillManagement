
import { useState } from "react"
import { useDispatch } from 'react-redux'
import { startRegisterData } from '../action/usersAction'
import { Link } from 'react-router-dom'

const Register = (props) => {

    const [userName, setUserName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [buisnessName, setBuisnessName] = useState('')
    const [address, setAddress] = useState('')
    const [formErrors, setFormErrors] = useState({})
    const errors = {}

    const dispatch = useDispatch()

    const handleChange = (e) => {
        const attr = e.target.name
        if (attr == 'userName') {
            setUserName(e.target.value)
        }
        else if (attr == 'email') {
            setEmail(e.target.value)
        }
        else if (attr == 'password') {
            setPassword(e.target.value)
        }
        else if (attr == 'buisnessName') {
            setBuisnessName(e.target.value)
        }
        else if (attr == 'address') {
            setAddress(e.target.value)
        }

    }

    const validation = () => {

        if (userName.trim().length == 0) {
            errors.userName = 'name cannot be empty'
        }
        if (email.trim().length == 0) {
            errors.email = 'email cannot be empty'
        }
        if (password.trim().length == 0) {
            errors.password = 'password cannot be empty'
        }
        if (buisnessName.trim().length == 0) {
            errors.buisnessName = 'buisnessName cannot be empty'
        }
        if (address.trim().length == 0) {
            errors.address = 'address cannot be empty'
        }
    }

    const togglePassword = () => {
        setShowPassword(!showPassword)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        validation()
        if (Object.keys(errors).length == 0) {
            setFormErrors({})
            const formData = {
                username: userName,
                email: email,
                password: password,
                businessName: buisnessName,
                address: address
            }
            //console.log(formData)
            const redirect = () => {
                props.history.push('/Login')
            }
            dispatch(startRegisterData(formData, redirect))
        }
        else {
            console.log(errors)
            setFormErrors(errors)
        }
    }


    return (

        <div className="p-2 mb-2 bg-light text-dark ">
            <center>
                <h1>Register</h1>
                <form onSubmit={handleSubmit}>
                    <input className="form-control w-25" type='text' name='userName' value={userName} placeholder='Enter userName' onChange={handleChange} />
                    {
                        formErrors.userName && <span className='text-danger'>{formErrors.userName}</span>
                    }
                    <br />
                    <input className="form-control w-25" type='text' name='email' value={email} placeholder='Enter email' onChange={handleChange} />
                    {
                        formErrors.email && <span className='text-danger'>{formErrors.email}</span>
                    }
                    <br />
                    <input className="form-control w-25" type={showPassword ? 'text' : 'password'} name='password' value={password} placeholder='Enter password' onChange={handleChange} /><Link to='#'><img src='eye-4-64.ico' width='30px' height='32px' onClick={togglePassword} width='20px' height='22px' /></Link>
                    {
                        formErrors.password && <span className='text-danger'>{formErrors.password}</span>
                    }
                    <br />
                    <input className="form-control w-25" type='text' name='buisnessName' value={buisnessName} placeholder='Enter buisnessName' onChange={handleChange} />
                    {
                        formErrors.buisnessName && <span className='text-danger'>{formErrors.buisnessName}</span>
                    }
                    <br />
                    <input className="form-control w-25" type='text' name='address' value={address} placeholder='Enter address' onChange={handleChange} />
                    {
                        formErrors.address && <span className='text-danger'>{formErrors.address}</span>
                    }
                    <br />
                    <input className="btn btn-primary w-25" type='submit' value='register' />
                    <br />
                    <Link to='/Login'>Login</Link> already have an account?
                </form>
            </center>
        </div>

    )
}
export default Register