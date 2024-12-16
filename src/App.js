import './App.css';
import SearchIcon from './search.svg';
import { useState, useEffect } from 'react';

import MovieCard from './MovieCard';

const API_URL = "http://www.omdbapi.com/?i=tt3896198&apikey=e2e4d98f";

function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();

    setMovies(data.Search);
  }

  useEffect(() => {
    searchMovies('batman');
  }, []);

  // const movie1 = {
  //   "Title": "Batman v Superman: Dawn of Justices",
  //   "Year": "2026",
  //   "imdbID": "tt2975590",
  //   "Type": "movie",
  //   "Poster": "https://m.media-amazon.com/images/M/MV5BZTJkYjdmYjYtOGMyNC00ZGU1LThkY2ItYTc1OTVlMmE2YWY1XkEyXkFqcGc@._V1_SX300.jpg"
  // }

  return (
    <div className='app'>
      <h1>MovieLand</h1>

      <div className='search'>
        <input type="text" 
          placeholder='Search for movies'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <img 
          src={SearchIcon} 
          alt="search icon" 
          onClick={() => searchMovies(searchTerm)}
          />
      </div>

      {
        movies?.length > 0
        ? (
          <div className='container'>
            {movies.map((movie) => (
              <MovieCard movie={movie} />
            ))}
          </div>
        ) : (
          <div className='empty'>
            <h2>No movies found</h2>
          </div>
        )
      }

      
    </div>
  );
}

export default App;
