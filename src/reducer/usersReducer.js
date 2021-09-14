const usersInitialState=[]
const usersReducer = (state=usersInitialState,action)=>{
switch(action.type)
{
 
    case 'SET_AccountData':
        {
            return {...action.payload}
        }
    default:
        {
        return [...state]
        }
}
}
export default usersReducer