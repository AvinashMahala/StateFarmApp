import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  Image,
  KeyboardAvoidingView,
  TextInput,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { Alert } from "react-native";

const apiUrl = "http://10.182.235.82:8009/";

const RegisterScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigation = useNavigation();
  const handleRegister = () => {
    // Check if any of the fields is empty
    if (!name || !email || !password) {
      Alert.alert("Validation Error", "Please fill in all the fields.");
      return; // Don't proceed with the registration if any field is empty
    }

    const user = {
      name: name,
      email: email,
      password: password,
    };

    //Send a Post request to the backend API.
    axios
      .post(apiUrl + "register", user)
      .then((response) => {
        Alert.alert(
          "Registration Successful!",
          "You have registered successfully."
        );
        //console.log(response);
        setName("");
        setPassword("");
        setEmail("");
        navigation.navigate('Dashboard');
      })
      .catch((error) => {
        console.log(error);
        Alert.alert(
          "Registration Failed",
          "An error occurred while registering."
        );
      });

  };

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "white", alignItems: "center" }}
    >
      <View>
      <Image
          style={{ width: 270, height: 200, marginTop: 80 }}
          source={require("./../assets/logo.png")}
        />
      </View>
      <KeyboardAvoidingView>
        <View style={{ alignItems: "center" }}>
          <Text style={{ fontSize: 24, fontWeight: "bold", marginTop: 20 }}>
            Register To Your Account
          </Text>
        </View>

        <View style={{ marginTop: 30 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
              backgroundColor: "#D0D0D0",
              paddingVertical: 5,
              borderRadius: 5,
              marginTop: 30,
            }}
          >
            <Ionicons
              style={{ marginLeft: 8 }}
              name="ios-person"
              size={24}
              color="gray"
            />
            <TextInput
              value={name}
              onChangeText={(text) => setName(text)}
              style={{
                color: "gray",
                marginVertical: 10,
                width: 300,
                fontSize: name ? 16 : 16,
              }}
              placeholder="Enter your Name "
            />
          </View>
        </View>

        <View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
              backgroundColor: "#D0D0D0",
              paddingVertical: 5,
              borderRadius: 5,
              marginTop: 30,
            }}
          >
            <MaterialIcons
              style={{ marginLeft: 8 }}
              name="email"
              size={24}
              color="gray"
            />
            <TextInput
              value={email}
              onChangeText={(text) => setEmail(text)}
              style={{
                color: "gray",
                marginVertical: 10,
                width: 300,
                fontSize: email ? 16 : 16,
              }}
              placeholder="Enter your Email "
            />
          </View>
        </View>

        <View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
              backgroundColor: "#D0D0D0",
              paddingVertical: 5,
              borderRadius: 5,
              marginTop: 30,
            }}
          >
            <AntDesign
              style={{ marginLeft: 8 }}
              name="lock1"
              size={24}
              color="gray"
            />
            <TextInput
              value={password}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry={true}
              style={{
                color: "gray",
                marginVertical: 10,
                width: 300,
                fontSize: password ? 16 : 16,
              }}
              placeholder="Enter your Password "
            />
          </View>
        </View>

        <View
          style={{
            marginTop: 12,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text>Keep Me Logged In</Text>
          <Text style={{ color: "#007FFF", fontWeight: "500" }}>
            Forgot Password
          </Text>
        </View>

        <View style={{ marginTop: 60 }} />

        <Pressable
          onPress={handleRegister}
          style={{
            width: 200,
            backgroundColor: "#0F4C81",
            borderRadius: 6,
            marginLeft: "auto",
            marginRight: "auto",
            padding: 15,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              color: "white",
              fontSize: 20,
              fontWeight: "bold",
            }}
          >
            Register
          </Text>
        </Pressable>

        <Pressable
          onPress={() => navigation.navigate("Login")}
          style={{ textAlign: "center", color: "gray", fontSize: 16 }}
        >
          <Text
            style={{
              textAlign: "center",
              color: "gray",
              fontSize: 16,
              marginTop: 20,
            }}
          >
            Already Have An Account? Sign In
          </Text>
        </Pressable>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({});
