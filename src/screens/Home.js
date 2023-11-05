import MovieCard from '../components/MovieCard';
import { ScrollView, SafeAreaView } from 'react-native';
import React from 'react'

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
    return (
        <SafeAreaView>
            <ScrollView horizontal={true}>
                {
                    data?.map((item, index) => {
                        return <MovieCard key={index} movieName={item["Title"]} type={item["Type"]} moviePoster={item["Poster"]} releaseYear={item["Year"]} imdbID={item["imdbID"]} />;
                    })
                }
            </ScrollView>
        </SafeAreaView>
    )
}
