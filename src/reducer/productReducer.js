const productInitialState = []
const productReducer = (state = productInitialState, action) => {
    switch (action.type) {
        case 'GET_ALLPRODUCTS':
            {
                return [...action.payload]
            }
        case 'SET_PRODUCTDATA':
            {
                return [...state, action.payload]
            }
        case 'DELETE_PRODDATA':
            {
                return state.filter((ele) => {
                    return ele._id != action.payload._id
                })
            }
        case 'SET_UPDATEDATA':
            {
                return state.filter((ele) => {
                    if (ele._id == action.payload._id) {
                        return { ...ele, ...action.payload }
                    }
                    else {
                        return { ...ele }
                    }
                })
            }
        default:
            return [...state]
    }
}
export default productReducer
