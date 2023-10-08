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

const QuestionScreen = () => {
    const [questions] = useState([
        "Question 1?",
        "Question 2?",
        "Question 3?",
        "Question 4?",
        "Question 5?"
    ]);
    const [answers, setAnswers] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [insuranceCount, setInsuranceCount] = useState(0);
    const [inputValue, setInputValue] = useState("");
    const navigation = useNavigation();

    const mockResponses = {
        'a1': { count: 1000 },
        'a1,a2': { count: 500 },
        'a1,a2,a3': { count: 100 },
        'a1,a2,a3,a4': { count: 10 },
        'a1,a2,a3,a4,a5': { count: 3 },
    }

    const handleAnswer = () => {
        const newAnswers = [...answers, inputValue];
        setAnswers(newAnswers);

        // Using mock data instead of actual server request
        const responseKey = newAnswers.join(',');
        const mockData = mockResponses[responseKey];

        console.log("Answer Is:- ")
        console.log(responseKey)

        if (mockData) {
            setInsuranceCount(mockData.count);
        } else {
            Alert.alert("Info", "Combination not found in mock data.");
        }

        if (currentQuestionIndex <= questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setInputValue(""); // Clear input for next question
        }
    };

    // const handleAnswer = () => {
    //     const newAnswers = [...answers, inputValue];
    //     setAnswers(newAnswers);

    //     axios.post("YOUR_SERVER_ENDPOINT", { answers: newAnswers })
    //         .then((response) => {
    //             setInsuranceCount(response.data.count);
    //         })
    //         .catch(() => {
    //             Alert.alert("Error", "There was an error fetching data from the server.");
    //         });

    //     if (currentQuestionIndex < questions.length - 1) {
    //         setCurrentQuestionIndex(currentQuestionIndex + 1);
    //         setInputValue(""); // Clear input for next question
    //     }
    // };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white", alignItems: "center" }}>
            {/* <Image
                style={{ width: 350, height: 300, marginTop: 170 }}
                source={{uri: "https://us.123rf.com/450wm/vectorlab/vectorlab1905/vectorlab190500355/123180451-property-and-health-medical-insurance-male-and-female-characters-sign-insurance-policy-paper.jpg?ver=6"}}
            /> */}
            <Text
                style={{ 
                    marginTop: 70,
                    marginBottom:20
                }}
            >
                Questionnaire
            </Text>
            <KeyboardAvoidingView>
                {currentQuestionIndex < questions.length ? (
                    <>
                        <Text>{questions[currentQuestionIndex]}</Text>
                        <TextInput
                            value={inputValue}
                            onChangeText={setInputValue}
                            placeholder="Your Answer..."
                        />
                        <Pressable
                            style={styles.submitButton}
                            onPress={handleAnswer}
                        >
                            <Text style={styles.submitText}>Submit</Text>
                        </Pressable>
                    </>
                ) : (
                    <Text>All questions answered!</Text>
                )}
                <Text>Insurance Count: {insuranceCount}</Text>
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

export default QuestionScreen;
