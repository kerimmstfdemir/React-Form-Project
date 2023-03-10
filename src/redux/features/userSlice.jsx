import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    loading: false,
    error: false,
    user: {},
    productsData: []
}

const token = process.env.REACT_APP_TOKEN

//* postApp
export const postApp = createAsyncThunk(
    "postApp/postApp",
    async (data, thunkAPI) => {
        try{
            const response = await axios.post(
                "https://api.kitapbulal.com/chat/add", data, {
                    headers: {
                        Authorization: `sAuth ${token}`
                    }
                }
            )
        } catch(error) {
            console.log(error.message)
        }
    }
)

export const getProductsData = createAsyncThunk(
    "product/getProductData",
    async () => {
        try {
            const response = await fetch("https://api.kitapbulal.com/test/getproducts")
            return response.json()
        } catch (error) {
            return console.log(error.message)
        }
    }
)

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getProductsData.pending, (state) => {
            state.loading = true;
        }).addCase(getProductsData.fulfilled, (state, action) => {
            state.loading = false;
            state.productsData = action.payload
            state.error = false;
        }).addCase(getProductsData.rejected, (state) => {
            state.loading = true;
            state.error = true;
        })
    }
})

export default userSlice.reducer;