import { Text, TextInput, Button, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useDispatch } from 'react-redux';

import { login, logout } from '../redux/reducers/authSlice'


export default function LoginScreen() {
    const navigation = useNavigation();
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const dispatch = useDispatch();

    const handleLogin = async () => {
        // Add to firebase signupusingEmailPAssword

        if (!email || !password) {
            setError("Email or password should be filled")
            return
        }
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                dispatch(login({user: userCredential.email}))
                console.log(userCredential)
                navigation.navigate('AppStack')
            })
            .catch((error) => {
                console.log(error)
                setError("Invalid Credentials")
            })
    }

    return (
        <SafeAreaView className="bg-neutral-800 flex-1">
            <View className="mt-10 pb-5">
                <Text className="text-neutral-400 font-bold text-white text-xl text-center">LOGIN</Text>
            </View>
            <TextInput
                onChangeText={(text) => {
                    setEmail(text);
                    setError("")
                }}
                placeholder="Email"
                placeholderTextColor={'black'}
                className="p-2 m-5 mb-2 rounded-lg bg-white text-base font-semibold text-black tracking-wider" />

            <TextInput
                onChangeText={(text) => {
                    setPassword(text)
                    setError("")
                }}
                placeholder="Password"
                secureTextEntry={true}
                placeholderTextColor={'black'}
                className="p-2 m-5 mb-1 rounded-lg bg-white text-base font-semibold text-black tracking-wider" />

            {error && 
                <View className="mt-5 mb-5 bg-red-200 p-5">
                    <Text className="text-rose-500 text-center font-bold">{error}</Text>
                </View>
            }

            <View className="m-5 mb-10">
                <Button title="Login" onPress={handleLogin}/>
            </View>


            <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
                <Text className="text-neutral-400 font-semibold text-base text-center mt-2">Don't have an account? Register</Text>
            </TouchableOpacity>

        </SafeAreaView>
    )
}