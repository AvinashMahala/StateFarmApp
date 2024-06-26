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
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { Alert } from "react-native";

const HomePageScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <View>
      <Text style={styles.headline}> Asset Guard </Text>
        <Image
          style={styles.image}
          source={{
            uri: "https://us.123rf.com/450wm/vectorlab/vectorlab1905/vectorlab190500355/123180451-property-and-health-medical-insurance-male-and-female-characters-sign-insurance-policy-paper.jpg?ver=6",
          }}
        />
      </View>
      <KeyboardAvoidingView behavior="padding">
        <Text style={styles.tagline}>Guided Care for Every Step</Text>
        <Pressable
          onPress={() => navigation.navigate("Question")}
          style={styles.startButton}
        >
          <Text style={styles.startButtonText}>Start Here</Text>
        </Pressable>
        <Text style={styles.information}>An AI Based Recommendation App to cater needs of custom policies based on every specific need and type of action needed.</Text>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default HomePageScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
  },
  image: {
    width: 350,
    height: 300,
    marginTop: 40,
  },
  information: {
    fontSize: 20,
    fontStyle: 'italic', // Italics for a unique feel
    textAlign: "left",
    marginTop: 19,
    marginLeft:10,
  },
  headline:{
    fontSize: 60,
    fontWeight: "bold",
    color: "green",
    textAlign: "center",
    marginTop: 60,
  },
  tagline: {
    marginTop: 30,
    fontSize: 25,
    fontWeight: "600",
    color: "#333", // A shade of gray for a more subtle look.
    letterSpacing: 1, // Space between characters
    lineHeight: 28, // Line height for better readability
    textAlign: "center",
    paddingHorizontal: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.1)', // Subtle shadow
    textShadowOffset: { width: 1, height: 1 }, // Shadow offset
    textShadowRadius: 1, // Shadow blur radius
  },
  
  startButton: {
    width: 350,
    backgroundColor: "green",
    borderRadius: 6,
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 20,
    padding: 15,
  },
  startButtonText: {
    textAlign: "center",
    color: "white",
    fontSize: 40,
    fontWeight: "bold",
  },
});
