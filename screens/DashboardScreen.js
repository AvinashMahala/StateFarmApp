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
  ImageBackground,
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
      style={{
        flex: 1,
        backgroundColor: "white",
        alignItems: "center",
        height: 1300,
        flexDirection: "column",
        justifyContent: "space-around",
        overflow: "scroll",
      }}
    >

<View style={styles.header}>
        <Text style={styles.headerText}>Dashboard</Text>
      </View>

      <View style={styles.body}>
        <Pressable onPress={(e)=>{
          navigation.navigate('Login');
        }} >
        <View style={styles.child11}>
        <Text style={styles.title}>Basic Plan</Text>
        <View style={styles.body}>
          <Text style={styles.pricing}>{"Pricing  "}</Text>
          {/* <Text style={styles.subtit}>
            {"Basic and Essential Coverage"}
          </Text> */}
          <Text style={styles.desc}>
            {"This Plan covers the most essential features"}
          </Text>
          <Text style={styles.desc}>{`Maintainance `}</Text>
        </View>
      </View>
      </Pressable>
      <Pressable onPress={(e)=>{
          navigation.navigate('Login');
        }} >
      <View style={styles.child11}>
        <Text style={styles.title}>Recommended {"\t\t\tPlan"}</Text>
        <View style={styles.body}>
          <Text style={styles.pricing}>{"Pricing  "}</Text>
          {/* <Text style={styles.subtit}>
            {"Basic and Essential Coverage"}
          </Text> */}
          <Text style={styles.desc}>
            {"This Plan provides covers the recommended features"}
          </Text>
          <Text style={styles.desc}>{`Maintainance `}</Text>
        </View>
      </View>
      </Pressable>
      <Pressable onPress={(e)=>{
          navigation.navigate('Login');
        }} >
      <View style={styles.child11}>
        <Text style={styles.title}>Basic Plan</Text>
        <View style={styles.body}>
          <Text style={styles.pricing}>{"Pricing  "}</Text>
          {/* <Text style={styles.subtit}>
            {"Basic and Essential Coverage"}
          </Text> */}
          <Text style={styles.desc}>{"This Plan only offers the best"}</Text>
          <Text style={styles.desc}>{`Maintainance `}</Text>
        </View>
      </View>
      </Pressable>
      </View>
      
      <View style={styles.footer}>
        <Pressable
          onPress={() => navigation.navigate("Homepage")}
          style={styles.homeButton}
        >
          <Text style={styles.homeButtonText}>Go to Homepage</Text>
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
    borderRadius: 5,
  },
  logoutText: {
    color: "white",
    fontWeight: "bold",
  },
  child11: {
    height: 180,
    marginTop: 80,
    width: 300,

    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    borderRadius: 9,
    shadowColor: "black",
    shadowOffset: { width: 10, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 3,
    backgroundColor: "blue",
  },
  title: {
    fontSize: 40,
    color: "white",
  },
  body: {
    color: "white",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
  },
  pricing: {
    fontSize: 25,
    color: "white",
  },
  subtit: {
    fontSize: 20,
    color: "white",
    textAlign: "center",
  },
  desc: {
    fontSize: 17,
    color: "white",
    maxWidth: 270,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    padding: 15,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#e5e5e5',
    alignItems: 'center'
  },
  homeButton: {
    padding: 10,
    backgroundColor: 'blue',
    borderRadius: 5,
  },
  homeButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16
  }  
});

export default DashboardScreen;
