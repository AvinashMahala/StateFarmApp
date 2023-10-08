import { Store } from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";
import userReducer from '../Slices/UserSlice/UserSlice.js';
import AnswerSlice from "../Slices/Answers/AnswerSlice.js";

const store = configureStore({
    reducer: {
        user : userReducer,
        answer : AnswerSlice,
    }
});

console.log(store.getState());

export default store;