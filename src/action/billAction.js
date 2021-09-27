import axios from "axios"
import swal from 'sweetalert'

export const startGetAllBill = () => {
    return (dispatch) => {
        axios.get('http://dct-billing-app.herokuapp.com/api/bills', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then((response) => {
                console.log('getbill', response)
                const result = response.data
                dispatch(getBillData(result))
            })
            .catch((err) => {
                swal({
                    text: err.message
                })
            })
    }
}
export const getBillData = (result) => {
    return {
        type: 'GET_BILLDATA',
        payload: result
    }
}

export const startPostBillData = (data, resetForm) => {
    return (dispatch) => {
        axios.post('http://dct-billing-app.herokuapp.com/api/bills', data, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then((response) => {
                const result = response.data
                dispatch(postBillData(result))
                resetForm()
            })
            .catch((err) => {
                swal({
                    text: err.message
                })
            })
    }
}
export const postBillData = (result) => {
    return {
        type: 'SET_BILLDATA',
        payload: result
    }
}

export const startDeleteBillData = (_id) => {
    return (dispatch) => {
        axios.delete(`http://dct-billing-app.herokuapp.com/api/bills/${_id}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then((response) => {
                const result = response.data
                console.log('delbill', result)
                dispatch(deleteBillData(result))
            })
            .catch((err) => {
                swal({
                    text: err.message
                })
            })
    }
}

export const deleteBillData = (result) => {
    return {
        type: 'DELETE_BILLDATA',
        payload: result
    }
}

export const startGetSingleBill = (_id, getSingleBillData) => {
    return (dispatch) => {
        axios.get(`http://dct-billing-app.herokuapp.com/api/bills/${_id}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then((response) => {
                console.log('getsinglebill', response)
                const result = response.data
                getSingleBillData(result)
            })
            .catch((err) => {
                swal({
                    text: err.message
                })
            })
    }
}
