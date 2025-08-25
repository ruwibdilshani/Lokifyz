import React from "react";
import { View, StyleSheet } from "react-native";
import LottieView from "lottie-react-native";

const LoadingScreen = () => {
    return (
        <View style={styles.container}>
            <LottieView
                source={require("../assets/Safesecure.json")} // Lottie JSON file
                autoPlay
                loop
                style={{ width: 200, height: 200 }}
            />
        </View>
    );
};

export default LoadingScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
    },
});
