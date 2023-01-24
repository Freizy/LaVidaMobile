import React, { useState} from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Dimensions, TextInput, Pressable, SafeAreaView, Alert, ScrollView } from "react-native";
import styles from "./styles";
import Svg, { Image, Ellipse, ClipPath  } from "react-native-svg";
import Animated, {useSharedValue, useAnimatedStyle, interpolate, withTiming, withDelay, withSequence, withSpring, } from "react-native-reanimated";
import loadingGif from "./assets/loading.gif";
const API_URL ="https://lavidaweb.netlify.app/api";

export default function App() { 
//functionality  
  const [age, setAge] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const [gender, setGender] = useState("male");


  const onSubmit = async () => {
    Alert.alert('This is not a substitute for medical expertise ');
    
    
  
    if (loading) {
      return;
    }
    setLoading(true);
    setResult("");
    try {
      const response = await fetch(`${API_URL}/api`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ gender, age, symptoms }),
      });
      const data = await response.json();
      setResult(data.result);
    } catch (e) {
      Alert.alert("Couldn't generate conditions", e.message);
    } finally {
      setLoading(false);
    }
  };

  const onTryAgain = () => {
    setResult("");
  };


  //ui
  const { height, width } = Dimensions.get("window");
  const imagePosition = useSharedValue(1); 
  const formButtonScale = useSharedValue(1);

  const imageAnimatedStyle = useAnimatedStyle(() => {
    const interpolation = interpolate(
      imagePosition.value,
      [0, 1],
      [-height / 2, 0]
    );
    return {
      transform: [
        { translateY: withTiming(interpolation, { duration: 1000 }) },
      ],
    };
  });

  const buttonsAnimatedStyle = useAnimatedStyle(() => {
    const interpolation = interpolate(imagePosition.value, [0, 1], [250, 0]);
    return {
      opacity: withTiming(imagePosition.value, { duration: 500 }),
      transform: [
        { translateY: withTiming(interpolation, { duration: 1000 }) },
      ],
    };
  });


  const closeButtonContainerStyle = useAnimatedStyle(() => {
    const interpolation = interpolate(imagePosition.value, [0, 1], [180, 360]);
    return {
      opacity: withTiming(imagePosition.value === 1 ? 0 : 1, { duration: 800 }),
      transform: [
        { rotate: withTiming(interpolation + "deg", { duration: 1000 }) },
      ],
    };
  });

  const formAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity:
        imagePosition.value === 0
          ? withDelay(400, withTiming(1, { duration: 800 }))
          : withTiming(0, { duration: 300 }),
    };
  });

  const formButtonAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{scale: formButtonScale.value}]
    }
  })




  const loginHandler = () => {
    imagePosition.value = 0
  }

  const registerHandler = () => {
    imagePosition.value = 0
  }

  if (loading) {
    return (
        <View style={styles.loadingContainer}>
            <Text style={styles.title}>Loading possible Conditions</Text>
            <Image
                source={loadingGif}
                style={styles.loading}
                resizeMode="contain"
            />
        </View>
    )
}

if (result) {
    return (
        <SafeAreaView style={styles.loadingContainer}>
          <ScrollView>
            <Text style={styles.title}>
                Here are some sicknesses associated to your symptoms:
            </Text>
            <Text style={styles.result}>{result}</Text>
            <Pressable onPress={onTryAgain} style={styles.button}>
                <Text style={styles.buttonText}>Try again</Text>
            </Pressable>
          </ScrollView>
        </SafeAreaView>
    )
}


  return (
    <View style={styles.container}> 




      <Animated.View style={[StyleSheet.absoluteFill, imageAnimatedStyle]}>
        <Svg height={height + 100} width={width}>
          <ClipPath id="clipPathId" >
            <Ellipse cx={width/2} rx={height} ry={height + 100 } />
          </ClipPath>
          <Image
            href={require("./assets/bg.png")}
            width={width + 100}
            height={height + 100}
            preserveAspectRatio="xMidYMid slice"
            clipPath="url(#clipPathId)"
          />
        </Svg>
        <Animated.View style={[styles.closeButtonContainer, closeButtonContainerStyle] }>
          <Text onPress={() => imagePosition.value = 1}>X</Text>
        </Animated.View>
      </Animated.View>
      <View style={styles.buttonContainer}>
        <Animated.View style={buttonsAnimatedStyle}>
          <Pressable style={styles.button} onPress={loginHandler}>
            <Text style={styles.buttonText}>Get Started</Text>
          </Pressable>
        </Animated.View>

        <Animated.View style={[styles.formInputContainer, formAnimatedStyle]}>
          <View  style={styles.selectorContainer}>
            <Text
              onPress={() => setGender("male")}
              style={[
              styles.selectorMale,
              gender === "male" && { backgroundColor: "#66ff33" },
              
              ]}>
              Male
            </Text>

            <Text
                onPress={() => setGender("female")}
                style={[
                  styles.selectorFemale,
                  gender === "female" && { backgroundColor: "#66ff33" },
                ]}>
              Female
              </Text>

          </View>
          <TextInput
            placeholder="Age"
            placeholderTextColor="black"
            style={styles.textInput}
            keyboardType='numeric'
            value={age.toString()}
            onChangeText={(s) => {
              if(s)
                setAge(Number.parseInt(s))
              else
                setAge('')
              }
            }
          />
          <TextInput
            placeholder="Symptoms"
            placeholderTextColor="black"
            style={styles.textInput}
            value={symptoms}
            onChangeText={setSymptoms}
          />
          <Animated.View style={styles.formButton}>
            <Pressable onPress={onSubmit}>
              <Text style={styles.buttonText}>Check Up</Text>
            </Pressable>
          </Animated.View>
        </Animated.View>
      </View>
    </View>
  );
}
