// Navbar com suas renderizações
import "react-native-gesture-handler";
import React, {useState} from 'react';

import Home from "./src/pages/home/Home";
import Description from "./src/pages/home/Description";
import Scheduled from "./src/pages/schedule/Scheduled";
import HealthCenter from "./src/pages/health/HealthCenter";
import HealthStablishment from "./src/pages/health/HealthStablishment";
import CalendarScreen from "./src/pages/health/CalendarScreen";
// import Stablishment from "./src/pages/health/Stablishment";
import SpecialtyDescription from "./src/pages/health/SpecialtyDescription";
import Specialties from "./src/components/Specialties";
import Partners from "./src/pages/partners/Partners";
import BuyHistory from "./src/pages/buyHistory/BuyHistory";


import { Feather } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { Octicons } from '@expo/vector-icons';

import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SafeAreaView, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

function StackNavigator() {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Initial" component={Home} />
      <Stack.Screen name="Description" component={Description} />
      <Stack.Screen name="HealthStablishment" component={HealthStablishment} />
      <Stack.Screen name="SpecialtyDescription" component={SpecialtyDescription} /> 
      <Stack.Screen name="CalendarScreen" component={CalendarScreen} />   
    </Stack.Navigator>
  );
}

function StackToHealth() {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      initialRouteName="HealthStack"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="HealthStack" component={HealthCenter} />
      <Stack.Screen name="HealthStablishment" component={HealthStablishment} />
      {/*<Stack.Screen name="Stablishment" component={Stablishment} />*/}
      <Stack.Screen name="SpecialtyDescription" component={SpecialtyDescription} />
      <Stack.Screen name="Specialties" component={Specialties} />
      <Stack.Screen name="CalendarScreen" component={CalendarScreen} />
    </Stack.Navigator>
  );
}

export default function App() {
  const Bottom = createBottomTabNavigator();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NavigationContainer>
        <Bottom.Navigator
          screenOptions={{
            headerShown: false,
            activeTintColor: "tomato",
            inactiveTintColor: "gray",
            tabBarStyle: {
              height: 70,
              backgroundColor: "#fff",
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              position: "absolute",
            },
          }}
        >
          <Bottom.Screen
            name="Home"
            component={StackNavigator}
            options={{
              tabBarIcon: ({ focused }) => {
                return (
                  <View
                    style={!focused ? styles.navIcon : styles.navIconGreen}
                  >
                    <Entypo
                      name="home"
                      size={33}
                      color={!focused ? "#979797" : "#fff"}
                    />
                  </View>
                );
              },
              tabBarLabel: () => null,
            }}
          />
          <Bottom.Screen
            name="Health"
            component={StackToHealth}
            options={{
              tabBarIcon: ({ focused }) => (
                <View style={!focused ? styles.navIcon : styles.navIconGreen}>
                  <MaterialCommunityIcons name="calendar-clock-outline" size={33} color={!focused ? "#979797" : "#fff"} />
                </View>
              ),
              tabBarLabel: () => null,
            }}
          />
          <Bottom.Screen
            name="Scheduled"
            component={Scheduled}
            options={{
              tabBarIcon: ({ focused }) => (
                <View style={!focused ? styles.navIcon : styles.navIconGreen}>
                  <MaterialCommunityIcons name="heart-plus" size={33} color={!focused ? "#979797" : "#fff"} />
                </View>
              ),
              tabBarLabel: () => null,
            }}
          />
          <Bottom.Screen
            name="Partners"
            component={Partners}
            options={{
              tabBarIcon: ({ focused }) => (
                <View style={!focused ? styles.navIcon : styles.navIconGreen}>
                  <Octicons name="checklist" size={33} color={!focused ? "#979797" : "#fff"} />
                </View>
              ),
              tabBarLabel: () => null,
            }}
          />
          <Bottom.Screen
            name="BuyHistory"
            component={BuyHistory}
            options={{
              tabBarIcon: ({ focused }) => (
                <View style={!focused ? styles.navIcon : styles.navIconGreen}>
                  <Feather name="file-text" size={33} color={!focused ? "#979797" : "#fff"} />
                </View>
              ),
              tabBarLabel: () => null,
            }}
          />
        </Bottom.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}



const styles = StyleSheet.create({
  navIcon: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 50,
    width: 55,
    height: 55,
    marginBottom: 5,
    marginLeft: 5,
  },

  navIconGreen: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#00A24D",
    borderRadius: 50,
    width: 55,
    height: 55,
    marginBottom: 5,
    marginLeft: 5,
  },
});
