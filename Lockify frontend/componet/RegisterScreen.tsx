import {
  KeyboardAvoidingView,
  StyleSheet,
  View,
  TouchableOpacity,
} from "react-native";
import { TextInput, Button, Text, Checkbox } from "react-native-paper";
import {
  Poppins_400Regular,
  Poppins_700Bold,
  Poppins_500Medium,
  Poppins_600SemiBold,
} from "@expo-google-fonts/poppins";
import { useFonts } from "expo-font";
import React, { useEffect, useState } from "react";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { register } from "../reducer/user-slice";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import LottieView from "lottie-react-native"; // Import for the eye icon

type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Home: undefined;
};

export default function RegisterScreen() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold,
    Poppins_500Medium,
    Poppins_600SemiBold,
  });

  const isAuth = useSelector((state: RootState) => state.user.isAuthenticated);
  const loading = useSelector((state: RootState) => state.user.loading);
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [isChecked, setIsChecked] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [masterPassword, setMasterPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const [showMasterPassword, setShowMasterPassword] = useState(false); // State for master password visibility
  const [tempLoading, setTempLoading] = useState(false);

  useEffect(() => {
    if (isAuth && tempLoading) {
      navigation.navigate("Login");
    }
  }, [isAuth]);

  const handleRegister = () => {
    setTempLoading(true);
    dispatch(
      register({
        email: email,
        password: password,
        masterPassword: masterPassword,
      })
    );
    if (isAuth) {
      navigation.navigate("Login");
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
        <LottieView
            source={require("../assets/register.json")}
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
          marginVertical: -5,
        }}
      >
        Welcome to Lokifyz
      </Text>
      <Text
        style={{
          color: "#9e90ff",
          textAlign: "center",
          fontFamily: "Poppins_500Medium",
          marginBottom: 20,
        }}
      >
        Sign up to continue
      </Text>
      <TextInput
        label="Email"
        mode="outlined"
        style={styles.input}
        activeOutlineColor="#363636"
        onChangeText={(text) => setEmail(text)} // Corrected here
      />
      <View style={styles.passwordContainer}>
        <TextInput
          label="Password"
          mode="outlined"
          style={styles.input}
          activeOutlineColor="#363636"
          secureTextEntry={!showPassword} // Conditionally toggle password visibility
          onChangeText={(text) => setPassword(text)}
        />
        <TouchableOpacity
          style={styles.eyeIcon}
          onPress={() => setShowPassword(!showPassword)}
        >
          <MaterialCommunityIcons
            name={showPassword ? "eye-off" : "eye"} // Toggle icon
            size={24}
            color="gray"
          />
        </TouchableOpacity>
      </View>
      <View style={styles.passwordContainer}>
        <TextInput
          label="Master Password"
          mode="outlined"
          style={styles.input}
          activeOutlineColor="#363636"
          secureTextEntry={!showMasterPassword} // Conditionally toggle master password visibility
          onChangeText={(text) => setMasterPassword(text)}
        />
        <TouchableOpacity
          style={styles.eyeIcon}
          onPress={() => setShowMasterPassword(!showMasterPassword)}
        >
          <MaterialCommunityIcons
            name={showMasterPassword ? "eye-off" : "eye"} // Toggle icon
            size={24}
            color="gray"
          />
        </TouchableOpacity>
      </View>
      <View
        style={{ flexDirection: "row", alignItems: "center", marginBottom: 20 }}
      >
        <Checkbox
          status={isChecked ? "checked" : "unchecked"}
          onPress={() => setIsChecked(!isChecked)}
        />
        <Text style={{ fontFamily: "Poppins_500Medium" }}>
          I agree to the terms and conditions
        </Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          marginTop: 20,
          flexDirection: "row",
          justifyContent: "center",
        }}
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={{ color: "#ad9eff", fontFamily: "Poppins_400Regular" }}>
          If you have one ?{" "}
        </Text>
        <Text style={{ color: "#34259f", fontFamily: "Poppins_600SemiBold" }}>
          Sign In
        </Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F8FB",
    padding: 20,
    paddingTop: 50,
    justifyContent: "center",
    fontFamily: "Poppins_400Regular",
  },
  input: {
    backgroundColor: "transparent",
    marginBottom: 20,
    color: "#363636",
    fontFamily: "Poppins_400Regular",
  },
  passwordContainer: {
    position: "relative",
    marginBottom: 20,
  },
  eyeIcon: {
    position: "absolute",
    right: 10,
    top: 20,
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
