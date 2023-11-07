import MovieCard from '../components/MovieCard';
import { ScrollView, SafeAreaView, View, TextInput, Alert, Text, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react'
import axios from 'axios';
const key = '4034acde' || 76593128;

const data = [
    { Title: 'Spider-Man', Year: '2002', imdbID: 'tt0145487', Type: 'movie', Poster: 'https://m.media-amazon.com/images/M/MV5BZDEyN2NhMjgtMjdhNi00MmNlLWE5YTgtZGE4MzNjMTRlMGEwXkEyXkFqcGdeQXVyNDUyOTg3Njg@._V1_SX300.jpg' },
    { Title: 'Spider-Man: No Way Home', Year: '2021', imdbID: 'tt10872600', Type: 'movie', Poster: 'https://m.media-amazon.com/images/M/MV5BZWMyYzFjYTYtNTRjYi00OGExLWE2YzgtOGRmYjAxZTU3NzBiXkEyXkFqcGdeQXVyMzQ0MzA0NTM@._V1_SX300.jpg' }, ,
    { Title: 'Spider-Man: Homecoming', Year: '2017', imdbID: 'tt2250912', Type: 'movie', Poster: 'https://m.media-amazon.com/images/M/MV5BNTk4ODQ1MzgzNl5BMl5BanBnXkFtZTgwMTMyMzM4MTI@._V1_SX300.jpg' },
    { Title: 'Spider-Man 2', Year: '2004', imdbID: 'tt0316654', Type: 'movie', Poster: 'https://m.media-amazon.com/images/M/MV5BMzY2ODk4NmUtOTVmNi00ZTdkLTlmOWYtMmE2OWVhNTU2OTVkXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg' },
    { Title: 'The Amazing Spider-Man', Year: '2012', imdbID: 'tt0948470', Type: 'movie', Poster: 'https://m.media-amazon.com/images/M/MV5BMjMyOTM4MDMxNV5BMl5BanBnXkFtZTcwNjIyNzExOA@@._V1_SX300.jpg' },
    { Title: 'Spider-Man: Into the Spider-Verse', Year: '2018', imdbID: 'tt4633694', Type: 'movie', Poster: 'https://m.media-amazon.com/images/M/MV5BMjMwNDkxMTgzOF5BMl5BanBnXkFtZTgwNTkwNTQ3NjM@._V1_SX300.jpg' },
    { Title: 'Spider-Man 3', Year: '2007', imdbID: 'tt0413300', Type: 'movie', Poster: 'https://m.media-amazon.com/images/M/MV5BYTk3MDljOWQtNGI2My00OTEzLTlhYjQtOTQ4ODM2MzUwY2IwXkEyXkFqcGdeQXVyNTIzOTk5ODM@._V1_SX300.jpg' },
    { Title: 'Spider-Man: Far from Home', Year: '2019', imdbID: 'tt6320628', Type: 'movie', Poster: 'https://m.media-amazon.com/images/M/MV5BMGZlNTY1ZWUtYTMzNC00ZjUyLWE0MjQtMTMxN2E3ODYxMWVmXkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_SX300.jpg' },
    { Title: 'The Amazing Spider-Man 2', Year: '2014', imdbID: 'tt1872181', Type: 'movie', Poster: 'https://m.media-amazon.com/images/M/MV5BOTA5NDYxNTg0OV5BMl5BanBnXkFtZTgwODE5NzU1MTE@._V1_SX300.jpg' },
    { Title: 'Spider-Man: Across the Spider-Verse', Year: '2023', imdbID: 'tt9362722', Type: 'movie', Poster: 'https://m.media-amazon.com/images/M/MV5BMzI0NmVkMjEtYmY4MS00ZDMxLTlkZmEtMzU4MDQxYTMzMjU2XkEyXkFqcGdeQXVyMzQ0MzA0NTM@._V1_SX300.jpg' }
]

export const Home = () => {
    const [searchText, setSearchText] = useState('');
    const [movieResult, setMovieResult] = useState([]);
    const [totalResults, setTotalResults] = useState(0);
    const [currentPageNo, setCurrentPageNo] = useState(1);

    useEffect(() => {
        handleSearch();
    }, [currentPageNo])

    const handleSearch = () => {
        axios.get(`http://www.omdbapi.com/?apikey=${key}&s=${searchText}&page=${currentPageNo}`).then(res => {
            if (res.data.Response === "True") {
                setMovieResult(res.data.Search);
                setTotalResults(res.data.totalResults);
            } else {
                Alert.alert("No Result Found");
            }
        }).catch(error => {
            console.log(error);
        })
    }

    const handlePagination = (position) => {
        switch (position) {
            case "next":
                if (Number.isInteger(totalResults / 10)) {
                    totalResults / 10 > currentPageNo ? setCurrentPageNo(currentPageNo + 1) : Alert.alert("This is First page");
                } else {
                    (Number.parseInt(totalResults / 10) + 1) > currentPageNo ? setCurrentPageNo(currentPageNo + 1) : Alert.alert("This is last page");
                }
                break;
            case "previous":
                currentPageNo > 1 ? setCurrentPageNo(currentPageNo - 1) : Alert.alert("Current Page is 1");
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
            <View className="flex-1 items-center justify-center flex-row">
                <View className="border border-gray-300 bg-gray-300 py-1 px-4 rounded-md w-[65%] mb-2 mt-3 mx-2">
                    <TextInput placeholder="Search Movies/Series/Shows" value={searchText} onChangeText={txt => setSearchText(txt)} returnKeyType="search" onSubmitEditing={handleSearch} />
                </View>
                <Text className="text-lime-800">Results: {totalResults}</Text>
            </View>
            <ScrollView horizontal={true}>
                {
                    movieResult?.map((item, index) => {
                        if (item["Poster"] === "N/A") item["Poster"] = "https://previews.123rf.com/images/kaymosk/kaymosk1804/kaymosk180400006/100130939-error-404-page-not-found-error-with-glitch-effect-on-screen-vector-illustration-for-your-design-.jpg"
                        return <MovieCard key={index} no={calCulatePostNo(currentPageNo, index + 1)} movieName={item["Title"]} type={item["Type"]} moviePoster={item["Poster"]} releaseYear={item["Year"]} imdbID={item["imdbID"]} />;
                    })
                }
            </ScrollView>
            <View className="px-5 flex flex-row items-center justify-center my-2">
                <TouchableOpacity className="mr-5" onPress={() => handlePagination("previous")}>
                    <Text className="w-[25vw] rounded bg-indigo-900 py-3 px-4 text-center align-middle text-xs font-bold uppercase text-white shadow-md shadow-indigo-900/20 transition-all hover:shadow-lg hover:shadow-indigo-900/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">Previous</Text>
                </TouchableOpacity>
                <Text>{currentPageNo}</Text>
                <TouchableOpacity className="ml-5" onPress={() => handlePagination("next")}>
                    <Text className="w-[25vw] rounded bg-indigo-900 py-3 px-4 text-center align-middle text-xs font-bold uppercase text-white shadow-md shadow-indigo-900/20 transition-all hover:shadow-lg hover:indigo-900/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">Next</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}
