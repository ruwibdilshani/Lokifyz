import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Password } from "../module/Password";
import axios, { head } from "axios";

const initialState: {
    loading : boolean
    error : string
    password : Password[]
} = {
    loading: false,
    error: "",
    password: []
}

const api = axios.create({
    baseURL: "http://192.168.8.103:5000"
})

export const cretaePassword = createAsyncThunk(
    'password/createPassword',
    async (data : {password : Password , jwtToken : string}) => {
        console.log(data)
        try {
            const response = await api.post("/passwords/save-password", data.password, {
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${data.jwtToken}`
                }
            })
            return response.data as Password
        } catch (error) {
            console.error(error)
            throw error
        }
    }
)

export const getAllPassword = createAsyncThunk<Password[], { userId: string, jwtToken: string }>(
    'password/getAllPassword',
    async (data : {userId : string , jwtToken : string}): Promise<Password[]> => {
        try {
            const response = await api.get("/passwords/get-passwords/"+data.userId, {
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${data.jwtToken}`
                }
            })
            return response.data as Password[]
        } catch (error) {
            console.error(error)
            throw error
        }
    }
)

export const updatePassword = createAsyncThunk(
    'password/updatePassword',
    async (data : {password : Password , jwtToken : string}) => {
        try {
            const response = await api.put("/passwords/update-password", data.password, {
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${data.jwtToken}`
                }
            })
            return response.data as Password
        } catch (error) {
            console.error(error)
            throw error
        }
    }
)

export const deletePassword = createAsyncThunk(
    'password/deletePassword',
    async (data : {passwordId : number , jwtToken : string}) => {
        try {
            const response = await api.delete("/passwords/delete-password/"+data.passwordId, {
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${data.jwtToken}`
                }
            })
            return response.data as Password
        } catch (error) {
            console.error(error)
            throw error
        }
    }
)

const passwordSlice = createSlice({
    name: "password",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(cretaePassword.pending, (state, action) => {
                console.log("Creating password")
                state.loading = true
            })
            .addCase(cretaePassword.fulfilled, (state, action) => {
                console.log("Password created")
                state.loading = false
                state.password.push(action.payload)
                alert("Password created")
            })
            .addCase(cretaePassword.rejected, (state, action) => {
                console.log("Password creation failed")
                state.loading = false
                state.error = action.error.message || ""
            })
        builder
            .addCase(getAllPassword.pending, (state, action) => {
                console.log("Getting all password")
                state.loading = true
            })
            .addCase(getAllPassword.fulfilled, (state, action) => {
                console.log("All password fetched")
                state.loading = false
                console.log(action.payload)
                state.password = action.payload
            })
            .addCase(getAllPassword.rejected, (state, action) => {
                console.log("All password fetch failed")
                state.loading = false
                state.error = action.error.message || ""
            })
        builder
            .addCase(updatePassword.pending, (state, action) => {
                console.log("Updating password")
                state.loading = true
            })
            .addCase(updatePassword.fulfilled, (state, action) => {
                console.log("Password updated")
                state.loading = false
                state.password = state.password.map((password) => {
                    if (password.id === action.payload.id) {
                        return action.payload
                    }
                    return password
                })
                alert("Password updated")
            })
            .addCase(updatePassword.rejected, (state, action) => {
                console.log("Password update failed")
                state.loading = false
                state.error = action.error.message || ""
            })
        builder
            .addCase(deletePassword.pending, (state, action) => {
                console.log("Deleting password")
                state.loading = true
            })
            .addCase(deletePassword.fulfilled, (state, action) => {
                console.log("Password deleted")
                state.loading = false
                alert("Password deleted")
                state.password = state.password.filter((password) => password.id !== action.payload.id)
            })
            .addCase(deletePassword.rejected, (state, action) => {
                console.log("Password deletion failed")
                state.loading = false
                state.error = action.error.message || ""
            })
    }
})

export default passwordSlice.reducer
