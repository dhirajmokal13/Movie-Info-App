function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

let defaultData = [
    { "Title": "Mr. Robot", "Year": "2015–2019", "imdbID": "tt4158110", "Type": "series", "Poster": "https://m.media-amazon.com/images/M/MV5BM2QyNDIzOGMtNThhNS00NmUwLWI0ZjUtZjdkN2I1OTRjZWQ3XkEyXkFqcGdeQXVyNzQ1ODk3MTQ@._V1_SX300.jpg" },
    { "Title": "Dark", "Year": "2017–2020", "imdbID": "tt5753856", "Type": "series", "Poster": "https://m.media-amazon.com/images/M/MV5BOTk2NzUyOTctZDdlMS00MDJlLTgzNTEtNzQzYjFhNjA0YjBjXkEyXkFqcGdeQXVyMjg1NDcxNDE@._V1_SX300.jpg" },
    { Title: 'Kaala Paani', Year: '2023–', imdbID: 'tt19072562', Type: 'series', Poster: 'https://m.media-amazon.com/images/M/MV5BNWQ3MDdkNGItMzNkMy00MDkwLWIwNzYtYzIxNzBhYWUyOGZiXkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_SX300.jpg' },
    { "Title": "Avengers: Endgame", "Year": "2019", "imdbID": "tt4154796", "Type": "movie", "Poster": "https://m.media-amazon.com/images/M/MV5BMTc5MDE2ODcwNV5BMl5BanBnXkFtZTgwMzI2NzQ2NzM@._V1_SX300.jpg" },
    { "Title": "Sacred Games", "Year": "2018–2019", "imdbID": "tt6077448", "Type": "series", "Poster": "https://m.media-amazon.com/images/M/MV5BMjJlMjJlMzYtNmU5Yy00N2MwLWJmMjEtNWUwZWIyMGViZDgyXkEyXkFqcGdeQXVyOTAzMTc2MjA@._V1_SX300.jpg" },
    { "Poster": "https://m.media-amazon.com/images/M/MV5BMTUwNjQ3Nzk5N15BMl5BanBnXkFtZTgwMjI4MTgzMTE@._V1_SX300.jpg", "Title": "2 States", "Type": "movie", "Year": "2014", "imdbID": "tt2372678" },
    { Title: 'Spider-Man: No Way Home', Year: '2021', imdbID: 'tt10872600', Type: 'movie', Poster: 'https://m.media-amazon.com/images/M/MV5BZWMyYzFjYTYtNTRjYi00OGExLWE2YzgtOGRmYjAxZTU3NzBiXkEyXkFqcGdeQXVyMzQ0MzA0NTM@._V1_SX300.jpg' },
    { Title: 'Spider-Man: Homecoming', Year: '2017', imdbID: 'tt2250912', Type: 'movie', Poster: 'https://m.media-amazon.com/images/M/MV5BNTk4ODQ1MzgzNl5BMl5BanBnXkFtZTgwMTMyMzM4MTI@._V1_SX300.jpg' },
    { "Title": "Masaan", "Year": "2015", "imdbID": "tt4635372", "Type": "movie", "Poster": "https://m.media-amazon.com/images/M/MV5BMTU4NTE0NTMyNl5BMl5BanBnXkFtZTgwNjI5MDkxNjE@._V1_SX300.jpg" },
    { "Title": "Jai Bhim", "Year": "2021", "imdbID": "tt15097216", "Type": "movie", "Poster": "https://m.media-amazon.com/images/M/MV5BNzFkM2FhMzQtYjUwZi00N2Y3LWFkZWItMmZmMjQxNGQwZmNhXkEyXkFqcGdeQXVyODEyNjEwMDk@._V1_SX300.jpg" },
    { "Title": "Newton", "Year": "2017", "imdbID": "tt6484982", "Type": "movie", "Poster": "https://m.media-amazon.com/images/M/MV5BMDk4Y2Q2MmUtYjE1YS00NjEwLTg0ZGYtOGJkZjUzOTllYzA0L2ltYWdlXkEyXkFqcGdeQXVyNzA0MTg0MzE@._V1_SX300.jpg" },
    { "Title": "Paatal Lok", "Year": "2020-", "imdbID": "tt9680440", "Type": "series", "Poster": "https://m.media-amazon.com/images/M/MV5BMTE5NWUyMmYtMWE1My00ZDhiLWExZjEtMGJjYTA0OGYwZjIwXkEyXkFqcGdeQXVyODQ5NDUwMDk@._V1_SX300.jpg" },
    { "Title": "Tandav", "Year": "2021–", "imdbID": "tt11117570", "Type": "series", "Poster": "https://m.media-amazon.com/images/M/MV5BNzRjMjhmZmUtYjRhNS00YjlmLWI4MzUtMDFhM2E0MjAyZGRjXkEyXkFqcGdeQXVyMTEwNDM0NTI2._V1_SX300.jpg" },
    { "Title": "Jehanabad - Of Love & War", "Year": "2023–", "imdbID": "tt25375470", "Type": "series", "Poster": "https://m.media-amazon.com/images/M/MV5BM2U0OWVkMTAtNDg4NC00NTBhLWFiOGYtMDljNzkyOGRhMzUzXkEyXkFqcGdeQXVyOTIxMzQ0NzU@._V1_SX300.jpg" },
    { "Title": "Article 15", "Year": "2019", "imdbID": "tt10324144", "Type": "movie", "Poster": "https://m.media-amazon.com/images/M/MV5BZTI2NTFiMDMtZjQxNS00YjBkLWFhNWMtOTIyMzE5Yjc0ZTZiXkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_SX300.jpg" },
    { "Title": "Jawan", "Year": "2023", "imdbID": "tt15354916", "Type": "movie", "Poster": "https://m.media-amazon.com/images/M/MV5BOWI5NmU3NTUtOTZiMS00YzA1LThlYTktNDJjYTU5NDFiMDUxXkEyXkFqcGdeQXVyMTUzNjEwNjM2._V1_SX300.jpg" },
    {Title: 'Origin', Year: '2023', imdbID: 'tt13321244', Type: 'movie', Poster: 'https://m.media-amazon.com/images/M/MV5BYmU2ZDk1MDgtMzhiMS00NTc0LThkYjItOTMwM2RiMjc5NzhkXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_SX300.jpg'}
];

shuffleArray(defaultData);

export default defaultData;
