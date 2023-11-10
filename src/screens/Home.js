import MovieCard from '../components/MovieCard';
import { ScrollView, SafeAreaView, View, TextInput, Alert, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import React, { useState, useEffect, useRef } from 'react'
import { useFilterContext } from '../context/FiltersContext';
import axios from 'axios';
import Footer from '../components/Footer';
const key = process.env.EXPO_PUBLIC_OMDB_API_KEY_ONE || process.env.EXPO_PUBLIC_OMDB_API_KEY_TWO;

const defaultData = [
    { "Title": "Mr. Robot", "Year": "2015–2019", "imdbID": "tt4158110", "Type": "series", "Poster": "https://m.media-amazon.com/images/M/MV5BM2QyNDIzOGMtNThhNS00NmUwLWI0ZjUtZjdkN2I1OTRjZWQ3XkEyXkFqcGdeQXVyNzQ1ODk3MTQ@._V1_SX300.jpg" },
    { "Title": "Dark", "Year": "2017–2020", "imdbID": "tt5753856", "Type": "series", "Poster": "https://m.media-amazon.com/images/M/MV5BOTk2NzUyOTctZDdlMS00MDJlLTgzNTEtNzQzYjFhNjA0YjBjXkEyXkFqcGdeQXVyMjg1NDcxNDE@._V1_SX300.jpg" },
    { "Title": "Avengers: Endgame", "Year": "2019", "imdbID": "tt4154796", "Type": "movie", "Poster": "https://m.media-amazon.com/images/M/MV5BMTc5MDE2ODcwNV5BMl5BanBnXkFtZTgwMzI2NzQ2NzM@._V1_SX300.jpg" },
    { "Title": "Sacred Games", "Year": "2018–2019", "imdbID": "tt6077448", "Type": "series", "Poster": "https://m.media-amazon.com/images/M/MV5BMjJlMjJlMzYtNmU5Yy00N2MwLWJmMjEtNWUwZWIyMGViZDgyXkEyXkFqcGdeQXVyOTAzMTc2MjA@._V1_SX300.jpg" },
    { Title: 'Spider-Man: No Way Home', Year: '2021', imdbID: 'tt10872600', Type: 'movie', Poster: 'https://m.media-amazon.com/images/M/MV5BZWMyYzFjYTYtNTRjYi00OGExLWE2YzgtOGRmYjAxZTU3NzBiXkEyXkFqcGdeQXVyMzQ0MzA0NTM@._V1_SX300.jpg' }, ,
    { Title: 'Spider-Man: Homecoming', Year: '2017', imdbID: 'tt2250912', Type: 'movie', Poster: 'https://m.media-amazon.com/images/M/MV5BNTk4ODQ1MzgzNl5BMl5BanBnXkFtZTgwMTMyMzM4MTI@._V1_SX300.jpg' },
    { "Title": "Masaan", "Year": "2015", "imdbID": "tt4635372", "Type": "movie", "Poster": "https://m.media-amazon.com/images/M/MV5BMTU4NTE0NTMyNl5BMl5BanBnXkFtZTgwNjI5MDkxNjE@._V1_SX300.jpg" },
    { "Title": "Jai Bhim", "Year": "2021", "imdbID": "tt15097216", "Type": "movie", "Poster": "https://m.media-amazon.com/images/M/MV5BNzFkM2FhMzQtYjUwZi00N2Y3LWFkZWItMmZmMjQxNGQwZmNhXkEyXkFqcGdeQXVyODEyNjEwMDk@._V1_SX300.jpg" },
    { "Title": "Newton", "Year": "2017", "imdbID": "tt6484982", "Type": "movie", "Poster": "https://m.media-amazon.com/images/M/MV5BMDk4Y2Q2MmUtYjE1YS00NjEwLTg0ZGYtOGJkZjUzOTllYzA0L2ltYWdlXkEyXkFqcGdeQXVyNzA0MTg0MzE@._V1_SX300.jpg" },
    { "Title": "Paatal Lok", "Year": "2020-", "imdbID": "tt9680440", "Type": "series", "Poster": "https://m.media-amazon.com/images/M/MV5BMTE5NWUyMmYtMWE1My00ZDhiLWExZjEtMGJjYTA0OGYwZjIwXkEyXkFqcGdeQXVyODQ5NDUwMDk@._V1_SX300.jpg" },
    { "Title": "Tandav", "Year": "2021–", "imdbID": "tt11117570", "Type": "series", "Poster": "https://m.media-amazon.com/images/M/MV5BNzRjMjhmZmUtYjRhNS00YjlmLWI4MzUtMDFhM2E0MjAyZGRjXkEyXkFqcGdeQXVyMTEwNDM0NTI2._V1_SX300.jpg" },
    { "Title": "Jehanabad - Of Love & War", "Year": "2023–", "imdbID": "tt25375470", "Type": "series", "Poster": "https://m.media-amazon.com/images/M/MV5BM2U0OWVkMTAtNDg4NC00NTBhLWFiOGYtMDljNzkyOGRhMzUzXkEyXkFqcGdeQXVyOTIxMzQ0NzU@._V1_SX300.jpg" },
    { "Title": "Article 15", "Year": "2019", "imdbID": "tt10324144", "Type": "movie", "Poster": "https://m.media-amazon.com/images/M/MV5BZTI2NTFiMDMtZjQxNS00YjBkLWFhNWMtOTIyMzE5Yjc0ZTZiXkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_SX300.jpg" },
    { "Title": "Jawan", "Year": "2023", "imdbID": "tt15354916", "Type": "movie", "Poster": "https://m.media-amazon.com/images/M/MV5BOWI5NmU3NTUtOTZiMS00YzA1LThlYTktNDJjYTU5NDFiMDUxXkEyXkFqcGdeQXVyMTUzNjEwNjM2._V1_SX300.jpg" }
]

export const Home = ({ route, navigation }) => {
    const { filterDetails, setFilterDetails } = useFilterContext();
    const [searchText, setSearchText] = useState('');
    const [movieResult, setMovieResult] = useState(defaultData);
    const [totalResults, setTotalResults] = useState(0);
    const [currentPageNo, setCurrentPageNo] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [firstLoad, setFirstLoad] = useState(true);
    const searchRef = useRef(null);
    const [seachOpened, setsearchOpened] = useState(false);

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
        if(searchText==='') return Alert.alert("Please Enter the data");
        setIsLoading(true);
        axios.get(`http://www.omdbapi.com/?apikey=${key}&s=${searchText}&page=${currentPageNo}${filterDetails.Type ? "&type=" + filterDetails.Type : ""}${filterDetails.Year ? "&y=" + filterDetails.Year : ""}`).then(res => {
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
        <SafeAreaView>
            <ScrollView>
                <View className="flex-1 items-center justify-center flex-row">
                    <View className="border border-gray-300 bg-gray-300 py-2 px-4 rounded-md w-[90%] mb-2 mt-3 mx-2">
                        <TextInput placeholder="Search Movies/Series/Shows" ref={searchRef} value={searchText} onBlur={() => setsearchOpened(false)} onChangeText={txt => setSearchText(txt)} returnKeyType="search" onSubmitEditing={() => currentPageNo === 1 ? handleSearch() : setCurrentPageNo(1)} />
                    </View>
                </View>
                {
                    firstLoad ? <Text className="mx-8 text-emerald-700 mb-1">Suggested Content</Text> : <Text className="text-center text-emerald-700 mb-1">Search Results: {searchText}   <Text className="text-red-800">Total: {totalResults}</Text></Text>
                }
                <ScrollView horizontal={true}>
                    {
                        isLoading ? (<View className="min-h-[71vh] flex-1 justify-center px-[40vw]"><ActivityIndicator size="large" color="#0000ff" /></View>) : movieResult?.map((item, index) => {
                            if (item["Poster"] === "N/A") item["Poster"] = "https://img.freepik.com/premium-vector/poster-with-inscription-error-404_600765-3956.jpg"
                            return <MovieCard key={index} no={calCulatePostNo(currentPageNo, index + 1)} movieName={item["Title"]} type={item["Type"]} moviePoster={item["Poster"]} releaseYear={item["Year"]} imdbID={item["imdbID"]} navigation={navigation} />;
                        })
                    }
                </ScrollView>
                <View className="px-5 flex flex-row items-center justify-center mt-3 mb-[11vh]">
                    <TouchableOpacity className="mr-[11vw]" disabled={isLoading ? true : false} onPress={() => handlePagination("previous")}>
                        <Text className={`w-[25vw] rounded ${isLoading ? 'bg-indigo-500' : 'bg-indigo-900'} py-3 px-4 text-center align-middle text-xs font-bold uppercase text-white shadow-md shadow-indigo-900/20 transition-all hover:shadow-lg hover:shadow-indigo-900/60 focus:opacity-[0.90] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none`}>Previous</Text>
                    </TouchableOpacity>
                    <Text>{currentPageNo}</Text>
                    <TouchableOpacity className="ml-[11vw]" disabled={isLoading ? true : false} onPress={() => handlePagination("next")}>
                        <Text className={`w-[25vw] rounded ${isLoading ? 'bg-indigo-500' : 'bg-indigo-900'} py-3 px-4 text-center align-middle text-xs font-bold uppercase text-white shadow-md shadow-indigo-900/20 transition-all hover:shadow-lg hover:indigo-900/60 focus:opacity-[0.90] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none`}>Next</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
            <Footer navigation={navigation} route={route} searchRef={searchRef} searchState={{ seachOpened, setsearchOpened }} />
        </SafeAreaView>
    )
}
