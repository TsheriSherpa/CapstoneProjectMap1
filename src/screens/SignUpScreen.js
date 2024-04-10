import { Text, Dimensions, TextInput, Button, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { db } from '../utilities/firebase';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore/lite';

let { width, height } = Dimensions.get('window')

export default function SignUpScreen() {
    const navigation = useNavigation();

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSignUp = async () => {
        // Add to firebase signupusingEmailPAssword

        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log("Success");
                const user = userCredential.user;

                setDoc(doc(db,"users", user.uid),{
                    firstName: firstName,
                    lastName: lastName,
                    email: email
                });
            })
            .catch((error) => {
                console.log(error);
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

            <TextInput
                onChangeText={(text) => setPassword(text)}
                placeholder="Password"
                placeholderTextColor={'black'}
                className="p-2 m-5 rounded-lg bg-white text-base font-semibold text-black tracking-wider" />

            <Button title="Sign Up" onPress={handleSignUp} />

            {/* OnPress={navigation.navigte("Login")} */}

            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                <Text className="text-neutral-400 font-semibold text-base text-center">Already have an account? Login</Text>
            </TouchableOpacity>

        </SafeAreaView>
    )
}