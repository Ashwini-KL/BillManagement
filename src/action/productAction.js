import axios from "axios"
import swal from "sweetalert"

export const startGetAllProducts = () => {
    return (dispatch) => {
        axios.get('http://dct-billing-app.herokuapp.com/api/products', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then((response) => {
                const result = response.data
                console.log('prod', result)
                dispatch(getAllProducts(result))
            })
            .catch((err) => {
                swal({
                    text: err.message
                })
            })
    }
}

export const getAllProducts = (result) => {
    return {
        type: 'GET_ALLPRODUCTS',
        payload: result
    }
}
export const startPostProductData = (productData, resetForm) => {
    return (dispatch) => {
        axios.post('http://dct-billing-app.herokuapp.com/api/products', productData, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then((response) => {
                const result = response.data
                console.log('prod', result)
                dispatch(setProductData(result))
                resetForm()
            })
            .catch((err) => {
                swal({
                    text: err.message
                })
            })
    }
}

export const setProductData = (result) => {
    return {
        type: 'SET_PRODUCTDATA',
        payload: result
    }
}

export const startDeleteProdData = (_id) => {
    return (dispatch) => {
        axios.delete(`http://dct-billing-app.herokuapp.com/api/products/${_id}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then((response) => {
                const result = response.data
                console.log('delprod', result)
                dispatch(deleteProdData(result))
            })
            .catch((err) => {
                swal({
                    text: err.message
                })
            })
    }
}

export const deleteProdData = (result) => {
    return {
        type: 'DELETE_PRODDATA',
        payload: result
    }
}

export const startUpdateProdData = (data, resetForm, handleToggle, _id) => {
    return (dispatch) => {
        axios.put(`http://dct-billing-app.herokuapp.com/api/products/${_id}`, data, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then((response) => {
                const result = response.data
                console.log('p', result)
                dispatch(updateProdData(result))
                resetForm()
                handleToggle()
            })
            .catch((err) => {
                swal({
                    text: err.message
                })
            })
    }
}

export const updateProdData = (result) => {
    return {
        type: 'SET_UPDATEDATA',
        payload: result
    }
}