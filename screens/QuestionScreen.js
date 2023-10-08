import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  Image,
  Pressable,
  Alert,
  TextInput,
} from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import DropDownPicker from "react-native-dropdown-picker"; // You need to install this package

const QuestionScreen = () => {
  const navigation = useNavigation();

  const [questions] = useState([
    { id: "assetType", question: "What is the asset type?" },
    { id: "model", question: "What is the model?" },
    { id: "age", question: "How old is the asset?" },
    { id: "mileage", question: "What is the mileage?" },
    { id: "lastService", question: "When was the last service?" },
  ]);

  const [answers, setAnswers] = useState({
    assetType: "",
    model: "",
    age: "",
    mileage: "",
    lastService: "",
  });

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [insuranceCount, setInsuranceCount] = useState(0);

  const handleInputChange = (value) => {
    const currentQuestionId = questions[currentQuestionIndex].id;

    // Creating a new state copy
    const updatedAnswers = {
      ...answers,
      [currentQuestionId]: value,
    };

    setAnswers(updatedAnswers);

    // Log the new state copy
    console.log(updatedAnswers);
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
    axios
      .post("http://10.182.238.120:8000/policy/getNPolicies", answers)
      .then((response) => {
        setInsuranceCount(response.data.count);
      })
      .catch(() => {
        Alert.alert(
          "Error",
          "There was an error fetching data from the server."
        );
      });
  };

  // const handleReset = () => {
  //   setAnswers({
  //     assetType: null,
  //     model: null,
  //     age: null,
  //     mileage: null,
  //     lastService: null,
  //   });
  //   setInsuranceCount(0); // Reset the insurance count to 0
  // };

  const handleSubmit = () => {
    // Making an API call with the entire answers object
    axios
      .post("http://10.182.238.120:8000/policy/getNPolicies", answers)
      .then((response) => {
        setInsuranceCount(response.data.count);

        // // Proceed to next question or navigate if questions are done
        // if (currentQuestionIndex < questions.length - 1) {
        //   setCurrentQuestionIndex(currentQuestionIndex + 1);
        // } else {
        //   Alert.alert("Finished", "Do you want to go to the next page?", [
        //     {
        //       text: "Cancel",
        //       style: "cancel",
        //     },
        //     {
        //       text: "OK",
        //       onPress: () => navigation.navigate("Dashboard"),
        //     },
        //   ]);
        // }
      })
      .catch(() => {
        Alert.alert(
          "Error",
          "There was an error fetching data from the server."
        );
      });
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }

    axios
      .post("http://10.182.238.120:8000/policy/getNPolicies", answers)
      .then((response) => {
        setInsuranceCount(response.data.count);
      })
      .catch(() => {
        Alert.alert(
          "Error",
          "There was an error fetching data from the server."
        );
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Image Component */}
      <Image style={styles.image} source={{ uri: "YOUR_IMAGE_URL" }} />

      {/* Questions and Text Input */}
      <View style={styles.questionContainer}>
        <Text>{questions[currentQuestionIndex].question}</Text>
        <View>
          <TextInput
            style={styles.textInput}
            multiline
            onChangeText={(text) => handleInputChange(text)}
            value={answers[questions[currentQuestionIndex].id]}
          />
        </View>

        <TextInput
          style={styles.textArea}
          multiline
          numberOfLines={2}
          editable={false}
          value={`Available Insurance Options: ${insuranceCount}`}
        />
      </View>

      {/* Footer with PREV and NEXT buttons */}
      <View style={styles.footer}>
        <Pressable style={styles.prevButton} onPress={handlePrev}>
          <Text style={styles.buttonText}>PREV</Text>
        </Pressable>
        {/* <Pressable style={styles.resetButton} onPress={handleReset}>
          <Text style={styles.buttonText}>RESET</Text>
        </Pressable> */}
        <Pressable style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.buttonText}>NEXT</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  textInput: {
    marginTop: 20,
    borderColor: "gray",
    borderWidth: 1,
    padding: 10,
    width: 220,
  },
  textArea: {
    marginTop: 20,
    borderColor: "gray",
    borderWidth: 1,
    width: 220,
    padding: 10,
  },
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
  },
  image: {
    width: 350,
    height: 300,
    marginTop: 20,
  },
  questionContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center", // align buttons vertically in the center
    width: "100%",
    padding: 20,
  },
  prevButton: {
    backgroundColor: "#FEBE10",
    borderRadius: 6,
    padding: 15,
    marginLeft: 10,
  },
  nextButton: {
    backgroundColor: "#FEBE10",
    borderRadius: 6,
    padding: 15,
    marginRight: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default QuestionScreen;
