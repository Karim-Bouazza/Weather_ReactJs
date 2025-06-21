import { configureStore } from "@reduxjs/toolkit";
import { calcSlice } from "../features/calc/calcSlice";

export default configureStore ({
    reducer: {
        calc: calcSlice.reducer
    }
})