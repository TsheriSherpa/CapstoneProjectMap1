import { Text, View, Dimensions, TextInput, Button, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { db } from '../utilities/firebase';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore/lite';
import { Ionicons } from '@expo/vector-icons';

let { width, height } = Dimensions.get('window')

export default function SignUpScreen() {
    const navigation = useNavigation();

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [passwordsMatch, setPasswordsMatch] = useState(true)
    const [emailExists, setEmailExists] = useState(false)

    const handleSignUp = async () => {

        if (password.length < 6) {
            console.log("Password should be at least 6 characters long");
            return;
        }

        if (password !== confirmPassword) {
            setPasswordsMatch(false);
            return;
        }

        setPasswordsMatch(true);

        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log("Success");
                const user = userCredential.user;

                setDoc(doc(db, "users", user.uid), {
                    firstName: firstName,
                    lastName: lastName,
                    email: email
                });
            })
            .catch((error) => {
                console.log(error);
                if (error.code === "auth/email-already-in-use") {
                    setEmailExists(true);
                } else {
                    setEmailExists(false);
                }
            });
    }

    return (
        <SafeAreaView className="bg-neutral-800 flex-1">
            <Text className="text-neutral-400 pb-14 mt-10 font-semibold text-white text-base text-center">Fill up the details below</Text>

            <TextInput
                onChangeText={(text) => setFirstName(text)}
                placeholder="First Name"
                placeholderTextColor={'black'}
                className="p-2 m-5 rounded-lg bg-white text-base font-semibold text-black tracking-wider" />

            <TextInput
                onChangeText={(text) => setLastName(text)}
                placeholder="Last Name"
                placeholderTextColor={'black'}
                className="p-2 m-5 
                rounded-lg bg-white text-base font-semibold text-black tracking-wider" />

            <TextInput
                onChangeText={(text) => setEmail(text)}
                placeholder="Email"
                placeholderTextColor={'black'}
                className="p-2 m-5 rounded-lg bg-white text-base font-semibold text-black tracking-wider" />
            
            {emailExists && (
                <Text className="p-2 ml-5 text-base font-semibold text-red-600 tracking-wider">Email already exists</Text>
            )}

            <View>
                <TextInput
                    onChangeText={(text) => setPassword(text)}
                    placeholder="Password"
                    placeholderTextColor={'black'}
                    secureTextEntry={!showPassword}
                    className="p-2 m-5 rounded-lg bg-white text-base font-semibold text-black tracking-wider"
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)} className="p-8 absolute right-0">
                    <Ionicons name={showPassword ? 'eye-off' : 'eye'} size={24} color="black" />
                </TouchableOpacity>
            </View>

            <TextInput
                onChangeText={(text) => setConfirmPassword(text)}
                placeholder="Confirm Password"
                placeholderTextColor={'black'}
                secureTextEntry={!showPassword}
                className="p-2 m-5 mb-5 rounded-lg bg-white text-base font-semibold text-black tracking-wider"
            />
            {!passwordsMatch &&
                <Text className="p-2 ml-5 text-base font-semibold text-red-600 tracking-wider">Passwords do not match</Text>
            }
            {password.length > 0 && password.length < 6 && (
                <Text className="p-2 ml-5 text-base font-semibold text-red-600 tracking-wider">Password should be at least 6 characters long</Text>
            )}

            <View className="m-10">
                <Button title="Sign Up" onPress={handleSignUp} />
            </View>

            {/* OnPress={navigation.navigte("Login")} */}

            <TouchableOpacity>
                <Text className="text-neutral-400 font-semibold text-base text-center">Already have an account? Login</Text>
            </TouchableOpacity>

        </SafeAreaView>
    )
}