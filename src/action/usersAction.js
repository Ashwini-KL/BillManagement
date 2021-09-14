import axios from 'axios'
export const startRegisterData = (formData,redirect)=>{

    return()=>{
        axios.post( 'http://dct-billing-app.herokuapp.com/api/users/Register',formData)
            .then((response)=>{
            const result = response.data
            if(result.hasOwnProperty('errors'))
            {
                alert(result.errors)
            }
            else
            {
                redirect() 
                alert('successfully registered')
            }    
        })
    }
}

export const startLoginData=(loginData,handleAuth,redirect)=>{
    return()=>{
        axios.post('http://dct-billing-app.herokuapp.com/api/users/login',loginData)
        .then((response)=>{
            const result = response.data
            console.log('login',result)
            if(result.token)
            {
                localStorage.setItem('token',result.token)
                handleAuth()
                redirect()
            }
            else
            {
                alert(result.errors)
                
            }
        })
    }

}

export const startGetAccountDetails=()=>{
    return(dispatch)=>{
        axios.get('http://dct-billing-app.herokuapp.com/api/users/account',{
            headers:{
                'Authorization':`Bearer ${localStorage.getItem('token')}`
            }
        })
        .then((response)=>{
            const result = response.data
            dispatch(getAccountData(result))
        })
        .catch((err)=>{
            console.log(err.message)
        })
    }
}

export const getAccountData=(result)=>{
    return{
        type:'SET_AccountData',
        payload:result
    }
}

