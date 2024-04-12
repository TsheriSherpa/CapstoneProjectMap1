import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from '../screens/HomeScreen';
import MovieScreen from '../screens/MovieScreen';
import SearchScreen from '../screens/SearchScreen';
import FavouriteScreen from '../screens/FavouriteScreen';
import PersonScreen from '../screens/PersonScreen';
import SignUpScreen from '../screens/SignUpScreen';
import LoginScreen from '../screens/LoginScreen';
import SideBar from '../components/SideBar';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native'


const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const AppNavigation = () => {
    const isAuthenticated = useSelector((state) => state.auth.isLoggedIn);

    return (
        <NavigationContainer>
            {isAuthenticated ? (<AppStack isAuthenticated={isAuthenticated} />) : (<AuthStack />)}
        </NavigationContainer>
    );
}

const AuthStack = () => {
    return(
        <Stack.Navigator>
            <Stack.Screen name="Login" options={{ headerShown: false }} component={LoginScreen} />
            <Stack.Screen name="SignUp" options={{ headerShown: false }} component={SignUpScreen} />
			<Stack.Screen name="AppStack" options={{ headerShown: false }} component={AppStack} />

        </Stack.Navigator>
    )
}

const AppStack = ({isAuthenticated}) => {
    const navigation = useNavigation();
    if (!isAuthenticated) {
		navigation.navigate("Login")
	}

    return (
        <Stack.Navigator>
			<Stack.Screen name="DrawerNav" options={{ headerShown: false }} component={DrawerNavigation} />

            <Stack.Screen name="Home" options={{ headerShown: false }} component={HomeScreen} />

            <Stack.Screen name="Movie" options={{ headerShown: false }} component={MovieScreen} />

            <Stack.Screen name="Person" options={{ headerShown: false }} component={PersonScreen} />

            <Stack.Screen name="Search" options={{ headerShown: false }} component={SearchScreen} />

            <Stack.Screen name="Favourite" options={{ headerShown: false }} component={FavouriteScreen} />
        </Stack.Navigator>
    )
}

const DrawerNavigation = () => {
    return (
        <Drawer.Navigator drawerContent={({ navigation }) => <SideBar navigation={navigation} />}>
            <Drawer.Screen name="Home" options={{ headerShown: false }} component={HomeScreen} />


        </Drawer.Navigator>
    )
}

export default AppNavigation;
