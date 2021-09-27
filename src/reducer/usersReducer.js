const usersInitialState = []
const usersReducer = (state = usersInitialState, action) => {
    switch (action.type) {
        case 'GET_AccountData':
            {
                return { ...action.payload }
            }
        default:
            {
                return [...state]
            }
    }
}
export default usersReducer