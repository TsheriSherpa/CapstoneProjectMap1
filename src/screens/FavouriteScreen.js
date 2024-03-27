import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { 
    View, 
    Text, 
    Dimensions, 
    TouchableOpacity, 
    ScrollView, 
    Image,
    TouchableWithoutFeedback,
} from 'react-native'
import { ArrowLeftIcon } from "react-native-heroicons/outline"
import { SafeAreaView } from 'react-native-safe-area-context'
import { Movie } from '../components/Movie'

let { width, height } = Dimensions.get('window')

export default function FavouriteScreen() {
    const navigation = useNavigation();
    const favourites = useSelector((state) => state.favorite.list)
 
    return (
        <SafeAreaView className="bg-neutral-800 flex-1">
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 20 }}
                className="space-y-3">

                <View className="flex flex-row items-center justify-start">
                    <TouchableOpacity onPress={() => navigation.navigate("Home")}>                    
                        <ArrowLeftIcon size={"30"} strokeWidth={2} color="white" />
                    </TouchableOpacity>
                    <Text className="text-white font-bold ml-1">Favourites ({favourites.length})</Text>

                </View>

                {favourites.length > 0 ? 
                (
                    <View className="flex-row justify-between flex-wrap">
                        {
                            favourites.map((item, index) => {
                                return (
                                    <TouchableWithoutFeedback
                                        key={index}
                                        onPress={() => navigation.push('Movie', item)}>
                                            <Movie item={item} key={index}/>
                                    </TouchableWithoutFeedback>
                                )
                            })
                        }
                    </View>
                ) : (
                    <View className="flex-col justify-center items-center">
                        <Image
                            source={require('../assets/images/noMovie.png')}
                            className="h-96 w-96" />
                    </View>
                )}
            </ScrollView>
        </SafeAreaView>
    )
}