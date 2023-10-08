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
import { useDispatch, useSelector } from "react-redux";
  
  
  const QuestionScreen = () => {

    const navigation = useNavigation();
    const dispatch = useDispatch();
    const user = useSelector(state=> state.user);
    console.log("Qu PA", user);
    
    return (
      <SafeAreaView
        style={{ flex: 1, backgroundColor: "white", alignItems: "center" }}
      >
        <View>
          <Image
            style={{ width: 350, height: 300, marginTop: 170 }}
            source={{
              uri: "https://us.123rf.com/450wm/vectorlab/vectorlab1905/vectorlab190500355/123180451-property-and-health-medical-insurance-male-and-female-characters-sign-insurance-policy-paper.jpg?ver=6",
            }}
          />
        </View>
        <KeyboardAvoidingView>
          <Pressable

            style={{
              width: 200,
              backgroundColor: "#FEBE10",
              borderRadius: 6,
              marginLeft: "auto",
              marginRight: "auto",
              marginTop: 40,
              padding: 15,
            }}
          >
            <Text
              style={{
                textAlign: "center",
                color: "white",
                fontSize: 16,
                fontWeight: "bold",
              }}
            >
              Question Screen
            </Text>
          </Pressable>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
};
  
  export default QuestionScreen;
  
  const styles = StyleSheet.create({});
  