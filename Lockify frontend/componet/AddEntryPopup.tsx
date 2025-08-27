import React, { useEffect, useState } from "react";
import { View, Text, Modal, StyleSheet, TouchableOpacity } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
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
import { Password } from "../module/Password";
import { cretaePassword, updatePassword } from "../reducer/password-slice";

// Function to generate a random strong password
const generateRandomPassword = () => {
  const length = 12;
  const charset =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_-+=<>?";
  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }
  return password;
};

interface AddEntryPopupProps {
  visible: boolean;
  onClose: () => void;
  type: string;
  passwordData ?: Password;
}

const AddEntryPopup: React.FC<AddEntryPopupProps> = ({ visible, onClose , type , passwordData }) => {
  console.log("coming    ",passwordData);
  const [generatedPassword, setGeneratedPassword] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const userId = useSelector((state: RootState) => state.user.username);
  const jwt_token = useSelector((state: RootState) => state.user.jwt_token);
  const dispatch = useDispatch<AppDispatch>();
  const isLoading = useSelector((state: RootState) => state.password.loading);
  const [tempLoading, setTempLoading] = useState(false);

  useEffect(() => {
    if (isLoading && tempLoading) {
      onClose();
    }
  }, [isLoading]);

  useEffect(() => {
    if (passwordData) {
      setName(passwordData.website || "");
      setUsername(passwordData.emailOrUsername || "");
      setPassword(passwordData.password || "");
    } else {
      setName("");
      setUsername("");
      setPassword("");
    }
  }, [passwordData]);
  

  const handleSave = () => {
    if (type === "add") {
      setTempLoading(true);
      const Sendpassword = new Password(0,username,password,name,userId ?? "");
      const sendData = {
        password : Sendpassword,
        jwtToken : jwt_token ?? ""
      }
      dispatch(cretaePassword(sendData));
    } else {
      const sendData = new Password(passwordData?.id ?? 0,username,password,name,userId ?? "");
      const data = {
        password : sendData,
        jwtToken : jwt_token ?? ""
      }
      dispatch(updatePassword(data));
    }
  };

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold,
    Poppins_500Medium,
    Poppins_600SemiBold
  });

  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  } 

  return (
    <Modal visible={visible} animationType="slide" transparent={true} onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>{
            type === "add" ? "Add New Password" : "Update Password"  
          }</Text>

          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Ionicons name="close" size={24} color="#000" />
          </TouchableOpacity>

          <TextInput
            label="Name (e.g., Website Name)"
            value={name}
            onChangeText={(text) => setName(text)}
            style={styles.input}
            mode="outlined"
          
          />
          <TextInput
            label="Username or Email"
            value={username}
            onChangeText={(text) => setUsername(text)}
            style={styles.input}
            activeOutlineColor="#363636"
            mode="outlined"
          />
          <View style={styles.passwordInputContainer}>
            <TextInput
              label="Password"
              secureTextEntry={!showPassword} // Toggle secureTextEntry based on showPassword state
              value={password}
              onChangeText={(text) => setPassword(text)}
              style={styles.input}
              mode="outlined"
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Ionicons
                name={showPassword ? "eye-off" : "eye"}
                size={18}
                color="#000"
                style={styles.eyeIcon}
              />
            </TouchableOpacity>
          </View>

          <Button
            mode="contained"
            onPress={() => {
              const newPassword = generateRandomPassword();
              setPassword(newPassword);
              setGeneratedPassword(newPassword);
            }}
            style={styles.generatePasswordButton}
          >
            Generate Random Password
          </Button>

          <Button mode="contained" onPress={handleSave} style={styles.saveButton}>
            {
              type === "add" ? "Add" : "Update"
            }
          </Button>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    width: "80%",
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: "Poppins_600SemiBold",
    marginBottom: 20,
  },
  closeButton: {
    position: "absolute",
    top: 20,
    right: 10,
    padding: 5,
  },
  input: {
    height: 40,
    borderRadius: 5,
    marginBottom: 15,
    paddingLeft: 0,
    width: "100%",
    fontFamily: "Poppins_400Regular",
    backgroundColor: "transparent",
  },
  generatePasswordButton: {
    marginBottom: 20,
  },
  saveButton: {
    backgroundColor: "#363636",
    width: "100%",
    fontFamily: "Poppins_500Medium",
  },
  passwordInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    fontFamily: "Poppins_500Medium",
  },
  eyeIcon: {
    position: "absolute",
    right: 10,
    top: -15,
  },
});

export default AddEntryPopup;
