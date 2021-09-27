import axios from 'axios'
import swal from 'sweetalert'

export const startRegisterData = (formData, redirect) => {
    return () => {
        axios.post('http://dct-billing-app.herokuapp.com/api/users/Register', formData)
            .then((response) => {
                const result = response.data
                if (result.hasOwnProperty('errors')) {
                    swal({
                        text: result.errors
                    })
                }
                else {
                    redirect()
                    swal('successfully registered')
                }
            })
    }
}

export const startLoginData = (loginData, handleAuth, redirect) => {
    return () => {
        axios.post('http://dct-billing-app.herokuapp.com/api/users/login', loginData)
            .then((response) => {
                const result = response.data
                console.log('login', result)
                if (result.token) {
                    localStorage.setItem('token', result.token)
                    swal('successfully LoggedIn')
                    handleAuth()
                    redirect()
                }
                else {
                    swal({
                        text: result.errors
                    })
                }
            })
            .catch((err) => {
                swal({
                    text: err.message
                })
            })
    }
}

export const startGetAccountDetails = () => {
    return (dispatch) => {
        axios.get('http://dct-billing-app.herokuapp.com/api/users/account', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then((response) => {
                const result = response.data
                if (result.hasOwnProperty('errors')) {
                    swal({
                        text: result.errors
                    })
                }
                else {
                    dispatch(getAccountData(result))
                }
            })
            .catch((err) => {
                swal({
                    text: err.message
                })
            })
    }
}

export const getAccountData = (result) => {
    return {
        type: 'GET_AccountData',
        payload: result
    }
}

