import React, { useEffect, useState } from "react";
import { View, Text, KeyboardAvoidingView, StyleSheet, Image, ScrollView, ActivityIndicator } from "react-native";
import { TextInput } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import AddEntryPopup from "./AddEntryPopup";
import { useFonts } from "expo-font";
import {
  Poppins_400Regular,
  Poppins_700Bold,
  Poppins_500Medium,
  Poppins_600SemiBold,
} from "@expo-google-fonts/poppins";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { deletePassword, getAllPassword } from "../reducer/password-slice";
import { Password } from "../module/Password";

export default function HomeScreen() {
  const [isSearching, setIsSearching] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // State to store the search query
  const passwords = useSelector((state: RootState) => state.password.password);
  const dispatch = useDispatch<AppDispatch>();
  const isAuth = useSelector((state: RootState) => state.user.isAuthenticated);
  const jwtToken = useSelector((state: RootState) => state.user.jwt_token);
  const userId = useSelector((state: RootState) => state.user.username);
  const isLoading = useSelector((state: RootState) => state.password.loading);
  const [type , setType] = useState("add");
  const [targetPassword , setTargetPassword] = useState<Password>();

  useEffect(() => {
    const sendData = {
      userId: userId ?? "",
      jwtToken: jwtToken ?? "",
    };
    dispatch(getAllPassword(sendData));
  }, []);

  const filteredPasswords = passwords.filter((password) => {
    return password.website.toLowerCase().includes(searchQuery.toLowerCase()) ||
           password.emailOrUsername.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold,
    Poppins_500Medium,
    Poppins_600SemiBold,
  });

  if (!fontsLoaded) {
    return <Text>Loading fonts...</Text>;
  }

  const handleAddPassword = () => {
    setType("add");
    setTargetPassword(undefined);
    setIsModalVisible(true);
  }

  const handleCloseSearch = () => {
    setIsSearching(false);
    setSearchQuery("");
  };

  const handleUpdatePopup = (password : Password) => {
    setType("update");
    console.log(type)
    setTargetPassword(password);
    setIsModalVisible(true);
  }

  const handleDeletePassword = (password : Password) => {
    const sendData = {
      passwordId : password.id ?? 0,
      jwtToken : jwtToken ?? ""
    }
    dispatch(deletePassword(sendData));
  }

  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={{ marginTop: 50 }}>
        {!isSearching ? (
          <View style={styles.navbar}>
            <Text style={styles.title}>My Vault</Text>
            <TouchableOpacity onPress={() => setIsSearching(true)}>
              <Ionicons name="search" size={24} color="#363636" />
            </TouchableOpacity>
          </View>
        ) : (
          <TextInput
            label="Search"
            mode="outlined"
            style={styles.inputExpanded}
            activeOutlineColor="#363636"
            value={searchQuery} // Bind the search query to the input value
            onChangeText={setSearchQuery} // Update the search query on change
            right={
              <TextInput.Icon icon="close" onPress={handleCloseSearch} />
            }
          />
        )}
      </View>

      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <ScrollView style={styles.scrollView}>
          {filteredPasswords && filteredPasswords.length > 0 ? (
            filteredPasswords.map((password, key) => (
              <TouchableOpacity key={key} style={styles.touchableMain}
                onPress={() => handleUpdatePopup(password)}
              >
                <View style={styles.touchableOpacity}>
                  <Image source={require("../assets/image copy 3.png")} style={styles.image} />
                  <View style={styles.textContainer}>
                    <Text style={styles.mainText}>{password.website}</Text>
                    <Text style={styles.subText}>{password.emailOrUsername}</Text>
                  </View>
                </View>
                <Icon name="delete" size={20} color="#363636" onPress={() => handleDeletePassword(password)} style ={{position : "absolute" , right : 0}} />
              </TouchableOpacity>
            ))
          ) : (
            <Text>No passwords found.</Text>
          )}
        </ScrollView>
      )}

      <TouchableOpacity
        onPress={handleAddPassword}
        style={styles.addButton}
      >
        <Icon name="add" size={28} color="#fff" />
      </TouchableOpacity>

      <AddEntryPopup
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        type={type}
        passwordData={targetPassword}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0efff",
    padding: 20,
  },
  navbar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#34259f",
    paddingBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#34259f",
    fontFamily: "Poppins_700Bold",
  },
  inputExpanded: {
    backgroundColor: "transparent",
    width: "100%",
  },
  scrollView: {
    flex: 1,
    width: "100%",
  },
  addButton: {
    backgroundColor: "#34259f",
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    position: "absolute",
    bottom: 20,
    right: 20,
  },
  touchableOpacity: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  touchableMain : {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#34259f",
    justifyContent : "space-between"
  },
  image: {
    width: 30,
    height: 30,
  },
  textContainer: {
    position: "relative",
    bottom: -3,
  },
  mainText: {
    fontFamily: "Poppins_500Medium",
    fontSize: 14,
  },
  subText: {
    fontFamily: "Poppins_400Regular",
    fontSize: 12,
    position: "relative",
    bottom: 4,
  },
});

