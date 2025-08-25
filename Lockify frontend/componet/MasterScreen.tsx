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
  Poppins_600SemiBold,
} from "@expo-google-fonts/poppins";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { loginInMasterPassword, logout } from "../reducer/user-slice";
import LottieView from "lottie-react-native";

type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Home: undefined;
};

export default function LoginScreen() {

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold,
    Poppins_500Medium,
    Poppins_600SemiBold,
  });

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [masterPassword, setMasterPassword] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const isMaster = useSelector((state: RootState) => state.user.isMaterLogin);
  const email = useSelector((state: RootState) => state.user.username);
  const jwtToken = useSelector((state: RootState) => state.user.jwt_token);
  const [tempLoading, setTempLoading] = useState(false);

  useEffect(() => {
    if (isMaster && tempLoading) {
      navigation.navigate("Home");
    }
  }, [isMaster]);

  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }

  const handleLogin = () => {
    setTempLoading(true);
    const sendData = {
      email: email,
      password: masterPassword,
      jwt_token: jwtToken,
    } as { email : string , password: string , jwt_token :string }

    dispatch(loginInMasterPassword(sendData));
  }

  const handleSwitch = () => {
    dispatch(logout()); // Dispatch logout action
    //navigation.navigate("Login"); // Navigate after logout action has been processed
  }

  return (
    <View style={styles.container}>
        <LottieView
            source={require("../assets/Change Passwords.json")}
            autoPlay
            loop
            style={{ width: "100%", height: 300, marginBottom: -10 }}
        />
      <Text
        style={{
          fontSize: 24,
          fontFamily: "Poppins_700Bold",
          textAlign: "center",
          color: "#34259f",
          marginTop: 20,
        }}
      >
        Welcome to Encrypto
      </Text>
      <Text
        style={{
          color: "#b0a6ff",
          textAlign: "center",
          fontFamily: "Poppins_500Medium",
          marginBottom: 20,
        }}
      >
        Enter master password to continue
      </Text>

      <TextInput
        label="Master Password"
        mode="outlined"
        style={styles.input}
        activeOutlineColor="#363636"
        value={masterPassword}
        onChangeText={(text) => setMasterPassword(text)}
      />
      <TouchableOpacity style={styles.button}
        onPress={handleLogin}
      >
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          marginTop: 20,
          flexDirection: "row",
          justifyContent: "center",
        }}
        onPress={handleSwitch}
      >
        <Text style={{ color: "#a79aff", fontFamily: "Poppins_400Regular" }}>
          If you wot to switch account ?{" "}
        </Text>
        <Text style={{ color: "#34259f", fontFamily: "Poppins_600SemiBold" }}>
          Sign In
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F8FB",
    padding: 20,
    fontFamily: "Poppins_400Regular",
    justifyContent: "center",
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
});
