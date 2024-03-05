import { View, Text, ScrollView, TouchableOpacity, Dimensions, Platform, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRoute, useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ChevronLeftIcon, HeartIcon } from 'react-native-heroicons/solid'
import { styles, theme } from '../theme'
import Loading from '../components/Loading'
import { LinearGradient } from "expo-linear-gradient"
import { useDispatch, useSelector } from 'react-redux'
import { selectIsFavourite, toggleFavorite } from '../redux/reducers/favoriteSlice'
import { fallbackMoviePoster, fetchMovieDetails, fetchSimilarMovies, image500 } from '../../api/moviesdb'
import MovieList from '../components/MovieList'

let { width, height } = Dimensions.get('window')
const ios = Platform.OS == "ios"
const topMargin = ios ? '' : " mt-4"

export default function MovieScreen() {
    const { params: item } = useRoute()
    const [loading, setLoading] = useState(false)
    const [movie, setMovie] = useState({})

    const [similarMovies, setSimilarMovies] = useState([])
    const navigation = useNavigation()

    useEffect(() => {
        getMovieDetails(item.id)
        getSimilarMovies(item.id)
    }, [item])

    const getMovieDetails = async id => {
        const data = await fetchMovieDetails(id)
        if (data) setMovie(data)
        setLoading(false)
    }
    const getSimilarMovies = async id => {
        const data = await fetchSimilarMovies(id)
        if (data && data.results) setSimilarMovies(data.results)
        setLoading(false)
    }

    const dispatch = useDispatch()
    let favorite = useSelector((state) => selectIsFavourite(state, item.id))

    const handleFavoriteToggle = (id) => {
        dispatch(toggleFavorite(id))
    }

    return (
        <ScrollView
            contentContainerStyle={{ paddingBottom: 20 }}
            className="flex-1 bg-neutral-900"
        >
            {/* back button and movie poster */}
            <View className="w-full">
                <SafeAreaView className={"absolute z-20 w-full flex-row  justify-between items-center px-4" + topMargin} >
                    <TouchableOpacity style={styles.background} className="rounded-xl p-1" onPress={() => navigation.goBack()}>
                        <ChevronLeftIcon size={28} strokeWidth={2.5} color={"white"} />

                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleFavoriteToggle(item.id)}>
                        <HeartIcon size={35} color={favorite ? theme.background : "white"} />
                    </TouchableOpacity>

                </SafeAreaView>

                {
                    loading ? <Loading /> :
                        (
                            <View>
                                <Image
                                    source={{ uri: image500(movie?.poster_path) || fallbackMoviePoster }}
                                    style={{ width, height: height * 0.55 }}
                                />
                                <LinearGradient
                                    colors={['transparent', 'rgba(23, 23, 23, 0.8)', 'rgba(23, 23, 23, 1)']}
                                    style={{ width, height: height * 0.40 }}
                                    start={{ x: 0.5, y: 0 }}
                                    end={{ x: 0.5, y: 1 }}
                                    className="absolute bottom-0" />

                            </View>

                        )
                }

            </View>

            {/* movie details */}
            <View
                style={{ marginTop: -(height * 0.09) }} className="space-y-3">
                {/* title */}
                <Text className="text-white text-center text-3xl font-bold tracking-wider">
                    {
                        movie?.title
                    }

                </Text>
                {
                    movie?.id ? (
                        <Text className="text-neutral-400 font-semibold text-base text-center">
                            {movie?.status} • {movie?.release_date?.split('-')[0] || 'N/A'} • {movie?.runtime} min
                        </Text>

                    ) : null
                }

                {/* genres  */}
                <View className="flex-row justify-center mx-4 space-x-2">
                    {
                        movie?.genres?.map((genre, index) => {
                            let showDot = index + 1 != movie.genres.length;
                            return (
                                <Text key={index} className="text-neutral-400 font-semibold text-base text-center">
                                    {genre?.name} {showDot ? "•" : null}
                                </Text>
                            )
                        })
                    }
                </View>

                {/* description */}
                <Text className="text-neutral-400 mx-4 tracking-wide">
                    {
                        movie?.overview
                    }
                </Text>

            </View>

            {/*similar movies */}
            {similarMovies.length > 0 && <MovieList title="Similar Movies" hideSeeAll={true} data={similarMovies} />}

        </ScrollView>
    )
}