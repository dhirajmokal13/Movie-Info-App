import React, { useState } from 'react'
import { SafeAreaView, Text, View } from 'react-native'

const MovieReviews = ({ likesData }) => {
    const [likes, setLikes] = useState([]);
    console.log("hi")
    return (
        <SafeAreaView>
            <View className="mb-[10vh]">
                <Text>This is reviews</Text>
            </View>
        </SafeAreaView>
    )
}

export default MovieReviews
