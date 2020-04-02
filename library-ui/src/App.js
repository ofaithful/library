import React from 'react'
import './App.css'
import { Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import axios from 'axios'

import Routes from './routes/routes'
import { store, history } from './store/store'

function App() {
  return (
    <Provider store={store}>
      <div className='App'>
        <Router history={history}>
          <Routes />
        </Router>
      </div>
    </Provider>
  )
}

export default App;
