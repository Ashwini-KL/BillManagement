import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import configureStore from './store/configureStore'
import { startGetAllCustomers } from "./action/customersAction"
import { startGetAllProducts } from "./action/productAction"
import { startGetAllBill } from "./action/billAction"
import 'bootstrap/dist/css/bootstrap.min.css'

const store = configureStore()
console.log(store.getState())
const token = localStorage.getItem('token')

if (token) {
  store.dispatch(startGetAllCustomers())
  store.dispatch(startGetAllProducts())
  store.dispatch(startGetAllBill())
}

store.subscribe(() => {
  console.log(store.getState())
})

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
  ,
  document.getElementById('root')
)
