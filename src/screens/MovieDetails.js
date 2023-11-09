import React, { useState, useEffect } from 'react'
import { View, SafeAreaView, Image, Text, ScrollView, ActivityIndicator } from 'react-native'
import axios from 'axios'
import Footer from '../components/Footer';
import MovieReviews from '../components/movieReviews';
const key = '4034acde' || 76593128;

const MovieDetails = ({ route, navigation }) => {
    const [movieData, setMovieData] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [likesData, setLikesData] = useState([]);

    const movie_id = route.params.imdbID; //getting imdb id for fetching moview data

    useEffect(() => {
        fetchMovieData();
    }, []);

    const fetchMovieData = () => {
        setIsLoading(true);
        axios.get(`http://www.omdbapi.com/?apikey=${key}&i=${movie_id}&plot=full`).then(res => {
            setMovieData(res.data);
            setIsLoading(false);
        }).catch(err => {
            console.error(err);
        })
    }

    if (isLoading) return (<View className="min-h-[75vh] flex-1 justify-center px-[40vw]"><ActivityIndicator size="large" color="#0000ff" /></View>);

    return (
        <SafeAreaView className="flex-1 items-center">
            <ScrollView className="mt-2">
                <View className="relative w-[95vw] max-h-[67vh] top-5 bg-indigo-500 shadow-lg shadow-indigo-500/50">
                    <Image className="w-full h-full rounded" source={{ uri: movieData["Poster"] }} />
                    <Text className="absolute bottom-0 bg-black/[0.65] text-white py-2 px-4 w-full">{movieData["Type"]}    <Text className="text-pink-700">{movieData["Year"]}   {movieData["Type"] === "series" ? <Text><Text className="text-white">Total Seasons:</Text> {movieData["totalSeasons"]} </Text> : ""}</Text></Text>
                </View>
                <View className="mt-12 mb-[5vh] w-[340]">
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
                <MovieReviews likesData={likesData}/>
            </ScrollView>
            <Footer navigation={navigation} route={route} />
        </SafeAreaView>
    )
}

export default MovieDetails