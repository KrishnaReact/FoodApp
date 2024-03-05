import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const foodDataSlice=createSlice({
    name:'FoodItemSlice',
    initialState: {
        data: [],
        isLoading: true,
        error: ''
    },
})

export default foodDataSlice.reducer;