import React from "react";
import {
  createStackNavigator,
  createAppContainer,
  createSwitchNavigator,
  createDrawerNavigator,
  createBottomTabNavigator
} from "react-navigation";

import { Dimensions } from "react-native";

const { width } = Dimensions.get("window");

import Home from "../screens/AppScreens/Home";
import Blank from "../screens/AppScreens/Blank";
import SideBar from "../screens/AppScreens/SideBar";
import Login from "../screens/AuthScreens/Login";
import AuthLoading from "../screens/AuthLoading";

const MainStack = createBottomTabNavigator(
  {
    Home: { screen: Home },

  },
  {
    initialRouteName: "Home",
  }
);

const LoginScreen = createStackNavigator(
  {
    Login: { screen: Login }
  },
  {
    initialRouteName: "Login",
    headerMode: "none"
  }
);


export default createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoading,
      LoginScreen: LoginScreen,
      MainStack: MainStack,
    },
    {
      initialRouteName: "AppStack" //createDrawernavigator içindeki bir sayfa buraya yazılamazmış!!!!
    }
  )
);
