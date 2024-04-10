import { View, Platform, ScrollView, BackHandler, Alert } from "react-native";
import TrendingMovies from "../components/TrendingMovies.js";
import { useEffect, useState } from "react";
import MovieList from "../components/MovieList";
import { useNavigation } from '@react-navigation/native'
import Loading from "../components/Loading";
import { fetchTrendingMovies, fetchUpcomingMovies } from "../../api/moviesdb";
import { ActionBar } from "../components/ActionBar.js";


const HomeScreen = () => {
    const [trending, setTrending] = useState([])
    const [upcoming, setUpcoming] = useState([])
    const [topRated, setTopRated] = useState([])
    const [loading, setLoading] = useState(true)

    const navigation = useNavigation()

    //making api call to fetch movies only once
    useEffect(() => {
        getTrendingMovies()
        getUpcomingMovies()
        getTopRatedMovies()

        //handling backpress from home screen
        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction
        );

        return () => backHandler.remove();
    }, [])

    const backAction = () => {
        Alert.alert('Exit', 'Are you sure you want to exit?', [
            {
                text: 'Cancel',
                onPress: () => null,
                style: 'cancel',
            },
            { text: 'YES', onPress: () => BackHandler.exitApp() },
        ]);
        return true;
    };

    //  getting trending movies
    const getTrendingMovies = async () => {
        const data = await fetchTrendingMovies()
        // console.log("got trending movies : ",data);.
        if (data && data.results) setTrending(data.results)
        setLoading(false)
    }

    //  getting upcoming movies
    const getUpcomingMovies = async () => {
        const data = await fetchUpcomingMovies()
        if (data && data.results) setUpcoming(data.results)
        setLoading(false)
    }

    //  getting top rated movies
    const getTopRatedMovies = async () => {
        const data = await fetchTrendingMovies()
        if (data && data.results) setTopRated(data.results)
        setLoading(false)
    }

    return (
        <View className="flex-1 bg-neutral-800">
            <ActionBar navigation={navigation} />
            {
                loading ? <Loading /> : (
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingBottom: 10 }}>

                        {/* trending movies corousel */}
                        {trending.length > 0 && <TrendingMovies data={trending} />}

                        {/* upcoming movies row */}
                        <MovieList title="Upcoming" data={upcoming} />

                        {/* Top rated movies row */}
                        <MovieList title="Top rated" data={topRated} />


                    </ScrollView>

                )
            }


        </View>
    );
}

export default HomeScreen;