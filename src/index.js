import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import configureStore from './store/configureStore'

import 'bootstrap/dist/css/bootstrap.min.css'

const store = configureStore()
console.log(store.getState())

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
