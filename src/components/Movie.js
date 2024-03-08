import { View, Text, TouchableWithoutFeedback, Image,Dimensions } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { fallbackMoviePoster, image185 } from '../../api/moviesdb'
import { HeartIcon } from 'react-native-heroicons/solid'
import { useDispatch, useSelector } from 'react-redux'
import {toggleFavorite, selectIsFavourite } from '../redux/reducers/favoriteSlice'

let { width, height } = Dimensions.get('window')

export const Movie = ({item, index}) => {

    const navigation = useNavigation()

    const dispatch = useDispatch()
    let favorite = useSelector((state) => selectIsFavourite(state, item))

    const handleFavoriteToggle = (item) => {
        dispatch(toggleFavorite(item))
    }

    return (
        <TouchableWithoutFeedback key={index} onPress={() => navigation.push("Movie", item)}>
            <View className="space-y-4 mr-4">
                <Image
                    source={{ uri: image185(item.poster_path) || fallbackMoviePoster }}
                    className="rounded-3xl"
                    style={{
                        width: width * 0.33,
                        height: height * 0.22,
                    }}
                />
                <Text className="text-neutral-300 ml-1">{
                    item.title.length > 14 ? item.title.slice(0, 14) + '...' : item.title
                }
                </Text>

                <View style={{ position: 'absolute', top: -5, right: 5 }}>
                    <TouchableWithoutFeedback onPress={() => handleFavoriteToggle(item)}>
                        <HeartIcon size={28} strokeWidth={2.5} color={favorite ? "red" : "white"} />
                    </TouchableWithoutFeedback>
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}