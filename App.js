import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, Button, Alert } from "react-native";


export default function App() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState(null);
  const [isOtpRequired, setIsOtpRequired] = useState(false);

  // Simulate OTP generation
  const generateOtp = () => {
    const newOtp = Math.floor(100000 + Math.random() * 900000).toString(); 
    // console.log(newOtp);
    setGeneratedOtp(newOtp);
    setIsOtpRequired(true);

    fetch("https://comparation.jom-jom.com/sendmail.php", {
      method: "POST",
      headers: { 
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body:JSON.stringify({
        Email: email,
        otp: newOtp,
      })
    })
   .then(response => response.json())
   .then(data =>{
     
      if(data.message === "success"){
        Alert.alert("OTP Sent", `Your otp is successfully sent to ${email}`);
      }else{
        Alert.alert("OTP Sent", `Fail to send mail please check you email`);
      }
   }).catch((error)=>{
      console.error(error);
   });

    // Alert.alert("OTP Sent", `Your OTP is ${newOtp}`);
  };

  // Handle the first step: Login form submission
  const handleLogin = () => {
    if (!email) {
      Alert.alert("Error", "Please fill in both fields.");
      return;
    }

    // Simulate sending OTP
    generateOtp();
  };

  // Handle the second step: OTP verification
  const verifyOtp = () => {
    if (otp === generatedOtp) {
      Alert.alert("Login Successful", `Welcome, ${email}!`);
      resetForm();
    } else {
      Alert.alert("Error", "Invalid OTP. Please try again.");
      resetForm();
    }
  };

  // Reset form state
  const resetForm = () => {
    setEmail("");
    setOtp("");
    setGeneratedOtp(null);
    setIsOtpRequired(false);
  };

  return (
    <View style={styles.container}>
      {!isOtpRequired ? (
        <>
          <Text style={styles.header}>Login</Text>

          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <View style={styles.buttonContainer}>
            <Button title="Request OTP" onPress={handleLogin} />
          </View>
        </>
      ) : (
        <>
          <Text style={styles.header}>Enter OTP</Text>

          <TextInput
            style={styles.input}
            placeholder="Enter OTP"
            value={otp}
            onChangeText={setOtp}
            keyboardType="numeric"
            maxLength={6}
          />

          <View style={styles.buttonContainer}>
            <Button title="Verify OTP" onPress={verifyOtp} />
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: "#f9f9f9",
  },
  buttonContainer: {
    width: "100%",
    marginTop: 10,
  },
});
