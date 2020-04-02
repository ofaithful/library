import { composeWithDevTools } from 'redux-devtools-extension'
import { applyMiddleware, createStore } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { createBrowserHistory } from 'history'

import reducers from '../reducers'
import sagas from '../sagas'

const sagaMiddleware = createSagaMiddleware()

export const store = createStore(reducers, composeWithDevTools(applyMiddleware(sagaMiddleware)))
sagaMiddleware.run(sagas)

export const history = createBrowserHistory()