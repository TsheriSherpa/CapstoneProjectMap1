import { View, Text, TouchableWithoutFeedback, Image, Dimensions } from 'react-native'
import React from 'react'
import Carousel from 'react-native-snap-carousel'
import { useNavigation } from '@react-navigation/native'
import { image500 } from '../../api/moviesdb'
import { useDispatch, useSelector } from 'react-redux'
import { selectIsFavourite, toggleFavorite } from '../redux/reducers/favoriteSlice'
import { HeartIcon } from 'react-native-heroicons/solid'

let { width, height } = Dimensions.get('window')
export default function TrendingMovies({ data }) {
	const navigation = useNavigation()

	const handleClick = (item) => {
		navigation.navigate("Movie", item)
	}

	return (
		<View className="mb-8">
			<Text className="text-white text-xl mx-4 mb-5">Trending </Text>
			<Carousel
				data={data}
				renderItem={({ item }) => <MovieCard item={item} handleClick={handleClick} />}
				firstItem={1}
				inactiveSlideOpacity={0.60}
				sliderWidth={width}
				itemWidth={width * 0.62}
				slideStyle={{ display: 'flex', alignItems: "center" }}
			/>
		</View>
	)
}

const MovieCard = ({ item, handleClick }) => {
	const dispatch = useDispatch()
	let favorite = useSelector((state) => selectIsFavourite(state, item))

	const handleFavoriteToggle = (item) => {
		dispatch(toggleFavorite(item))
	}

	return (
		<TouchableWithoutFeedback onPress={() => handleClick(item)}>
			<View>
				<Image
					// source={require('../assets/images/moviePoster1.png')}
					source={{ uri: image500(item.poster_path) }}
					style={{
						width: width * 0.6,
						height: height * 0.4
					}}
					className="rounded-3xl"
				/>
				<View style={{ position: 'absolute', top: 10, right: 10 }}>
					<TouchableWithoutFeedback onPress={() => handleFavoriteToggle(item)}>
						<HeartIcon size={28} strokeWidth={2.5} color={favorite ? "red" : "white"} />
					</TouchableWithoutFeedback>
				</View>
			</View>
		</TouchableWithoutFeedback>
	);
}
