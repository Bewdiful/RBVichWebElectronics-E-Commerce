import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isLoading: false,
    productList: [],
    error: null, // Added error state
};

export const addNewProduct = createAsyncThunk(
    "/products/addnewproduct",
    async (formData) => {
        const result = await axios.post(
            `${import.meta.env.VITE_BASEURL_FOR_SERVER}/api/admin/products/add`,
            formData,
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        return result?.data;
    }
);

export const fetchAllProducts = createAsyncThunk(
    "/products/fetchAllProducts",
    async () => {
        const result = await axios.get(
            `${import.meta.env.VITE_BASEURL_FOR_SERVER}/api/admin/products/get`
        );

        return result?.data;
    }
);

export const editProduct = createAsyncThunk(
    "/products/editProduct",
    async ({ id, formData }) => {
        const result = await axios.put(
            `${import.meta.env.VITE_BASEURL_FOR_SERVER}/api/admin/products/edit/${id}`,
            formData,
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        return result?.data;
    }
);

export const deleteProduct = createAsyncThunk(
    "/products/deleteProduct",
    async (id) => {
        const result = await axios.delete(
            `${import.meta.env.VITE_BASEURL_FOR_SERVER}/api/admin/products/delete/${id}`
        );

        return result?.data;
    }
);

const AdminProductsSlice = createSlice({
    name: "adminProducts",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllProducts.pending, (state) => {
                state.isLoading = true;
                state.error = null; // Reset error on loading
            })
            .addCase(fetchAllProducts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.productList = action.payload.data;
                state.error = null; // Reset error on success
            })
            .addCase(fetchAllProducts.rejected, (state, action) => {
                state.isLoading = false;
                state.productList = [];
                state.error = action.error.message;
            })
            .addCase(addNewProduct.rejected, (state, action) => {
                state.error = action.error.message;
            })
            .addCase(editProduct.rejected, (state, action) => {
                 state.error = action.error.message;
            })
            .addCase(deleteProduct.rejected, (state, action) => {
                 state.error = action.error.message;
            });
    },
});

export default AdminProductsSlice.reducer;