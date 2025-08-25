import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Provider, useDispatch, useSelector } from "react-redux";
import { store, RootState, AppDispatch } from "./store/store";
import { initializeUser, logout } from "./reducer/user-slice";
import LoginScreen from "./componet/LoginScreen";
import RegisterScreen from "./componet/RegisterScreen";
import MasterScreen from "./componet/MasterScreen";
import HomeScreen from "./componet/HomeScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoadingScreen from "./componet/LoadingScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <AuthNavigator />
    </Provider>
  );
}

const AuthNavigator = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isAuthenticated, hydrated } = useSelector((state: RootState) => state.user);
  const [isToken, setIsToken] = useState<boolean | null>(null); // Use null to indicate loading state

  useEffect(() => {
    // Initialize user data when app starts
    dispatch(initializeUser());
  }, [dispatch]);

  useEffect(() => {
    const checkAuth = async () => {
      const token = await AsyncStorage.getItem("jwt_token");
      console.log(token); // Log the token value to check what's being retrieved
      if (!token) {
        dispatch(logout());
        setIsToken(false); // No token, logged out
      } else {
        setIsToken(true); // Token exists, logged in
      }
    };

    // Check authentication on app load (runs once)
    checkAuth();
  }, [dispatch , isAuthenticated]);

  if (isToken === null) {
    return <LoadingScreen />; // Avoid rendering anything before the authentication check is complete
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          gestureEnabled: true,
          cardStyleInterpolator: ({ current, layouts }) => ({
            cardStyle: {
              transform: [
                {
                  translateX: current.progress.interpolate({
                    inputRange: [0, 1],
                    outputRange: [layouts.screen.width, 0],
                  }),
                },
              ],
            },
          }),
        }}
      >
        {isToken ? (
          <>
            <Stack.Screen name="Master" component={MasterScreen} />
            <Stack.Screen name="Home" component={HomeScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
