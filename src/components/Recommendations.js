import React, { useState, useEffect } from 'react'
import { SafeAreaView, View, Text, ScrollView, Pressable, Image } from 'react-native'
import axios from 'axios'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
const serverLink = process.env.EXPO_PUBLIC_SERVER_ADDRESS;

export const Recommendations = ({ movieId, setMovieId }) => {

    const [recommendData, setRecommendData] = useState([]);

    useEffect(() => {
        getRecommendations();
    }, [movieId]);

    const getRecommendations = () => {
        axios.get(`${serverLink}/api/show/recommendation/${movieId}`).then(res => {
            setRecommendData(res.data);
        }).catch(err => {
            setRecommendData([]);
        })
    }
    
    if (recommendData.length === 0) return;
    return (
        <SafeAreaView style={{ marginBottom: hp(4), width: wp(95) }}>
            <Text style={{ fontSize: hp(2.3) }} className="text-center text-lime-700">Recommendations</Text>
            <ScrollView style={{ marginTop: hp(1.7) }} horizontal={true}>
                {
                    recommendData?.map((data, index) => {
                        if (data['Poster'] === "N/A") { data['Poster'] = "https://img.freepik.com/premium-vector/poster-with-inscription-error-404_600765-3956.jpg" }
                        return (
                            <Pressable style={{ marginHorizontal: wp(1.6), width: wp(40) }} key={index} onPress={() => setMovieId(data['imdbID'])}>
                                <View className="relative" style={{ height: hp(30), width: wp(40), marginBottom: hp(1) }}>
                                    <Image className="w-full h-full rounded-lg" layout="fill" source={{ uri: data['Poster'] }} />
                                </View>
                                <View className="absolute px-[2vw] py-[0.4vh] bg-black/[0.65] rounded-tl-lg"><Text className="text-white text-xs">{data['Type']}</Text></View>
                                <Text className="text-indigo-900" numberOfLines={1} ellipsizeMode="tail">{data['Title']}</Text>
                            </Pressable>
                        )
                    })
                }
            </ScrollView>
        </SafeAreaView>
    )
}
