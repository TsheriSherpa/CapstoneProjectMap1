import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native'
import React from 'react'
import { styles } from '../theme'
import { useNavigation } from '@react-navigation/native'
import { Movie } from './Movie'

export default function MovieList({ title,hideSeeAll, data }) {
    const navigation = useNavigation()
    
    return (
        <View className="mb-8 space-y-4">
            <View className="mx-4 flex-row justify-between items-center">
                <Text className="text-white text-xl">{title}</Text>
                {
                    !hideSeeAll && (<TouchableOpacity>
                        <Text style={styles.text} className="text-lg" >See All</Text>
                    </TouchableOpacity>)
                }
                
            </View>

            {/* movie row */}
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 15 }}
            >
                {
                    data.map((item, index) => (
                        <Movie item={item} key={index}/>
                    ))
                }
            </ScrollView>
        </View>
    )
}