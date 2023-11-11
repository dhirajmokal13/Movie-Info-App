import React, { useState } from 'react';
import { Text, View, Image, SafeAreaView, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';

const MovieCard = (props) => {
    const [loading, setLoading] = useState(true);
    return (
        <SafeAreaView className="shadow-2xl">
            <View className="relative text-gray-700 overflow-hidden bg-white shadow-md w-[87vw] rounded-xl mx-6 mb-2 mt-1">
                <View className="relative m-5 max-h-[53vh] text-white shadow-lg bg-blue-gray-500 shadow-blkue-gray-500/40">
                    {loading && (
                        <ActivityIndicator size="large" color="#0000ff" style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }} />
                    )}
                    <Image className="w-full h-full" layout="fill" source={{ uri: props.moviePoster }} onLoad={() => setLoading(false)} />
                    <Text className="absolute bottom-0 bg-black/[0.65] text-white py-2 px-4 w-full">{props.type}  <Text className="text-rose-500">{props.releaseYear}</Text></Text>
                    <Text className="absolute top-0 py-1 px-3 bg-black/[0.65] text-white">{props.no}</Text>
                </View>
                <View className="px-5 pb-3 border-b-4 border-gray-200">
                    <Text className="block mb-2 text-base antialiased leading-snug tracking-normal text-blue-gray-900" numberOfLines={1} ellipsizeMode="tail">
                        {props.movieName}
                    </Text>
                </View>
                <View className="px-5 pt-0 w-[175] flex flex-row">
                    <TouchableOpacity className="my-[1.4vh]" onPress={() => props.navigation.navigate("MovieDetails", { imdbID: props.imdbID })}>
                        <Text className="rounded-md bg-pink-600 py-3 px-4 text-center align-middle text-xs font-bold uppercase text-white shadow-md shadow-pink-600/20 transition-all hover:shadow-lg hover:shadow-pink-600/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">Read More</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};



export default MovieCard;
