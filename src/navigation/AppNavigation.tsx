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
import addCustomer from "../screens/addCustomer";
import infoCustomer from "../screens/infoCustomer";
import addOrder from "../screens/addOrder";

const CustomerApp =createStackNavigator(
  {
  Customer: { screen: Customer},
  CustomerAdd : {screen : addCustomer},
  CustomerInfo : {screen: infoCustomer },
  AddOrder: { screen: addOrder}

  },
  {

    headerMode: "none"
  }

);


const MainStack = createBottomTabNavigator(
  {
    Customer:  CustomerApp,
    Employee: { screen: Employee},
    Settings: { screen: Settings},
  },
  {
    initialRouteName: "Customer",
  }
);







const AddOrder = createStackNavigator(
  {
    
  },
  {
    headerMode: "none"
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
      AddCustomer: CustomerApp,
      AddOrder: AddOrder,
    },
    {
      initialRouteName: "AuthLoading" //createDrawernavigator içindeki bir sayfa buraya yazılamazmış!!!!
    }
  )
);
