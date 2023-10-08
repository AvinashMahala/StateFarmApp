import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  Image,
  KeyboardAvoidingView,
  TextInput,
  Pressable,
  Alert,
} from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const DashboardScreen = () => {
  const navigation = useNavigation();

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("authToken");
      navigation.replace("Login");
    } catch (error) {
      Alert.alert("Error", "Failed to log out.");
    }
  };

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "white", alignItems: "center" }}
    >
      <Text
        style={{
          marginTop: 70,
          marginBottom: 20,
        }}
      >
        Dashboard After Logging In!
      </Text>
      <KeyboardAvoidingView>
        <Text>LogIn View.</Text>
      </KeyboardAvoidingView>

      <View style={styles.container}>
        <Text>Dashboard Screen</Text>
        <Pressable onPress={handleLogout} style={styles.logoutButton}>
          <Text style={styles.logoutText}>Logout</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    logoutButton: {
        marginTop: 20,
        padding: 15,
        backgroundColor: "#FF0000",
        borderRadius: 5
    },
    logoutText: {
        color: "white",
        fontWeight: "bold"
    }
});

export default DashboardScreen;
