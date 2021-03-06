import React, { useState } from 'react'
import '../css/App.css'
import { createStore }from 'redux'
import { Provider } from 'react-redux'
import cardReducer from '../reducers/reducer'
import ConnectedComponent from './ConnectedComponent'


const store = createStore(cardReducer)

function App() {

  return (
    <Provider store={store}>
      <ConnectedComponent/>
    </Provider>
  )
}

export default App

const styles = {
  P1 : {},
  AI_1 : {
    margin: 10
  },
  AI_2 : {},
  AI_3 : {}
}

