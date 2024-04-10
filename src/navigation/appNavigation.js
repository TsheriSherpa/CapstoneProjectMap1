import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import MovieScreen from '../screens/MovieScreen';
import SearchScreen from '../screens/SearchScreen';
import FavouriteScreen from '../screens/FavouriteScreen';
import PersonScreen from '../screens/PersonScreen';
import SignUpScreen from '../screens/SignUpScreen';
import LoginScreen from '../screens/LoginScreen';

import { createDrawerNavigator } from '@react-navigation/drawer';
import SideBar from '../components/SideBar';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const AppNavigation = () => {
    return (
        <NavigationContainer>
            <Drawer.Navigator drawerContent={({ navigation }) => <SideBar navigation={navigation} />}>
                <Drawer.Screen name="Login" options={{ headerShown: false }} component={LoginScreen} />

                <Drawer.Screen name="SignUp" options={{ headerShown: false }} component={SignUpScreen} />

                <Drawer.Screen name="Home" options={{ headerShown: false }} component={HomeScreen} />

                <Drawer.Screen name="Movie" options={{ headerShown: false }} component={MovieScreen} />

                <Drawer.Screen name="Favourite" options={{ headerShown: false }} component={FavouriteScreen} />

                <Drawer.Screen name="Person" options={{ headerShown: false }} component={PersonScreen} />

                <Drawer.Screen name="Search" options={{ headerShown: false }} component={SearchScreen} />

            </Drawer.Navigator>
        </NavigationContainer>
    );
}

export default AppNavigation;