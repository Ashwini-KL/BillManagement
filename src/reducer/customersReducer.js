const customersInitialState = []
const customersReducer = (state = customersInitialState, action) => {
    switch (action.type) {
        case 'GET_CUSTDATA':
            {
                return [...action.payload]
            }

        case 'SET_CUSTDATA':
            {
                return [...state, action.payload]
            }

        case 'SET_REMOVEDATA':
            {
                return state.filter((ele) => {
                    return ele._id != action.payload._id
                })
            }
        case 'SET_UPDATEDATA':
            {
                return state.map((ele) => {
                    if (ele._id == action.payload._id) {
                        return { ...ele, ...action.payload }
                    }
                    else {
                        return { ...ele }
                    }
                })
            }
        default:
            {
                return [...state]
            }
    }
}
export default customersReducer