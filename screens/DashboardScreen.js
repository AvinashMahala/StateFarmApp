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
    Alert
} from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

const DashboardScreen = () => {
    
    const navigation = useNavigation();

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white", alignItems: "center" }}>
           
            <Text
                style={{ 
                    marginTop: 70,
                    marginBottom:20
                }}
            >
                Dashboard After Logging In!
            </Text>
            <KeyboardAvoidingView>
                <Text>LogIn View.</Text>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    submitButton: {
        width: 200,
        backgroundColor: "#FEBE10",
        borderRadius: 6,
        marginTop: 20,
        padding: 15
    },
    submitText: {
        textAlign: "center",
        color: "white",
        fontSize: 16,
        fontWeight: "bold"
    }
});

export default DashboardScreen;
