import axios from "axios"
import swal from "sweetalert"
export const startGetAllCustomers=()=>{
    return(dispatch)=>{
        axios.get('http://dct-billing-app.herokuapp.com/api/customers',{
        headers:{
            'Authorization':`Bearer ${localStorage.getItem('token')}`
        }
    })
        .then((response)=>{
            //console.log('getcust',response)
            const result = response.data
            dispatch(getCustData(result))        
        })
        .catch((err)=>{
            console.log(err.message)
        })
    }

}

export const startPostCustomerData = (formData,resetForm,handleAddForm)=>{
    return(dispatch)=>{
        axios.post('http://dct-billing-app.herokuapp.com/api/customers',formData,{
        headers:{
            'Authorization':`Bearer ${localStorage.getItem('token')}`
        }
    })
        .then((response)=>{
            console.log('custpost',response)
            const result = response.data
            dispatch(setCustData(result))
            resetForm()
            handleAddForm()
        })
    }
}


export const startDeleteCustData = (_id)=>{
return(dispatch)=>{
    axios.delete(`http://dct-billing-app.herokuapp.com/api/customers/${_id}`,{
        headers:{
            'Authorization':`Bearer ${localStorage.getItem('token')}`
        }
        })
        .then((response)=>{
            console.log('del',response)
            const result = response.data
            dispatch(deleteData(result))
        })
        .catch((err)=>{
            console.log(err.message)
        })

}
}

export const startUpdateCustData=(data,resetForm,handleToggle,_id)=>{
    return(dispatch)=>{
        axios.put(`http://dct-billing-app.herokuapp.com/api/customers/${_id}`,data,{
            headers:{
                'Authorization':`Bearer ${localStorage.getItem('token')}`
            }
        })
        .then((response)=>{
            //console.log('put',response)
            const result = response.data
            console.log('r',result)
             dispatch(updateData(result))  
             resetForm()
             handleToggle()   
        })
        .catch((err)=>{
            console.log(err.message)
        })
    }

}

export const getCustData=(result)=>{
    return{
        type:'GET_CUSTDATA',
        payload:result
    }
}
export const setCustData=(result)=>{
    return{
        type:'SET_CUSTDATA',
        payload:result
    }
}

export const deleteData = (result)=>{
    return{
        type:'SET_REMOVEDATA',
        payload:result
    }
}

export const updateData = (result)=>{
    return{
        type:'SET_UPDATEDATA',
        payload:result
    }
}