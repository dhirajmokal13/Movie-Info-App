import React, { useState, useEffect } from 'react'
import { View, SafeAreaView, Image, Text } from 'react-native'
import axios from 'axios'
const key = '4034acde' || 76593128;

const MovieDetails = () => {
    const [movieData, setMovieData] = useState({});
    const movie_id = 'tt0944947';

    useEffect(() => {
        fetchMovieData();
    }, []);

    const fetchMovieData = () => {
        axios.get(`http://www.omdbapi.com/?apikey=${key}&i=${movie_id}&plot=full`).then(res => {
            setMovieData(res.data);
        }).catch(err => {
            console.error(err);
        })
    }

    return (
        <SafeAreaView>
            <View className="relative w-[340] max-h-[500] top-5">
                <Image className="w-full h-full rounded" source={{ uri: movieData["Poster"] }} />
                <Text className="absolute bottom-0 bg-black/[0.65] text-white py-2 px-6">{movieData["Type"]}    <Text className="text-pink-700">{movieData["Year"]}   {movieData["Type"] === "series" && `Total Seasons: ${movieData["totalSeasons"]}`}</Text></Text>
            </View>
            <View className="mt-12 mb-4 w-[340]">
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
        </SafeAreaView>
    )
}

export default MovieDetails