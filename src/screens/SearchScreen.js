import { View, Text, Dimensions, TextInput, TouchableOpacity, ScrollView, TouchableWithoutFeedback, Image } from 'react-native'
import React, { useCallback, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { XMarkIcon } from 'react-native-heroicons/outline'
import { useNavigation } from '@react-navigation/native'
import Loading from '../components/Loading'
import { fallbackMoviePoster, image185, searchMovies } from '../../api/moviesdb'

let { width, height } = Dimensions.get('window')

export default function SearchScreen() {
    const navigation = useNavigation();

    const [results, setResults] = useState([])
    const [loading, setLoading] = useState(false)

    const handleSearch = value => {
        if (value && value.length > 2) {
            setLoading(true)
            searchMovies({
                query: value,
                language: 'en-US',
                page: '1'
            }).then(data => {
                if (data && data.results) setResults(data.results);
                setLoading(false)
            })
        }
        else {
            setLoading(false)
            setResults([])
        }

    }

    const handleText = useCallback(handleSearch, [])

    return (
        <SafeAreaView className="bg-neutral-800 flex-1">
            <View className="mb-3 mx-4 flex-row justify-between items-center border border-neutral-500 rounded-full" >
                <TextInput
                    onChangeText={handleText}
                    placeholder="Search Movie"
                    placeholderTextColor={'lightgray'}
                    className="pb-1 pl-6 flex-1 text-base font-semibold text-white tracking-wider" />

                <TouchableOpacity
                    onPress={() => navigation.navigate('Home')}
                    className="rounded-full p-3 m-1 bg-neutral-500">
                    <XMarkIcon size="25" color="white" />
                </TouchableOpacity>
            </View>

            {
                loading ? <Loading /> : (
                    results.length > 0 ? (
                        <ScrollView
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={{ paddingHorizontal: 15 }}
                            className="space-y-3">
                            <Text className="text-white font-semibold ml-1">Results ({results.length})</Text>
                            <View className="flex-row justify-between flex-wrap">
                                {
                                    results.map((item, index) => {
                                        return (
                                            <TouchableWithoutFeedback
                                                key={index}
                                                onPress={() => navigation.push('Movie', item)}>
                                                <View className="space-y-2 mb-4">
                                                    <Image
                                                        source={{ uri: image185(item.poster_path) || fallbackMoviePoster }}
                                                        className="rounded-3xl"
                                                        style={{ width: width * 0.44, height: height * 0.3 }} />
                                                    <Text className="text-gray-300 ml-1">
                                                        {
                                                            item?.title.length > 20 ? item?.title.slice(0, 20) + '...' : item?.title
                                                        }
                                                    </Text>
                                                </View>
                                            </TouchableWithoutFeedback>
                                        )
                                    })
                                }
                            </View>
                        </ScrollView>
                    ) : (
                        <View className="flex-col justify-center items-center">
                            <Image
                                source={require('../assets/images/noMovie.png')}
                                className="h-96 w-96" />
                        </View>
                    )
                )
            }
        </SafeAreaView>
    )
}