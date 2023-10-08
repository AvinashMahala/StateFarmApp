import { createSlice ,nanoid } from '@reduxjs/toolkit';


const initialState = {
   
    assetType: null,
    model : null,
    age: null,
    mileage: null,
    lastService : null,
};

const AnswerSlice = createSlice({

    name : 'answer',
    initialState,
    reducers:{
        saveAnswers : (state, action) =>{
            return state= action.payload;
        },
        getAnswer : (state,action) => {
            return state;
        },
        removeAnswer : (state,action) => {
            state = {...initialState};
        },
        updateAnswer :(state,action) => {
            state =  {...action.payload};
        },
        default : (state, action) => {
            return {...state};
        },
},
});

export const { saveAnswers, removeAnswer, updateAnswer,getAnswer} = AnswerSlice.actions;

export default AnswerSlice.reducer;