import { combineReducers, createStore,applyMiddleware} from "redux"
import usersReducer from "../reducer/usersReducer"
import thunk from 'redux-thunk'
import customersReducer from "../reducer/customersReducer"
import productReducer from "../reducer/productReducer"
import billReducer from "../reducer/billReducer"

const configureStore = ()=>{
    const store = createStore(combineReducers({
                  user:usersReducer,
                  customers:customersReducer,
                  products:productReducer,
                  bill:billReducer
    }),applyMiddleware(thunk))
    return store

}
export default configureStore