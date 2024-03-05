
import { configureStore } from '@reduxjs/toolkit'
import { createStore, applyMiddleware } from 'redux'
import foodDataReducer from '../redux/foodItemSlice'


const store = configureStore({
   reducer: {
      foodData: foodDataReducer,
   }
})
export default store