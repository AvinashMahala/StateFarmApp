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
    Button
} from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { saveAnswers } from "./Store/Slices/Answers/AnswerSlice";

const QuestionScreen = () => {
    const [inputValue, setInputValue] = useState("");
    const navigation = useNavigation();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [insuranceCount, setInsuranceCount] = useState(0);

  const [questions] = useState([
    { id: "assetType", question: "Vehicle Type ?", placeholder:"Car, Bike, Bus, etc." },
    { id: "model", question: "Category of Vehicle ?" , placeholder:"Sedan, SUV, etc."},
    { id: "age", question: "Age Of Vehicle ?" , placeholder:"Number of Years Since purchased"},
    { id: "mileage", question: "Total Miles Run ?" , placeholder:"Miles Completed"},
    { id: "lastService", question: "Last Maintenance ?" , placeholder:"In Months"},
  ]);

  const [answers, setAnswers] = useState({
    assetType: "",
    model: "",
    age: "",
    mileage: "",
    lastService: "",
  });


  const handleInputChange = (value) => {
    const currentQuestionId = questions[currentQuestionIndex].id;

    // Creating a new state copy
    const updatedAnswers = {
      ...answers,
      [currentQuestionId]: value,
    };

    setAnswers(updatedAnswers);
    
    

    // const handleAnswer = () => {
    //     const newAnswers = [...answers, inputValue];
    //     setAnswers(newAnswers);

    // Log the new state copy
    //console.log(updatedAnswers);
  };
 const dispatch = useDispatch();
  const handleNext = () => {
    if(index===4) {
      dispatch(saveAnswers(answers));
      navigation.navigate('Dashboard');}
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setIndex(currentQuestionIndex+1);
    }
    axios
      .post("http://10.182.235.82:8009/policy/getNPolicies", answers)
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
      .post("http://10.182.235.82:8009/policy/getNPolicies", answers)
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

  const handlePrev = () => {
    if(index===0) navigation.navigate('Homepage');
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      currentQuestionIndex===0?setIndex(currentQuestionIndex):setIndex(currentQuestionIndex-1);
    }

    axios
      .post("http://10.182.235.82:8009/policy/getNPolicies", answers)
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
  const [index,setIndex] = useState(0);
  const Images = [
    "https://s7d1.scene7.com/is/image/hyundai/2023-kona-ev-limited-fwd-blue-wave-profile:Vehicle-Carousel?fmt=webp-alpha",
    "https://content-images.carmax.com/qeontfmijmzv/EBA8694C77DC0F2115C781289C96EF7507879B86/f8c5c27446501d767f23fe4ee0f96f20/166239-bg-vehicletypes-651x366.jpg?w=800&fm=webp",
    "https://us.123rf.com/450wm/erythropterus/erythropterus2304/erythropterus230405700/203490145-classic-cars-automotive-history-vintage-models-retro-aesthetics-and-timeless-design-ai.jpg?ver=6",
    "https://www.shutterstock.com/shutterstock/photos/685250599/display_1500/stock-vector-car-speeding-wheel-vector-sketch-illustration-for-advertise-insurance-company-storyboard-project-685250599.jpg",
    "https://img.freepik.com/premium-vector/car-service-repair-auto-workshop-interior-mechanics-men-service-vehicles_165429-1150.jpg",
]

// console.log(Images[index], index)

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white", alignItems: "center" }}>
      {/* Image Component */}
      <View style={styles.img}>
              <Image
                style={{ width: 400, height: 200, marginTop: 80 }}
                source={{uri:Images[index]}}
            />
              </View>


      {/* Questions and Text Input */}
      <View style={styles.questionContainer}>
        <Text style={styles.title}>{questions[currentQuestionIndex].question}</Text>
        <View>
          
          <TextInput
      style={styles.input}
      placeholder={questions[currentQuestionIndex].placeholder}
      underlineColorAndroid="transparent" // Remove the default underline on Android
      onChangeText={(text) => handleInputChange(text)}
            value={answers[questions[currentQuestionIndex].id]}
    />
        </View>
        <Text
          style={styles.count1}
        >
          Matching Policies
          </Text>
        <Text
          style={styles.count}
        >

          {insuranceCount}
        </Text>
      </View>

      {/* Footer with PREV and NEXT buttons */}
      <View style={styles.footer}>
        <Pressable style={styles.nextButton} onPress={handlePrev} disabled={answers[questions[index].id].length>0? false : true} >
          <Text style={styles.buttonText}>PREV</Text>
        </Pressable>
        {/* <Pressable style={styles.resetButton} onPress={handleReset}>
          <Text style={styles.buttonText}>RESET</Text>
        </Pressable> */}
        <Pressable style={styles.nextButton} onPress={handleNext} disabled={answers[questions[index].id].length>0? false : true} >
          <Text style={styles.buttonText}>NEXT</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  textInput: {
    borderColor: "gray",
    borderWidth: 1,
    padding: 5,
    width: 220,
  },
  textArea: {
    borderColor: "gray",
    borderWidth: 1,
    width: 220,
    padding: 8,
  },
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
  },
  image: {
    width: 350,
    height: 300,
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
    borderRadius: 37,
    padding: 15,
    marginRight: 10,
    width:150,
    height:60,
    textAlign:'center',
    justifyContent:'center',
    display:'flex'


  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textAlign:'center',
    fontSize:23,
  },
  submitButton: {
    width: 200,
    backgroundColor: "#FEBE10",
    borderRadius: 6,
    padding: 15
},
submitText: {
    textAlign: "center",
    color: "white",
    fontSize: 16,
    fontWeight: "bold"
},
wrap2:{
    display:'flex',
    justifyContent:'space-around',
    alignContent:'center',
    alignItems:'center',
    height: 150,


},
txtfield:{
    width:300,
    height:100,

},
wrap3:{
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-around'
},
title:{
  marginTop:15,
  fontSize:40,

},
count:{
  marginTop:10,
  fontSize:39,
color:'green',
},
count1:{
  marginTop:10,
  fontSize:26,

},
input: {
  borderBottomWidth: 1,        // Add a bottom border
  borderBottomColor: 'black', // Customize the border color
  padding: 10,               // Add some padding for spacing
  fontSize: 16,              // Set the font size
  width:280,
  marginTop:20,
},

});



export default QuestionScreen;
