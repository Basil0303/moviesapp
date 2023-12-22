import "./App.css";
import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Movie from "./pages/Movie";
import axios from "axios";

function App() {
  const API_KEY = "f5b9bbab";
  const [trendingMovies, setTrendingMovies] = useState([]);

  const [categoryMovies, setCategoryMovies] = useState([]);

  const [searchResults, setSearchResults] = useState([]);

  const [params, setParams] = useState({
    page: 1,
    limit: 5,
    query: "",
  });

  const getMovies = async () => {
    try {
      const response = await axios.get(
        `https://www.omdbapi.com/?apikey=${API_KEY}&s=Avengers`,
        params
      );
      console.log(response,"responseeeee");
      setTrendingMovies(response.data.Search || []);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  const getActionMovies = async () => {
    try {
      const response = await axios.get(
        `https://www.omdbapi.com/?apikey=${API_KEY}&s=Action`,
        params
      );
      setCategoryMovies(response.data.Search || []);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `https://www.omdbapi.com/?apikey=${API_KEY}&s=${params.query}`
      );
      setSearchResults(response.data.Search || []);
    } catch (error) {
      console.error("Error searching movies:", error);
    }
  };

  useEffect(() => {
    getMovies();
    getActionMovies();
    handleSearch();
  }, [params.query]);

  return (
    <>
      <Container>
        <div className="full-page">
          <h1>My Movie App</h1>

          <input
            type="text"
            className="form-control"
            placeholder="Search here..."
            value={params.query}
            onChange={(e) => setParams({ ...params, query: e.target.value })}
          />
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {searchResults.map((movie) => (
              <Movie key={movie.imdbID} movie={movie} />
            ))}
          </div>

          <h2>Trending Movies</h2>
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {trendingMovies.map((movie) => (
              <Movie key={movie.imdbID} movie={movie} />
            ))}
          </div>

          <h2>Movies by Category</h2>
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {categoryMovies.map((movie) => (
              <Movie key={movie.imdbID} movie={movie} />
            ))}
          </div>
        </div>
      </Container>
    </>
  );
}

export default App;
