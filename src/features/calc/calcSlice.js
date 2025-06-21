import { createSlice, current } from "@reduxjs/toolkit";

export const calcSlice = createSlice({
    name: "calc",
    initialState: {
        result: null
    },
    reducers: {
        add: (currentState, action) => {
           const sum = Number(action.payload.number1) + Number(action.payload.number2);
           currentState.result = sum;
        },
        sub: (currentState, action) => {
            const sum = action.payload.number1 - action.payload.number2;
            currentState.result = sum
        },
        mul: (currentState, action) => {
            const sum = action.payload.number1 * action.payload.number2;
            currentState.result = sum;
        },
        div: (currentState, action) => {
            const sum = action.payload.number1 / action.payload.number2;
            currentState.result = sum;
        }
    }
})

export const { add, sub, mul, div } = calcSlice.actions;
export default calcSlice.reducer;