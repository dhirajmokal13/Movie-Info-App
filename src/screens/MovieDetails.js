import React, { useState, useEffect } from 'react'
import { View, SafeAreaView, Image, Text, ScrollView, ActivityIndicator, StyleSheet, Pressable } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import { FontAwesome } from '@expo/vector-icons';
import * as Speech from 'expo-speech';
import axios from 'axios'
import YoutubePlayer from "react-native-youtube-iframe";
import Modal from "react-native-modal";
import Footer from '../components/Footer';
import MovieReviews from '../components/MovieReviews';
import { Recommendations } from '../components/Recommendations';
const key = process.env.EXPO_PUBLIC_OMDB_API_KEY_ONE || process.env.EXPO_PUBLIC_OMDB_API_KEY_TWO || EXPO_PUBLIC_OMDB_API_KEY_THREE;
const serverLink = process.env.EXPO_PUBLIC_SERVER_ADDRESS;

const MovieDetails = ({ route, navigation }) => {
    const [movieData, setMovieData] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [likesCount, setLikesCount] = useState(0); //likes will set by child component using callback
    const [plotListen, setPlotListen] = useState(false);
    const [movie_id, setMovieId] = useState(route.params.imdbID);
    const [isTrailer, setIsTrailer] = useState({
        isTrailerAvailable: false,
        openTrailerModal: false,
        TrailerId: ''
    });

    //const movie_id = route.params.imdbID; //getting imdb id for fetching moview data

    useEffect(() => {
        fetchMovieData();
        fetchTrailer();
    }, [movie_id]);

    const fetchMovieData = () => {
        setIsLoading(true);
        axios.get(`https://www.omdbapi.com/?apikey=${key}&i=${movie_id}&plot=full`).then(res => {
            setMovieData(res.data);
            setIsLoading(false);
            console.log(`${res.data["Title"]} - ${movie_id}`)
        }).catch(err => {
            console.error(err);
        })
    }

    const fetchTrailer = () => {
        axios.get(`${serverLink}/api/show/${movie_id}`).then(res => {
            if (res.status === 200) {
                setIsTrailer({
                    isTrailerAvailable: true,
                    openTrailerModal: false,
                    TrailerId: res.data.showData.youtube_video_id
                })
            }
        }).catch(err => {
            console.log(err.response.status);
            setIsTrailer({
                isTrailerAvailable: false,
                openTrailerModal: false,
                TrailerId: ''
            })
        })
    }

    const ListenPlot = () => {
        setPlotListen(!plotListen);
        plotListen ? Speech.stop() : Speech.speak(movieData["Plot"], {
            onDone: () => setPlotListen(false)
        });
    }

    return (
        <SafeAreaView className="flex-1 items-center">
            {
                isLoading ? (<View className="min-h-[75vh] flex-1 justify-center px-[40vw]"><ActivityIndicator size="large" color="#0000ff" /></View>) :
                    (<ScrollView className="mt-2">
                        <View className="relative w-[95vw] max-h-[67vh] top-5 bg-indigo-500 shadow-lg shadow-indigo-500/50">
                            <Image className="w-full h-full" source={{ uri: movieData["Poster"] }} />
                            <View className="absolute top-0 my-[1.2vh] mx-[3vw] flex flex-column">
                                <FontAwesome name="heart" size={24} color="red" />
                                <Text className="text-white text-center -ml-[2.3vw]">{likesCount}</Text>
                                <Pressable className="mt-[0.8vh]" onPress={ListenPlot}><FontAwesome name="audio-description" size={24} color={plotListen ? "green" : "white"} /></Pressable>
                            </View>
                            {
                                isTrailer.isTrailerAvailable && (<Pressable className="absolute bottom-0 right-0 pr-4 pb-2 z-32 z-20" onPress={() => setIsTrailer((pre) => ({ ...pre, openTrailerModal: true }))}><FontAwesome className="ml-[5vw]" name="video-camera" size={21} color="#e11d48" /></Pressable>)
                            }
                            <Text className="absolute bottom-0 bg-black/[0.65] text-white py-2 px-4 w-full z-10">{movieData["Type"]}    <Text className="text-pink-700">{movieData["Year"]}   {movieData["Type"] === "series" ? <Text><Text className="text-white">Total Seasons:</Text> {movieData["totalSeasons"]} </Text> : ""}</Text></Text>
                        </View>
                        <View className="mt-12 mb-[3vh] w-[95vw]">
                            <Text className="text-black mb-3 text-lg font-semibold text-blue-gray-900 text-center">{movieData["Title"]} | <Text className="text-rose-700">{movieData["Released"]}</Text></Text>
                            <Text className="text-gray-500 my-1"><Text className="font-bold tracking-wide text-black">Genre:</Text> {movieData["Genre"]}</Text>
                            <Text className="text-gray-500 my-1"><Text className="font-bold tracking-wide text-black">RunTime:</Text> {movieData["Runtime"]}</Text>
                            <Text className="text-gray-500 my-1"><Text className="font-bold tracking-wide text-black">Languages:</Text> {movieData["Language"]}</Text>
                            <Text className="text-gray-500 my-1"><Text className="font-bold tracking-wide text-black">Rated:</Text> {movieData["Rated"]}</Text>
                            <Text className="text-gray-500 my-1"><Text className="font-bold tracking-wide text-black">Actors:</Text> {movieData["Actors"]}</Text>
                            <Text className="text-gray-500 my-1"><Text className="font-bold tracking-wide text-black">Awards:</Text> {movieData["Awards"]}</Text>
                            <Text className="text-gray-500 my-1"><Text className="font-bold tracking-wide text-black">Boxoffice:</Text> {movieData["BoxOffice"]}</Text>
                            <Text className="text-gray-500 my-1"><Text className="font-bold tracking-wide text-black">Country:</Text> {movieData["Country"]}</Text>
                            <Text className="text-gray-500 my-1"><Text className="font-bold tracking-wide text-black">DVD:</Text> {movieData["DVD"]}</Text>
                            <Text className="text-gray-500 my-1"><Text className="font-bold tracking-wide text-black">Director:</Text> {movieData["Director"]}</Text>
                            <Text className="text-gray-500 my-1"><Text className="font-bold tracking-wide text-black">Metascore:</Text> {movieData["Metascore"]}</Text>
                            <Text className="text-gray-500 my-1"><Text className="font-bold tracking-wide text-black">Production:</Text> {movieData["Production"]}</Text>
                            <Text className="text-gray-500 my-1"><Text className="font-bold tracking-wide text-black">Website:</Text> {movieData["Website"]}</Text>
                            <Text className="text-gray-500 my-1"><Text className="font-bold tracking-wide text-black">Writer:</Text> {movieData["Writer"]}</Text>
                            <Text className="text-gray-500 my-1"><Text className="font-bold tracking-wide text-black">Imdb Rating:</Text> {movieData["imdbRating"]}/10</Text>
                            <Text className="text-gray-500 my-1"><Text className="font-bold tracking-wide text-black">Imdb Votes:</Text> {movieData["imdbVotes"]}</Text>
                            <Text className="text-black my-1 font-bold tracking-wide">Ratings:{
                                movieData["Ratings"]?.map((data, index) => {
                                    return (
                                        <View key={index}>
                                            <Text className="ml-2 font-semibold">Source: <Text className="text-gray-500 font-normal">{data["Source"]}</Text> Source: <Text className="text-gray-500 font-normal">{data["Value"]}</Text></Text>
                                        </View>
                                    )
                                })
                            }</Text>
                            <Text className="text-gray-500 my-1"><Text className="font-bold tracking-wide text-black">Plot:</Text> {movieData["Plot"]}</Text>
                        </View>

                        {
                            isTrailer.isTrailerAvailable && (
                                <Modal isVisible={isTrailer.openTrailerModal} onBackdropPress={() => { setIsTrailer((pre) => ({ ...pre, openTrailerModal: false })) }}>
                                    <View className="bg-gray-100 h-[29.9vh]" style={[{ backgroundColor: "white" }, styles.shadowContainer]}>
                                        <View className="w-full flex py-[1.6vh] rounded-t-md px-[6vw]">
                                            <Text className="grow text-rose-700">
                                                {movieData["Title"]}
                                            </Text>
                                        </View>
                                        <YoutubePlayer height={192} play={false} videoId={isTrailer.TrailerId} />
                                    </View>
                                </Modal>
                            )
                        }

                        <Recommendations movieId={movie_id} setMovieId={setMovieId} />
                        <MovieReviews setLikesCount={setLikesCount} imdbID={movieData.imdbID} navigation={navigation} />
                    </ScrollView>)
            }
            <StatusBar style="dark" />
            <Footer navigation={navigation} route={route} />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    shadowContainer: {
        backgroundColor: 'white',
        borderRadius: 12,
        elevation: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
    },
});

export default MovieDetails