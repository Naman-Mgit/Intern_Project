import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { authService } from "../services/apiService"; 

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const validateInputs = () => {
    let valid = true;
    setEmailError("");
    setPasswordError("");

    if (!email) {
      setEmailError("Email is required");
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Please enter a valid email");
      valid = false;
    }

    if (!password) {
      setPasswordError("Password is required");
      valid = false;
    } else if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      valid = false;
    }

    return valid;
  };

  const handleLogin = async () => {
    if (!validateInputs()) return;

    setLoading(true);
    try {
      console.log("helloworld",{
        name: "user",
        email: email.trim(),
        password: password.trim,
        phone: "1234567898",
      } )
      const userData = await authService.login({
        name: "user",
        email: email.trim(),
        password: password.trim(),
        phone: "1234567898",
      });
      navigation.replace("PrivateRoute");
    } catch (error) {
      console.error("Login error:", error);
      Alert.alert(
        "Login Failed",
        error.response?.data?.message || "Invalid email or password"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const checkAuth = async () => {
        try {
          const token = await AsyncStorage.getItem('authToken');
          if(token){

            console.log("token", token)
            navigation.navigate("PrivateRoute");
          }
        } catch (error) {
            console.error('Error checking authentication:', error);
           
        } 
    };

    checkAuth();
}, []);

  const handleForgotPassword = () => {
    Alert.alert(
      "Forgot Password",
      "Please check your email for a password reset link."
    );
  };

  const handleRegistration = () => {
    navigation.navigate("Registration");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.modalContent}>
        <Text style={styles.title}>Login</Text>

        <TextInput
          style={[styles.input, emailError ? styles.inputError : null]}
          placeholder="Email"
          placeholderTextColor="#aaa"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        {emailError && <Text style={styles.errorText}>{emailError}</Text>}

        <TextInput
          style={[styles.input, passwordError ? styles.inputError : null]}
          placeholder="Password"
          placeholderTextColor="#aaa"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        {passwordError && <Text style={styles.errorText}>{passwordError}</Text>}

        <TouchableOpacity
          style={styles.submitButton}
          onPress={handleLogin}
          disabled={loading}
        >
          <Text style={styles.submitButtonText}>
            {loading ? "Logging in..." : "Log In"}
          </Text>
        </TouchableOpacity>

        {/* Keep other UI elements the same */}
        <TouchableOpacity onPress={handleForgotPassword}>
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>

        <View style={styles.socialLoginContainer}>
          <TouchableOpacity
            style={[styles.socialButton, styles.facebookButton]}
          >
            <Text style={styles.socialButtonText}>Facebook</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.socialButton, styles.googleButton]}>
            <Text style={styles.socialButtonText}>Google</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={handleRegistration}>
          <Text style={styles.registrationText}>
            Don't have an account?{" "}
            <Text style={styles.registrationLink}>Register</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f2f2f2",
    padding: 20,
  },
  modalContent: {
    width: "90%",
    backgroundColor: "white",
    borderRadius: 12,
    padding: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 6,
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 40,
    fontFamily: "Roboto",
  },
  input: {
    width: "100%",
    height: 50,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#ddd",
    paddingLeft: 16,
    marginBottom: 20,
    fontSize: 16,
    backgroundColor: "#fafafa",
    fontFamily: "Roboto",
  },
  inputError: {
    borderColor: "red",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginBottom: 10,
    fontFamily: "Roboto",
  },
  submitButton: {
    width: "100%",
    height: 50,
    borderRadius: 12,
    backgroundColor: "#4CAF50",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    elevation: 3,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: "Roboto",
  },
  forgotPasswordText: {
    color: "#4CAF50",
    fontSize: 14,
    marginBottom: 20,
    fontFamily: "Roboto",
    textDecorationLine: "underline",
  },
  socialLoginContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 20,
  },
  socialButton: {
    width: "48%",
    height: 50,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
  },
  facebookButton: {
    backgroundColor: "#3b5998",
  },
  googleButton: {
    backgroundColor: "#db4437",
  },
  socialButtonText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "Roboto",
  },
  registrationText: {
    marginTop: 20,
    fontSize: 14,
    color: "#333",
    fontFamily: "Roboto",
  },
  registrationLink: {
    color: "#4CAF50",
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
});

export default Login;
