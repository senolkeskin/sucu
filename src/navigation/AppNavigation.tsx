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
import Customer from "../screens/customer";
import Employee from "../screens/employee";
import Settings from "../screens/settings";

const MainStack = createBottomTabNavigator(
  {
    Customer: { screen: Customer},
    Employee: { screen: Employee},
    Settings: { screen: Settings},
  },
  {
    initialRouteName: "Customer",
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
      initialRouteName: "MainStack" //createDrawernavigator içindeki bir sayfa buraya yazılamazmış!!!!
    }
  )
);
