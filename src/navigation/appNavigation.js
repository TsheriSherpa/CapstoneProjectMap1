import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import MovieScreen from '../screens/MovieScreen';
// import MovieScreen from '../screen/MovieScreen';
// import PersonScreen from '../screen/PersonScreen';
// import SearchScreen from '../screen/SearchScreen';
import SearchScreen from '../screens/SearchScreen';
import FavouriteScreen from '../screens/FavouriteScreen';
import PersonScreen from '../screens/PersonScreen';
import SignUpScreen from '../screens/SignUpScreen';
import LoginScreen from '../screens/LoginScreen';


const Stack = createNativeStackNavigator();

const AppNavigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Login" options={{ headerShown: false }} component={LoginScreen} />

                <Stack.Screen name="SignUp" options={{ headerShown: false }} component={SignUpScreen} />

                <Stack.Screen name="Home" options={{ headerShown: false }} component={HomeScreen} />

                <Stack.Screen name="Movie" options={{ headerShown: false }} component={MovieScreen} />

                <Stack.Screen name="Favourite" options={{ headerShown: false }} component={FavouriteScreen} />

                <Stack.Screen name="Person" options={{ headerShown: false }} component={PersonScreen} />

                <Stack.Screen name="Search" options={{ headerShown: false }} component={SearchScreen} />

            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default AppNavigation;