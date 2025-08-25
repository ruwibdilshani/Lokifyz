import { useEffect, useState } from "react";
import LottieView from "lottie-react-native";

import {
  KeyboardAvoidingView,
  StyleSheet,
  Image,
  View,
  TouchableOpacity,
} from "react-native";
import { TextInput, Button, Text } from "react-native-paper";
import { useFonts } from "expo-font";
import {
  Poppins_400Regular,
  Poppins_700Bold,
  Poppins_500Medium,
  Poppins_600SemiBold
} from "@expo-google-fonts/poppins";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { login } from "../reducer/user-slice";

type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Master: undefined;
};

export default function LoginScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const dispatch = useDispatch<AppDispatch>();
  const loading = useSelector((state: RootState) => state.user.loading);
  const isAuth = useSelector((state: RootState) => state.user.isAuthenticated);
  const [tempLoading, setTempLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold,
    Poppins_500Medium,
    Poppins_600SemiBold
  });

  useEffect(() => {
    if (isAuth && tempLoading) {
      navigation.navigate("Master");
    }
  }, [isAuth, tempLoading]);

  const handleLogin = () => {
    setTempLoading(true);
    const sendData = { email, password };
    dispatch(login(sendData));
  };

  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }

  return (
    <KeyboardAvoidingView style={styles.container}>
      <LottieView
          source={require("../assets/Login.json")}
          autoPlay
          loop
          style={{ width: "100%", height: 400, marginBottom: -10 }}
      />
      <Text style={styles.title}>Welcome to Lokifyz</Text>
      <Text style={styles.subtitle}>Sign in to continue</Text>
      <TextInput
        label="Email"
        mode="outlined"
        style={styles.input}
        activeOutlineColor="#363636"
        onChangeText={setEmail}
      />
      <TextInput
        label="Password"
        mode="outlined"
        style={styles.input}
        activeOutlineColor="#363636"
        secureTextEntry
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>{loading ? "Loading..." : "Sign In"}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.registerLink}
        onPress={() => navigation.navigate("Register")}
      >
        <Text style={styles.registerText}>Don't have an account? <Text style={styles.registerLinkText}>Sign up</Text></Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F8FB",
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontFamily: "Poppins_700Bold",
    textAlign: "center",
    color: "#34259f",
  },
  subtitle: {
    color: "#9f93fb",
    textAlign: "center",
    fontFamily: "Poppins_500Medium",
    marginBottom: 20,
  },
  input: {
    backgroundColor: "transparent",
    marginBottom: 20,
    color: "#363636",
    fontFamily: "Poppins_400Regular",
  },
  button: {
    width: "100%",
    backgroundColor: "#34259f",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontFamily: "Poppins_500Medium",
  },
  registerLink: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "center",
  },
  registerText: {
    color: "#a99cff",
    fontFamily: "Poppins_400Regular",
  },
  registerLinkText: {
    color: "#34259f",
    fontFamily: "Poppins_600SemiBold",
  },
});
