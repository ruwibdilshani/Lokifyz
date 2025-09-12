import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState: {
    jwt_token: string | null,
    refresh_token: string | null,
    username: string | null,
    isAuthenticated: boolean,
    loading: boolean,
    error: string
    isMaterLogin: boolean
    hydrated: boolean,
} = {
    jwt_token: null,
    refresh_token: null,
    username: null,
    isAuthenticated: false,
    loading: false,
    error: "" ,
    isMaterLogin: false,
    hydrated: false,
}

const api = axios.create({
    baseURL: "http://192.168.89.196:5000"
})

const storeTokens = async (token: string, refreshToken: string, userEmail: string) => {
    try {
        await AsyncStorage.setItem("jwt_token", token);
        await AsyncStorage.setItem("refresh_token", refreshToken);
        await AsyncStorage.setItem("username", userEmail);
    } catch (error) {
        console.error("Error storing tokens:", error);
    }
};

export const initializeUser = createAsyncThunk("user/initializeUser", async () => {
    try {
      const token = await AsyncStorage.getItem("jwt_token");
      const refreshToken = await AsyncStorage.getItem("refresh_token");
      const username = await AsyncStorage.getItem("username");

      return {
        jwt_token: token,
        refresh_token: refreshToken,
        username: username,
        isAuthenticated: !!token,
      };
    } catch (error) {
      console.error("Error fetching stored data:", error);
      return initialState;
    }
  });

export const register = createAsyncThunk<{ token: string, refreshToken: string, userEmail: string }, any>(
    "user/register",
    async (user): Promise<{ token: string, refreshToken: string, userEmail: string }> => {
        try{
            console.log(user);
            const response = await api.post("/auth/register", user , {withCredentials: true});
            return response.data as { token: string, refreshToken: string, userEmail: string };
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
)

export const  login = createAsyncThunk<{ token: string, refreshToken: string, userEmail: string }, any>(
    "user/login",
    async (user): Promise<{ token: string, refreshToken: string, userEmail: string }> => {
        try{
            console.log(user);
            const response = await api.post("/auth/login", user , {withCredentials: true});
            if(response.status === 200){
                const { token, refreshToken, userEmail } = response.data as { token: string, refreshToken: string, userEmail: string };
                await storeTokens(token, refreshToken, userEmail);
            }
            return response.data as { token: string; refreshToken: string; userEmail: string };
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
)

export const loginInMasterPassword = createAsyncThunk<{ token: string, refreshToken: string, userEmail: string }, any>(
    "user/loginInMasterPassword",
    async (comingData : { email : string , password: string , jwt_token :string }) => {
        try{
            const sendData = {
                email : comingData.email,
                masterPassword: comingData.password
            }
            console.log(sendData);
            const response = await api.post("/user/check-master-password", sendData, {
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${comingData.jwt_token}`
                }
            });
            return response.data as { token: string; refreshToken: string; userEmail: string };
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
)

const userSlice = createSlice({
    name : "userReducer",
    initialState,
    reducers :{
        logout: (state) => {
            state.jwt_token = null;
            state.refresh_token = null;
            state.username = null;
            state.isAuthenticated = false;
            state.isMaterLogin = false;
            state.hydrated = false;
            AsyncStorage.clear();
        } ,
        setHydratedTrue: (state) => {
            state.hydrated = true;
        }
    },
    extraReducers (builder) {
        builder
            .addCase(register.pending, (state) => {
                state.loading = true;
            })
            .addCase(register.fulfilled, (state, action: { payload: { token: string, refreshToken: string, userEmail: string } }) => {
                console.log(action.payload);
                state.loading = false;
                state.isAuthenticated = true;
                state.jwt_token = action.payload.token;
                state.refresh_token = action.payload.refreshToken;
                state.username = action.payload.userEmail;
            })
            .addCase(register.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "";
                console.error(action.error);
            })
        builder
            .addCase(login.pending, (state) => {
                state.loading = true;
            })
            .addCase(login.fulfilled, (state, action: { payload: { token: string, refreshToken: string, userEmail: string } }) => {
                console.log(action.payload);
                state.loading = false;
                state.isAuthenticated = true;
                state.jwt_token = action.payload.token;
                state.refresh_token = action.payload.refreshToken;
                state.username = action.payload.userEmail;
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "";
                console.error(action.error);
                alert("wrong email or password");
            })
        builder
            .addCase(loginInMasterPassword.pending, (state) => {
                state.loading = true;
            })
            .addCase(loginInMasterPassword.fulfilled, (state, action: { payload: { token: string, refreshToken: string, userEmail: string } }) => {
                console.log(action.payload);
                state.loading = false;
                state.isMaterLogin = true;
            })
            .addCase(loginInMasterPassword.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "";
                console.error(action.error);
                alert("wrong master password");
            })

        builder
            .addCase(initializeUser.pending, (state) => {
                state.hydrated = false;
            })
            .addCase(initializeUser.fulfilled, (state, action) => {
                state.hydrated = true;
                state.isAuthenticated = action.payload.isAuthenticated;
                state.jwt_token = action.payload.jwt_token;
                state.refresh_token = action.payload.refresh_token;
                state.username = action.payload.username;
            })
            .addCase(initializeUser.rejected, (state) => {
                state.hydrated = true;
            })
    }
})

export const { logout , setHydratedTrue } = userSlice.actions;
export default userSlice.reducer;
