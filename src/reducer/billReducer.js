const billInitialState = []
const billReducer = (state = billInitialState, action) => {
    switch (action.type) {
        case 'GET_BILLDATA':
            {
                return [...action.payload]
            }
        case 'SET_BILLDATA':
            {
                return [...state, action.payload]
            }
        case 'DELETE_BILLDATA':
            {
                return state.filter((ele) => {
                    return ele._id != action.payload._id
                })
            }
        default:
            {
                return [...state]
            }
    }
}
export default billReducer