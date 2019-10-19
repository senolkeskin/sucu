import React, { Component } from "react";
import {
  View,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  TextInput,
  Image,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { NavigationScreenProp, NavigationState } from "react-navigation";
import { Formik } from "formik";
import * as Yup from "yup";
import { loginUserService } from "../../../redux/services/user";
import styles from "./styles";

const logo = require("./water.png");

interface Props {
  navigation: NavigationScreenProp<NavigationState>;
}
interface userData {
  username: string;
  password: string;
}

const loginSchema = Yup.object().shape({
  username: Yup.string()
    .matches(/^[a-zA-Z0-9_-]+$/)
    .min(4)
    .max(16)
    .required(),
  password: Yup.string()
    .matches(/^[a-zA-Z0-9_-]+$/)
    .min(6)
    .max(16)
    .required()
});

class Login extends Component<Props, {}> {
  handleLogin = (values: userData) => {
    debugger;
    const { navigation } = this.props;
    loginUserService(values.username, values.password).then(res => {
      navigation.navigate("MainStack");
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#2B6EDC"/>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <ScrollView bounces={false}>
            <Formik
              initialValues={{ username: "", password: "" }}
              validationSchema={loginSchema}
              onSubmit={values => this.handleLogin(values)}
            >
              {props => {
                return (
                  <View>
                    <View style={styles.headStyle}>
                      <Image 
                        style={styles.logo}
                        source={logo}
                             
                      />
                      <Text style={styles.headText}>
                        SUCU
                      </Text>
                    </View>
                    <View style={styles.inputContainer}>
                      <TextInput
                        style={styles.input}
                        placeholder="Kullanıcı Adı"
                        placeholderTextColor="white"
                        value={props.values.username}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        autoCorrect={false}
                        onChangeText={props.handleChange("username")}
                        onBlur={props.handleBlur("username")}                   
                      />
                      <TextInput
                        style={styles.input}
                        placeholder="Şifre"
                        placeholderTextColor="white"
                        value={props.values.password}
                        onChangeText={props.handleChange("password")}
                        onBlur={props.handleBlur("password")}
                        secureTextEntry
                      />
                      <TouchableOpacity style={styles.buttonContainer}>
                        <Text style={styles.buttonText}
                        onPress={props.handleSubmit}
                        >Giriş</Text>
                      </TouchableOpacity>

                      <Text style={styles.linkText}
                      onPress={() => this.props.navigation.navigate("MainStack")}>
                      Şifremi Unuttum
                    </Text>

                    </View>
                  </View>
                );
              }}
            </Formik>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    );
  }
}



export default Login;
