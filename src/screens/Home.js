import MovieCard from '../components/MovieCard';
import { ScrollView, SafeAreaView, View, TextInput, Alert, Text, TouchableOpacity, ActivityIndicator, Pressable } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { AntDesign } from '@expo/vector-icons';
import React, { useState, useEffect, useRef } from 'react'
import { useFilterContext } from '../context/FiltersContext';
import axios from 'axios';
import Footer from '../components/Footer';
import defaultData from '../constants/DefaultData';
const key = process.env.EXPO_PUBLIC_OMDB_API_KEY_ONE || process.env.EXPO_PUBLIC_OMDB_API_KEY_TWO;

export const Home = ({ route, navigation }) => {
    const { filterDetails } = useFilterContext();
    const [searchText, setSearchText] = useState('');
    const [movieResult, setMovieResult] = useState(defaultData);
    const [totalResults, setTotalResults] = useState(0);
    const [currentPageNo, setCurrentPageNo] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [firstLoad, setFirstLoad] = useState(true);
    const [seachOpened, setsearchOpened] = useState(false);
    const searchRef = useRef(null);

    useEffect(() => {
        if (!firstLoad) {
            handleSearch();
        }
    }, [currentPageNo]);

    useEffect(() => {
        if (searchText !== '') {
            setCurrentPageNo(1);
            handleSearch();
        }
    }, [filterDetails]);

    const handleSearch = () => {
        if (searchText === '') return Alert.alert("Please Enter the data");
        setIsLoading(true);
        axios.get(`https://www.omdbapi.com/?apikey=${key}&s=${searchText}&page=${currentPageNo}${filterDetails.Type ? "&type=" + filterDetails.Type : ""}${filterDetails.Year ? "&y=" + filterDetails.Year : ""}`).then(res => {
            if (res.data.Response === "True") {
                setMovieResult(res.data.Search);
                setTotalResults(res.data.totalResults);
                setIsLoading(false);
                setFirstLoad(false);
            } else {
                Alert.alert("No Result Found");
                setIsLoading(false);
            }
        }).catch(error => {
            console.log(error);
        })
    }

    const handlePagination = (position) => {
        if (movieResult === defaultData) return Alert.alert("This is Default Page");
        switch (position) {
            case "next":
                if (Number.isInteger(totalResults / 10)) {
                    totalResults / 10 > currentPageNo ? setCurrentPageNo(currentPageNo + 1) : Alert.alert("This is First page");
                } else {
                    (Number.parseInt(totalResults / 10) + 1) > currentPageNo ? setCurrentPageNo(currentPageNo + 1) : Alert.alert("This is last page");
                }
                break;
            case "previous":
                currentPageNo > 1 ? setCurrentPageNo(currentPageNo - 1) : Alert.alert("First Page");
                break;
        }
    }

    const calCulatePostNo = (pageNo, index) => {
        if (index !== 10) {
            return Number(`${pageNo - 1}${index}`);
        } {
            return pageNo * index;
        }
    }

    return (
        <SafeAreaView className="flex-1">
            <ScrollView>
                <View className="flex-1 items-center justify-center flex-row">
                    <View className="border border-gray-300 bg-gray-300 py-2 px-4 rounded-md w-[90%] mb-2 mt-3 mx-2">
                        <TextInput placeholder="Search Movies/Series/Shows" ref={searchRef} value={searchText} onBlur={() => setsearchOpened(false)} onChangeText={txt => setSearchText(txt)} returnKeyType="search" onSubmitEditing={() => currentPageNo === 1 ? handleSearch() : setCurrentPageNo(1)} />
                    </View>
                </View>
                {
                    firstLoad ? <Text className="mx-8 text-emerald-700 mb-3">Suggested Content</Text> : <Text className="text-center text-emerald-700 mb-3">Search Results: {searchText}   <Text className="text-red-800">Total: {totalResults}</Text>  <Text>Page: {currentPageNo}</Text></Text>
                }
                <View className="relative">
                    <ScrollView horizontal={true}>
                        {
                            isLoading ? (<View className="min-h-[71vh] flex-1 justify-center px-[40vw]"><ActivityIndicator size="large" color="#0000ff" /></View>) : movieResult?.map((item, index) => {
                                if (item["Poster"] === "N/A") item["Poster"] = "https://img.freepik.com/premium-vector/poster-with-inscription-error-404_600765-3956.jpg"
                                return <MovieCard total={movieResult.length} key={index} no={calCulatePostNo(currentPageNo, index + 1)} movieName={item["Title"]} type={item["Type"]} moviePoster={item["Poster"]} releaseYear={item["Year"]} imdbID={item["imdbID"]} navigation={navigation} />;
                            })
                        }
                    </ScrollView>
                    <Pressable className="absolute left-0 top-[37%] bg-gray-300/70 py-[2vh] px-[0.3vw] rounded-r-sm" disabled={isLoading ? true : false} onPress={() => handlePagination("previous")}>
                        <AntDesign name="caretleft" size={22} color="black" />
                    </Pressable>
                    <Pressable className="absolute right-0 top-[37%] bg-gray-300/70 py-[2vh] px-[0.3vw] rounded-l-sm" disabled={isLoading ? true : false} onPress={() => handlePagination("next")}>
                        <AntDesign name="caretright" size={22} color="black" />
                    </Pressable>
                </View>
            </ScrollView>
            <StatusBar style="dark" />
            <Footer navigation={navigation} route={route} searchRef={searchRef} searchState={{ seachOpened, setsearchOpened }} />
        </SafeAreaView>
    )
}
