import { View, Text, Platform, TouchableOpacity } from "react-native";
import { StatusBar } from "expo-status-bar";
import { styles } from "../theme/index"
import { SafeAreaView } from "react-native-safe-area-context";
import { Bars3CenterLeftIcon, MagnifyingGlassIcon, HeartIcon } from "react-native-heroicons/outline"

const ios = Platform.OS == "ios"

export const ActionBar = ({navigation}) => {

    return (
        <SafeAreaView className={ios ? "-mb-2" : "mb-3"}>
            <StatusBar style="light" />
            <View className="flex-row justify-between items-center mx-4">
                <TouchableOpacity onPress={() => navigation.openDrawer()}>
                    <Bars3CenterLeftIcon size={"30"} strokeWidth={2} color="white" />

                </TouchableOpacity>

                <Text className="text-white text-3xl font-bold" >
                    <Text style={styles.text}>M</Text>ovies
                </Text>

                <View className="flex flex-row justify-between" style={{width: 80 }}>
                    <TouchableOpacity onPress={() => navigation.navigate("Favourite")}>
                        <HeartIcon size={30} strokeWidth={2} color="white" />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.navigate("Search")}>
                        <MagnifyingGlassIcon size={30} strokeWidth={2} color="white" />
                    </TouchableOpacity>
                </View>

            </View>
        </SafeAreaView>
    )
}