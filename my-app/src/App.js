import React, {useEffect, useState} from 'react';

import MoviesList from './components/MoviesList';
import './App.css';
import AddMovie from "./components/AddMovie";

function App() {
    const [movies,setMovies] = useState([]);
    const [isLoading,setIsloading] = useState(false);
    const [error,setError] = useState(null);//null weil objetct


 async function fetchMovie() {
     setIsloading(true);
     setError(null);//clear old errors
     try{
         const response = await  fetch('https://swapi.dev/api/films2');
         if (!response.ok){ // weil 404 error kein richtiger error ist behandeln wir das so. würde nur error schmeisen wenn mit diesem 404 error was gemacht wird
             throw new Error('something went wrong2!');//weil die api keine rror message gibt machen wir es so, landen dann im catch.
         }
         const data= await  response.json();
         const transformedMovies = data.results.map(movieData => {
             return {
                 id: movieData.episode_id,
                 title: movieData.title,
                 openingText: movieData.opening_crawl,
                 releaseDate: movieData.release_date
             };
         })
         setMovies(transformedMovies);
         setIsloading(false);
     }catch (error){ // landen hier wenn error accured
            setError(error.message)// wollen die message machen das damit patkrisch zum string ohne da sgehts nicht
     }
     setIsloading(false)//am ende soll nicht mehr geloadtet werden egal ob fetch erfolgreich ode rnicht
 }
 function addMovieHandler(movie) {
     console.log(movie)
 }

  return (
    <React.Fragment>
        <section>
            <AddMovie onAddMovie={addMovieHandler} />
        </section>
      <section>
        <button onClick={fetchMovie}>Fetch Movies</button>
      </section>
      <section>
          {!isLoading && movies.length >0 && <MoviesList movies={movies} /> }
          {!isLoading && movies.length === 0 && !error && <p> no movie found</p>}
          {!isLoading && error && <p>{error}</p>}
          {isLoading && <p> loading</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
